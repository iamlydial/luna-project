import React, {useEffect, useState} from "react";
import "./NewReview.css";
import StarRating from "../../components/StarRating";
import Button from "../../components/Button/Button.jsx";
import {useNavigate, useParams} from "react-router-dom"
import {axiosLuna} from "../../axios/axiosInstance.js";
import {useSelector} from "react-redux";

const NewReview = () => {

    const [restaurant, setRestaurant] = useState({});
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('')
    const [ratingMissing, setRatingMissing] = useState(false)
    const [reviewMissing, setReviewMissing] = useState(false)

    const access_token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate()
    const { restaurantId } = useParams()

    const InputPlaceholder = "Your review helps others learn about great local businesses. " +
        "Please don't review this business if you received a freebie for writing this review, " +
        "or if you're connected in any way to the owner or employees."
    useEffect(() => {
        const fetchRestaurantData = async () => {

      let config = null
        if (access_token) {
            config = {
                headers: { Authorization: `Bearer ${access_token}`},
                "Content-Type": "application/json",
            };
        }
            try {
                const response = await axiosLuna.get(`/restaurants/${restaurantId}/`, config);
                console.log(response.data)
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchRestaurantData();
    }, [restaurantId]);

    const sendReview = async () => {
            const data = {
                "text_content": review,
                "rating": rating
            }

      let config = null
        if (access_token) {
            config = {
                headers: { Authorization: `Bearer ${access_token}`},
                "Content-Type": "application/json",
            };
        }
        try {
            const response = await axiosLuna.post(`/reviews/new/${restaurantId}/`, data, config);
            console.log(response.data)
            navigate(`/search/restaurants/${restaurantId}`)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setReview(review.trim())
        if (review === '') setReviewMissing(true)
        else setReviewMissing(false)

        if (rating === 0) setRatingMissing(true)
        else setRatingMissing(false)

        if (!reviewMissing && ! ratingMissing) sendReview();
    }

    return (
        <>
            <main className="new-review-page-wrapper">
                <div className="new-review-page-container">
                    <div className="new-review-page-header">
                        <img className="new-review-header-image" src={restaurant.image} alt="Review Header"/>
                        <div className="new-review-overlay-image"></div>
                    </div>
                </div>
                <div className="review-page-bottom-content">
                    <div className="review-rating-container">
                        <div className="rating-stars-select-container">
                            <div className="select-your-stars">
                            <StarRating StarRating={rating} PassRating={setRating} Input={true}/>
                            <p className="select-rating">Select your rating:</p>
                        </div>
                        <div className="review-input-container">
                            <input className="review-user-input-text"
                                   value={review}
                                   onChange={e => setReview(e.target.value)}
                                   placeholder={InputPlaceholder}
                                   type="text"/>
                        </div>

                        <div className="review-save-edit-button-delete-container">
                            <ul className="review-save-edit-button-delete-list">
                                {reviewMissing ? <li className="review-delete-account">This Field is required</li> : null }
                                <li className="review-save-edit"><Button onClickFunction={handleSubmit} >Submit</Button></li>


                            </ul>
                        </div>
                            </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NewReview;
