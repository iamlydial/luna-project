import { useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import "./startRating.css";

const StarRating = ({ StarRating, totalRatingNumber, ExtraClasses, Input = false, PassRating }) => {
  const [rating, setRating] = useState(StarRating);

  return (
    <div className={`starRating-container ${ExtraClasses}`}>
      <div>
        {[...Array(5)].map((item, idx) => {
          const ratingValue = idx + 1;
          return (
            <label key={idx}>
              <input
                type="radio"
                name="rating"
                className=" startInput"
                value={rating === 0 ? 5 : ratingValue}
                onClick={() => Input ? PassRating(ratingValue): null}
              />
              <RiStarSFill
                className="starSize"
                color={
                  StarRating && StarRating >= ratingValue
                    ? "#ffc107"
                    : "#EAEAEA"
                }
              />
            </label>
          );
        })}
      </div>
      <p className="totalRatingNumber">{totalRatingNumber}</p>
    </div>
  );
};

export default StarRating;
