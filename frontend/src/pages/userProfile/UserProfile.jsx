import {axiosLuna} from "../../axios/axiosInstance.js";
import {useEffect, useState} from "react";
import "./userProfile.css";
import zurichSkyline from '../../assets/images/zuerich-skyline.jpg'
import profilePicture from '../../assets/images/profile-picture.png'
import UserProfileMenu from "../../components/UserProfile/UserProfileMenu/UserProfileMenu.jsx";
import UserProfileRestaurants from "../../components/UserProfile/UserProfileRestaurants/UserProfileRestaurants.jsx";
import UserProfileEdit from "../../components/UserProfile/UserProfileEdit/UserProfileEdit.jsx";
import UserProfileReviews from "../../components/UserProfile/UserProfileReviews/UserProfileReviews.jsx";
import UserProfileComments from "../../components/UserProfile/UserProfileComments/UserProfileComments.jsx";
import { useLocation, useParams } from "react-router-dom"
import {useSelector} from "react-redux";

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [selectedMenuItem, setSelectedMenuItem] = useState("reviews");
    const location = useLocation()
    const access_token = useSelector((state) => state.user.accessToken);
    const {userId} = useParams()

    const handleMenuItemClick = (menu) => {
        setSelectedMenuItem(menu);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            let url = '/users/'
            if (location.pathname === "/profile") {
                url += 'me/'
            } else {
                url += userId + '/'
            }

      let config = null
        if (access_token) {
            config = {
                headers: { Authorization: `Bearer ${access_token}`},
                "Content-Type": "application/json",
            };
        }
            try {
                const response = await axiosLuna.get(url, config);
                console.log(response, '>>> User line23')
                setUser(response.data);
                console.log(response.data, '>>> User line26')
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [location.pathname, userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString("en-US", {month: "long"});
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    return (
        <main className="new-review-page-wrapper">
            <div className="user-profile-page-container">
                <div className="user-profile-page-header">
                    <img className="header-image" src={zurichSkyline} alt="zurich-skyline"/>
                </div>
                <div className="user-bottom-page-part">
                    <div className="user-main-body-container">
                        <div className="user-img-menu-container">
                            <div className="user-image-container">
                                <img className="user-image"
                                     src={user?.profile_picture ? user.profile_picture : profilePicture}
                                     alt="user-profile-picture"/>
                                <UserProfileMenu onItemClick={handleMenuItemClick}/>
                            </div>
                        </div>
                        <div className="user-info-reviews">
                            <div className="user-info">
                                <h2 className="user-info-full-name">{user?.first_name} {user?.last_name?.charAt(0)}.</h2>
                                <p className="user-info-elements">{user && user.location}</p>
                                <p className="user-info-elements">6 reviews</p>
                                <p className="user-info-elements">210 comments</p>
                            </div>
                            {selectedMenuItem === "reviews" && <UserProfileReviews/>}
                            {selectedMenuItem === "restaurants" && <UserProfileRestaurants/>}
                            {selectedMenuItem === "edit" && <UserProfileEdit/>}
                            {selectedMenuItem === "comments" && <UserProfileComments/>}
                        </div>
                        <div className="about-user">
                            <div className="about-user-title"><h2>ABOUT {user && user.first_name}</h2>
                            </div>
                            <div className="about-location-city">
                                <h3 className="about-user-h3-headings">Location</h3>
                                <p className="about-user-paragraphs">{user && user.location}</p>
                            </div>
                            <div className="about-luna-member-since">
                                <h3 className="about-user-h3-headings">Luna Member Since</h3>
                                <p className="about-user-paragraphs">{user && user.date_joined && formatDate(user.date_joined)}</p>
                            </div>
                            <div className="about-things-love-things">
                                <h3 className="about-user-h3-headings">Things I Love</h3>
                                <p className="about-user-paragraphs">Everything</p>
                            </div>
                            <div className="about-description-text">
                                <h3 className="about-user-h3-headings">Description</h3>
                                <p className="about-user-paragraphs">{user && user.user_description}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    )
}

export default UserProfile;
