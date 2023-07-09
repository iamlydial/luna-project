import React from "react";
import {useState} from "react";
import "./NewRestaurant.css";
import Button from "../../components/Button/Button.jsx";

const NewRestaurant = () => {
    const [name, setName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [openingHours, setOpeningHours] = useState("");
    const [priceLevel, setPriceLevel] = useState("");
    const [file, setFile] = useState(null);

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };

   const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    // Perform form submission or validation logic
  };
    const isFieldEmpty = (value) => {
    return isSubmitted && value.trim() === "";
  };
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile);
        // Perform further processing with the selected file
    };

    return (
        <>
            <main className="new-restaurant-page-wrapper">
                <div className="new-restaurant-page-container">
                    <div className="new-restaurant-page-title-container">
                        <h2 className="form-title">CREATE NEW RESTAURANT</h2>
                    </div>
                    <div className="orange-underline"></div>
                    <div className="page-rows">
                        <div className="row-one">
                            <div className="column-title">
                                <h2 className="title">Basic</h2>
                            </div>
                            <div className="row-columns">
                                <div className="column-one-first">
                                    <h2 className="field-title">Name*</h2>
                                    <input className="input-field-container" type="text" value={name}
                                           onChange={(e) => handleInputChange(e, setName)}
                                    />
                                    {isFieldEmpty(name) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-second">
                                    <h2 className="field-title">Category*</h2>
                                    <input className="input-field-container" type="text" value={category}
                                           onChange={(e) => handleInputChange(e, setCategory)}
                                    />
                                    {isFieldEmpty(category) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-third">
                                    <h2 className="field-title">Country*</h2>
                                    <input className="input-field-container" type="text" value={country}
                                           onChange={(e) => handleInputChange(e, setCountry)}
                                    />
                                    {isFieldEmpty(country) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row-one">
                            <div className="column-title">
                                <h2 className="title">Address</h2>
                            </div>
                            <div className="row-columns">
                                <div className="column-one-first">
                                    <h2 className="field-title">Street*</h2>
                                    <input className="input-field-container" type="text" value={street}
                                           onChange={(e) => handleInputChange(e, setStreet)}
                                    />
                                    {isFieldEmpty(street) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-second">
                                    <h2 className="field-title">City*</h2>
                                    <input className="input-field-container" type="text" value={city}
                                           onChange={(e) => handleInputChange(e, setCity)}
                                    />
                                    {isFieldEmpty(city) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-third">
                                    <h2 className="field-title">Zip*</h2>
                                    <input className="input-field-container" type="text" value={zip}
                                           onChange={(e) => handleInputChange(e, setZip)}
                                    />
                                    {isFieldEmpty(zip) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row-one">
                            <div className="column-title">
                                <h2 className="title">Contact</h2>
                            </div>
                            <div className="row-columns">
                                <div className="column-one-first">
                                    <h2 className="field-title">Website*</h2>
                                    <input className="input-field-container" type="text" value={website}
                                           onChange={(e) => handleInputChange(e, setWebsite)}
                                    />
                                    {isFieldEmpty(website) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-second">
                                    <h2 className="field-title">Phone*</h2>
                                    <input className="input-field-container" type="text" value={phone}
                                           onChange={(e) => handleInputChange(e, setPhone)}
                                    />
                                    {isFieldEmpty(phone) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-third">
                                    <h2 className="field-title">Email*</h2>
                                    <input className="input-field-container" type="text" value={email}
                                           onChange={(e) => handleInputChange(e, setEmail)}
                                    />
                                    {isFieldEmpty(email) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row-one">
                            <div className="column-title">
                                <h2 className="title">Details</h2>
                            </div>
                            <div className="row-columns">
                                <div className="column-one-first">
                                    <h2 className="field-title">Opening Hours*</h2>
                                    <input className="input-field-container" type="text" value={openingHours}
                                           onChange={(e) => handleInputChange(e, setOpeningHours)}
                                    />
                                    {isFieldEmpty(openingHours) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-second">
                                    <h2 className="field-title">Price Level*</h2>
                                    <input className="input-field-container" type="text" value={priceLevel}
                                           onChange={(e) => handleInputChange(e, setPriceLevel())}
                                    />
                                    {isFieldEmpty(priceLevel) && (
                                        <p className="error-message">This field is required</p>
                                    )}
                                </div>
                                <div className="column-one-third">
                                    <h2 className="field-title-button">Image*</h2>
                                    <Button>Choose a File</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NewRestaurant;
