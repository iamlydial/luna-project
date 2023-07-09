import React, {useEffect, useState} from "react";
import "./UserProfileEdit.css";
import Button from "../../Button/Button.jsx";
import {axiosLuna} from "../../../axios/axiosInstance.js";

const UserProfileEdit = () => {
    return (
        <div className="user-profile-edit-container">
            <h2 className="user-profile-edit-title">EDIT USER PROFILE</h2>
            <div className="user-profile-edit-content-container">
                <div className="user-profile-edit-entry-container">
                    <div className="user-profile-edit-entry-container-username">
                        <h2 className="user-profile-edit-entry-label">Username</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-first-name">
                        <h2 className="user-profile-edit-entry-label">First Name</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-last-name">
                        <h2 className="user-profile-edit-entry-label">Last Name</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-last-name">
                        <h2 className="user-profile-edit-entry-label">E-Mail</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-location">
                        <h2 className="user-profile-edit-entry-label">Location</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-phone">
                        <h2 className="user-profile-edit-entry-label">Phone</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-loved-things">
                        <h2 className="user-profile-edit-entry-label">Things I love</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                    <div className="user-profile-edit-entry-container-description">
                        <h2 className="user-profile-edit-entry-label">Description</h2>
                        <input className="user-profile-edit-text-field" type="text"/>
                    </div>
                </div>
            </div>
            <div className="save-edit-button-delete-container">
                <ul className="save-edit-button-delete-list">
                    <li className="save-edit"><Button>Save</Button></li>
                <li className="delete-account">Delete Account</li>

                    </ul>
            </div>
        </div>
    );
};

export default UserProfileEdit