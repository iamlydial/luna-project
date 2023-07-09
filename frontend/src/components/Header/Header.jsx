import LunaLogo from "../../assets/images/luna-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

import "./header.css";
import {useDispatch} from "react-redux";
import {logout} from "../../store/slices/user.js";

const MenuItems = [
  { name: "Home", link: "/" },
  { name: "Search", link: "/search" },
  { name: "Profile", link: "/profile" },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <header className="headerContainer">
      <img src={LunaLogo} alt="Luna Logo" />
      <nav className="flexContainer">
        <ul className="flexContainer">
          {MenuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className="header-buttons-container">
          <button
            className="header-button-left"
            onClick={() => {
              navigate("/signup");
            }}
          >
            signup
          </button>
          <button
            className="header-button-right"
            onClick={() => {
              navigate("/login");
            }}
          >
            login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
