import React from "react";
import pin from "../../assets/icons/pin.svg";
import phone from "../../assets/icons/phone.svg";
import web from "../../assets/icons/web.svg";
import "./LocationInformation.css";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function LocationInformation({ restaurantData }) {
  const website = restaurantData.website || "";
  const trimmedWebsite = website.replace(/^https?:\/\/(www\.)?/, "");
  const trimmedWebsiteWithoutSlash = trimmedWebsite.replace(/\/$/, "");

  const defaultProps = {
    center: {
      lat: 47.37024602492377,
      lng: 8.539850381753189,
    },
    zoom: 11,
  };

  return (
    <div className="LocationInformationDiv">
      <div className="TopDiv">
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
      <div className="BottomDiv">
        <div className="address">
          <img src={pin} alt="Location Pin" height="26" />
          <div>{restaurantData.street}</div>
        </div>
        <div className="phone">
          <img src={phone} alt="Phone Icon" height="26" />
          <div>{restaurantData.phone}</div>
        </div>
        <div className="website">
          <img src={web} alt="Web Icon" height="26" />
          <a href={restaurantData.website} target="_blank">
            {trimmedWebsiteWithoutSlash}
          </a>
        </div>
      </div>
    </div>
  );
}
