import "./button.css";

const Button = ({ type, onClickFunction, children, externalClass }) => {
  return (
    <button
      type={type}
      onClick={onClickFunction}
      className={`luna-button ${externalClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
