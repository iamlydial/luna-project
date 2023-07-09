import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div class="dots"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
