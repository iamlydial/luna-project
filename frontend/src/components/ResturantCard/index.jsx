import "./restaurantCard.css";
import StarRating from "../StarRating";
import {useNavigate} from "react-router-dom";

const ResturantCard = ({
  title,
  address,
  totalRatingNumber,
  StarsNumber,
  image,
  id
}) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
    navigate(`/search/restaurants/${id}`);
  };

  return (
    <div className="restaurant-card-container" onClick={onClickHandler}>
      <h4 className="restaurantCardTitle" >{title}</h4>
      <p className="restaurantCardAddress" >{address}</p>
      <StarRating
        StarRating={StarsNumber}
        totalRatingNumber={totalRatingNumber}
        ExtraClasses={"starsMargin"}
      />
      <img src={image} alt={title} className="restaurant-card-image" />
    </div>
  );
};

export default ResturantCard;
