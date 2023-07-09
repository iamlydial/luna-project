import { useState } from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllInformation } from "../../store/slices/user";
import "./signup.css";

const Signup = () => {
  const [emailValue, setEmailValue] = useState("");
  const [signUpSteps, setSignUpSteps] = useState(1);
  const [emaiVerification, setEmailverification] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErroMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAllInformation = useSelector(state => state.user.setAllInformation);

  const handelSubmitEmail = e => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_BASEURL}/registration/`, {
        email: emailValue,
      })
      .then(setSignUpSteps(signUpSteps + 1))
      .catch(err =>
        setErroMessage(
          `${err.response?.data?.email?.[0]} or ${err.response?.data?.username?.[0]}`
        )
      );
  };

  const handelVerificationFrom = e => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setErroMessage("Password doesn't match");
      return;
    }
    const verify = async () => {
      try {
        const req = await axios.post(
          `${import.meta.env.VITE_API_BASEURL}/registration/validate/`,
          {
            email: emaiVerification,
            code: validationCode,
            first_name: firstName,
            last_name: lastName,
            password: password,
            password_repeat: passwordRepeat,
            username: username,
          }
        );
        if (req.status === 200) {
          dispatch(
            setAllInformation(...userAllInformation, {
              username: username,
              email: emaiVerification,
            })
          );
          navigate("/login", { replace: true });
        }
      } catch (err) {
        setErroMessage(err.message);
      }
    };
    verify();
  };

  return (
    <main className="signUp-page-container">
      <h1 className="page-title">
        {signUpSteps == 1 || signUpSteps == 2 ? "Registration" : "Verification"}
      </h1>
      {signUpSteps == 1 && (
        <form
          onSubmit={handelSubmitEmail}
          className="signup-form-container"
          id="1"
        >
          <input
            className="input-field signup-input"
            type="email"
            placeholder="E-Mail address"
            value={emailValue}
            required
            onChange={e => setEmailValue(e.target.value)}
          />
          {errorMessage && (
            <>
              <p className="signup-erro-message">{errorMessage}</p>
              <a
                href="#"
                onClick={() => {
                  setSignUpSteps(3);
                  setErroMessage("");
                }}
              >
                Please verify your Email
              </a>
            </>
          )}

          <Button type="submit">Register</Button>
        </form>
      )}
      {signUpSteps == 2 && (
        <>
          <p className="signUp-message ">
            Thanks for your registration. Our hard working monkeys are preparing
            a digital message called E-Mail that will be sent to you soon. Since
            monkeys arent good in writing the message could end up in you junk
            folder. Our apologies for any inconvienience.thank for{" "}
          </p>
          <Button
            type="submit"
            onClickFunction={() => setSignUpSteps(signUpSteps + 1)}
          >
            Verify
          </Button>
        </>
      )}
      {signUpSteps == 3 && (
        <form
          onSubmit={handelVerificationFrom}
          className="signup-verification-form-container"
          id="3"
        >
          <div className="signup-verification-row">
            <input
              className="input-field signup-input"
              type="email"
              placeholder="E-Mail address"
              value={emaiVerification}
              required
              onChange={e => setEmailverification(e.target.value)}
            />
            <input
              className="input-field signup-input"
              type="text"
              placeholder="Validation code"
              value={validationCode}
              required
              onChange={e => setValidationCode(e.target.value)}
            />
          </div>
          <div className="signup-verification-row">
            <input
              className="input-field signup-input"
              type="text"
              placeholder="First name"
              value={firstName}
              required
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              className="input-field signup-input"
              type="text"
              placeholder="Last name"
              value={lastName}
              required
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="signup-verification-row">
            <input
              className="input-field signup-input"
              type="password"
              placeholder="password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="input-field signup-input"
              type="password"
              placeholder="Password repeat"
              value={passwordRepeat}
              required
              onChange={e => setPasswordRepeat(e.target.value)}
            />
          </div>
          <input
            className="input-field signup-input"
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={e => setUserName(e.target.value)}
          />
          <p className="signup-erro-message">{errorMessage}</p>
          <Button type="submit">Finish registration</Button>
        </form>
      )}
    </main>
  );
};

export default Signup;
