import React from "react";
import Container from "../../components/container/Container";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Container>
        <article className="notfound-page-contanier">
          <h1>404</h1>
          <h3>Oops! Looks like you took a wrong turn.</h3>
          <p>
            But don't worry, we'll get you back on track. Head back to our
            homepage ...<br></br>who knows, you find something better!
          </p>
          <Button onClickFunction={() => navigate("/", { replace: true })}>
            Home
          </Button>
        </article>
      </Container>
    </main>
  );
};

export default NotFound;
