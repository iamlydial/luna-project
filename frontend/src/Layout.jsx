import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import {useEffect} from "react";
import {axiosLuna} from "./axios/axiosInstance.js";
import {login, logout, setAllInformation, setEmail} from "./store/slices/user.js";
import {useDispatch, useSelector} from "react-redux";

const Layout = () => {
    const dispatch = useDispatch();
    const userLoggedInEmail = useSelector(state => state.user.email);
    const access_token = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      axiosLuna
        .post("/auth/token/refresh/", {
          refresh: refreshToken,
        })
        .then((response) => {
          dispatch(login(response.data.access));
            if (response.data.refresh) {
                const newRefreshToken = response.data.refresh;
                localStorage.setItem("refreshToken", newRefreshToken);
            }

        })
        .catch((error) => {
          console.error(error);

          localStorage.removeItem("refreshToken");
          dispatch(logout());
        });
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (access_token) {
      const config = {
          headers: { Authorization: `Bearer ${access_token}`},
          "Content-Type": "application/json",
      };
      axiosLuna
        .get("/users/me/", config)
        .then((res) => {
          dispatch(
            setEmail({email: res.data.email})
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [access_token, dispatch]);


    useEffect(() => {
    const fetchUserDetails = async () => {
        let config = null
        if (access_token) {
            config = {
                headers: { Authorization: `Bearer ${access_token}`},
                "Content-Type": "application/json",
            };
        }
      try {
        const res = await axiosLuna.get("/users/", config);
        console.log(res.data);
        const loggedUser = res.data?.find(
          item => item.email === userLoggedInEmail
        );
        console.log(loggedUser, "loggeduser Email");
        if (loggedUser) {
          console.log(loggedUser, "loggeduser Email");
          dispatch(
            setAllInformation({
              firstName: loggedUser.first_name,
              lastName: loggedUser.last_name,
              username: loggedUser.username,
              avatar: loggedUser.profile_picture,
              banner: "",
              location: loggedUser.location,
              about: "",
              phone: loggedUser.user_phone,
              email: loggedUser.email,
            })
          );
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (userLoggedInEmail) {
      fetchUserDetails();
    }
  }, [dispatch, userLoggedInEmail]);



  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
