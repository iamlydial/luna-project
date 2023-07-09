import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import profilePicture from "../../assets/images/profile-picture.png";
import like from "../../assets/icons/like.svg";
import "./RestaurantReview.css";
import { axiosLuna } from "../../axios/axiosInstance";
import StarRating from "../StarRating";
import {useSelector} from "react-redux";

export default function RestaurantReview({ restaurantData }) {
  const { resturantId } = useParams();
  const [fetchData, setFetchData] = useState([]);
    const access_token = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    const getFetchData = async () => {
      let config = null
        if (access_token) {
            config = {
                headers: { Authorization: `Bearer ${access_token}`},
                "Content-Type": "application/json",
            };
        }

      const res = await axiosLuna.get(`/restaurants/${resturantId}`, config);
      const data = res?.data;
      setFetchData(data);
    };
    getFetchData();
  }, [resturantId]);
  console.log(fetchData);
  const reviews = [fetchData?.restaurant_reviews];

  return (
    <div className="ReviewCardContainer">
      <div className="ReviewCardTopDiv">
        <img src={profilePicture} alt="User Profile" width="68" />
        <div className="LeftContainer">
          <h5 className="reviewerName">Username</h5>
          <span className="reviewCount">
            {restaurantData.review_count}6 Reviews in Total
          </span>
        </div>
        <div className="rating">
          <div className="starWrapper">
            <StarRating
              StarRating={fetchData.rating_average}
              totalRatingNumber={fetchData.review_count}
              ExtraClasses="resturant-stars"
            />
          </div>
        </div>
        <span className="CreationDate">date created</span>
      </div>
      <div className="ReviewCardBottomDiv">
        <p className="ReviewText">
          This location at the Bahnhofstrasse is quite friendly and easily
          located across the street from the train station. The people there
          seem to be quite good and helpful in their service.
        </p>
        <div className="LikeCommentContainer">
          <div className="ButtonContainer">
            <div className="Like">
              <img src={like} alt="Like Icon"></img>Like 63
            </div>
            <div className="Comment">Comment 23</div>
          </div>
          <a href="#" className="ShowComments">
            View all comments
          </a>
        </div>
      </div>
    </div>
  );
}
