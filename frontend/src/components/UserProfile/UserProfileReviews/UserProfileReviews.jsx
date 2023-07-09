import React, {useEffect, useState} from "react";
import "./UserProfileReviews.css";
import {axiosLuna} from "../../../axios/axiosInstance.js";
import StarRating from "../../StarRating";


const UserProfileReviews = () => {
    const [reviews, setReviews] = useState([])
    const fetchReviewData = async () => {
        try {
            const response = await axiosLuna.get('/reviews/user/1/');
            console.log(response, 'line11 >>> Reviews')
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching review data:', error);
        }
    };

    useEffect(() => {
        fetchReviewData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
         const minutes = String(date.getMinutes()).padStart(2, "0");
         return `${day}.${month}.${year} ${hours}:${minutes}`;
};

    console.log(reviews, '>>> Review line 29')
    return (
        <div className="user-profile-reviews-container">
            <h2 className="user-profile-reviews-title">REVIEWS</h2>
            <div className="user-profile-review-container">
                {reviews?.map((review) => {
                    return(
                    <div className="user-profile-review-name-datetime">
                        <ul className="user-profile-name-time">
                            <li className="user-profile-review-name">{review.restaurant.name}
                            </li>
                            <li className="user-profile-review-time">{formatDate(review.restaurant.created)}
                            </li>
                        </ul>
                        <div className="star-container">
                            <StarRating StarRating={review.rating} />
                        </div>
                        <div className="user-profile-reviews-text">
                            <p>{review.text_content}</p>
                        </div>

                    </div>)
                })}

            </div>
        </div>
    );
};

export default UserProfileReviews