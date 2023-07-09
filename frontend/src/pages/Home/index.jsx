import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Button from "../../components/Button/Button";
import ResturantCard from "../../components/ResturantCard";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { axiosLuna } from "../../axios/axiosInstance";
import ImagePlaceHolder from "../../assets/images/resturnat-image-placeholder.jpg";
import "./home.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [restaurantsData, setRestaurantsData] = useState();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const handelSearch = e => {
    e.preventDefault();
    navigate(`/search/??type=restaurants&search_string=${searchString}`);
  };

  const onClickHandler = id => {
    navigate(`search/restaurants/${id}`);
    console.log("clicked");
  };

  useEffect(() => {
    axiosLuna
      .get("/home/")
      .then(res => setRestaurantsData(res.data))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <>
      <article className="home-hero-section">
        <Container>
          <form className="search-conatiner" onSubmit={handelSearch}>
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
            />
            <Button>Search</Button>
          </form>
        </Container>
      </article>
      <Container>
        <article>
          <h2 className="page-title">Best rated restaurants</h2>
          <Swiper
            className="resturant-cards-container"
            modules={[Navigation, Autoplay]}
            centeredSlides
            slidesPerView={3}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {restaurantsData?.map((item, idx) => (
              <SwiperSlide
                key={idx}
                style={{ width: "fit-content" }}
                onClick={() => onClickHandler(item.id)}
              >
                <ResturantCard
                  title={item.name}
                  address={item.street}
                  totalRatingNumber={item.review_count}
                  StarsNumber={item.rating_average}
                  image={item.image || ImagePlaceHolder}
                  id={item.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      </Container>
    </>
  );
};

export default Home;
