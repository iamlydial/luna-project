import React from "react";
import "./UserprofileMenu.css";
import commentSvg from '../../../assets/icons/comment.svg'
import editProfile from '../../../assets/icons/edit.svg'
import restaurantSvg from '../../../assets/icons/restaurant.svg'
import ReviewSvg from '../../../assets/icons/star.svg'

const UserProfileMenu = ({ onItemClick }) => {


    return (
    <div className="user-profile-menu-container">
      <div className="user-profile-menu-list-container">
          <div className="user-menu-name">
              <h3>Laurent's profile</h3>
          </div>
          <ul className="user-profile-menu-list">
              <li className="user-profile-menu-list-element" onClick={() => onItemClick("reviews")} ><img className="user-menu-icon" src={ReviewSvg} alt="Review-button"/><span className="user-profile-menu-list-entry">Reviews</span></li>
              <li className="user-profile-menu-list-element" onClick={() => onItemClick("comments")}><img className="user-menu-icon" src={commentSvg} alt="Comment-button"/><span className="user-profile-menu-list-entry">Comments</span></li>
              <li className="user-profile-menu-list-element" onClick={() => onItemClick("restaurants")}><img className="user-menu-icon" src={restaurantSvg} alt="restaurant-button"/><span className="user-profile-menu-list-entry"></span>Restaurants</li>
              <li className="user-profile-menu-list-element" onClick={() => onItemClick("edit")}><img className="user-menu-icon" src={editProfile} alt="edit-profile-button"/><span className="user-profile-menu-list-entry"></span>Edit profile</li>
          </ul>
      </div>
    </div>
  );
};

export default UserProfileMenu