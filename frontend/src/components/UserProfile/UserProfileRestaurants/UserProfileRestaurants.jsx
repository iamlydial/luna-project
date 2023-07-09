import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfileRestaurants.css";
import Button from "../../Button/Button.jsx";
import {axiosLuna} from "../../../axios/axiosInstance.js";
import StarRating from "../../StarRating";
import {useSelector} from "react-redux";


const UserProfileRestaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    const access_token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    const handleCreateRestaurant = () => {
    navigate("/new-restaurant");
    };

    useEffect(() => {
        const fetchRestaurantsData = async () => {

      let config = null
        if (access_token) {
            config = {
                headers: { Authorization: `Bearer ${access_token}`},
                "Content-Type": "application/json",
            };
        }
        try {
            const response = await axiosLuna.get('/restaurants/user/1/', config);
            console.log(response, '>>> Restaurant line11')
            setRestaurants(response.data);
            console.log(response.data, '>>> Restaurant line13')
        } catch (error) {
            console.error('Error fetching comments data:', error);
        }
    };

        fetchRestaurantsData();
    }, []);

    return (
        <div className="user-profile-restaurants-container">
            <h2 className="user-profile-restaurants-title">RESTAURANTS</h2>
            {restaurants?.map((restaurant) => {
                return(
            <div className="user-profile-restaurants-content-container">
                <div className="user-profile-restaurants-name-container">
                    <ul className="user-profile-name-time">
                        <li className="user-profile-restaurants-name">{restaurant.name}</li>
                    </ul>
                    <div className="star-container">
                        <StarRating StarRating={restaurants.rating_average} />
                    </div>
                    <div className="user-profile-restaurants-text">
                        <p>{restaurant.description}</p>
                    </div>
                </div>
            </div>)
                })
            }
            <div className="create-restaurants-button">
                <Button className="use-restaurant-create-btn" onClick={handleCreateRestaurant}>Create Restaurant</Button>
            </div>
        </div>
    );
};

export default UserProfileRestaurants