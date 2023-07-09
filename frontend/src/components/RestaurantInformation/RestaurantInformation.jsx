import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import clock from "../../assets/icons/clock.svg";
import money from "../../assets/icons/money.svg";
import Button from "../../components/Button/Button";
import "./RestaurantInformation.css";

export default function RestaurantInformation({ restaurantData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const createReviewHandler = (e) => {
    e.preventDefault();
    navigate(`/restaurants/${id}/review`);
  };

  const pricelevel = restaurantData.price_level;
  let pricelevel$ = "";
  for (let i = 0; i < pricelevel; i++) {
    pricelevel$ += "$";
  }

  return (
    <div className="RestaurantInformationDiv">
      <div className="RestaurantInformationTopDiv">
        <img
          src={clock}
          alt="Clock-Icon"
          height="26"
          className="RestaurantInformationImg"
        />
        <div className="RestaurantInformationText">
          Monday-Friday {restaurantData.opening_hours}
        </div>
      </div>
      <div className="RestaurantInformationMiddleDiv">
        <img
          src={money}
          alt="Money-Icon"
          height="26"
          className="RestaurantInformationImg"
        />
        <div className="RestaurantInformationText">
          Price level: {pricelevel$}
        </div>
      </div>
      <div className="RestaurantInformationBottomDiv">
        <Button
          externalClass={"RestaurantInformationButton"}
          onClick={createReviewHandler}
        >
          WRITE A REVIEW
        </Button>
        <Button externalClass={"RestaurantInformationButton"}>EDIT DATA</Button>
      </div>
    </div>
  );
}
