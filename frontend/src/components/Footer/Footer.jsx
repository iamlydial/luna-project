import "./footer.css";
import Facebook from "../../assets/icons/facebook.svg";
import Twitter from "../../assets/icons/twitter.svg";
import GooglePlus from "../../assets/icons/googleplus.svg";
import Instagram from "../../assets/icons/instagram.svg";
import { NavLink } from "react-router-dom";

const Footermenu = [
  { name: "About us", link: "/aboutus" },
  { name: "Press", link: "/press" },
  { name: "Blog", link: "/blog" },
  { name: "Ios", link: "/ios" },
  { name: "Andriod", link: "/andriod" },
];

const SocialMedia = [
  { name: "Facebook", icon: Facebook, link: "www.facebook.com" },
  { name: "Twitter", icon: Twitter, link: "www.twitter.com" },
  { name: "Google Plus", icon: GooglePlus, link: "www.google.com" },
  { name: "Instagram", icon: Instagram, link: "www.instagram.com" },
];
const Footer = () => {
  return (
    <footer className="footer-container ">
      <ul className="footer-pages-menu">
        {Footermenu.map((item, idx) => (
          <li key={idx}>
            <NavLink to={item.link}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <ul className="footer-socialmedia-icons">
        {SocialMedia.map((item, idx) => (
          <li key={idx}>
            <a href={item.link} target="_blank">
              <img src={item.icon} alt={item.name} />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
