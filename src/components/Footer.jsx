import React from "react";
import {
  FaLongArrowAltRight,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_content">
        <div className="footer_links">
          <div className="footer_links_left">
            <div className="logo">
              <h1>logo</h1>
            </div>
            <div className="short_links">
              <a href="#">Shop</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="others">
            <div className="others_left">
              <a href="#">Order Status</a>
              <a href="#">Shipping and Delivery</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div className="others_right">
              <a href="#">Payment Options</a>
              <a href="#">Guides</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
        <div className="contact_info">
          <form className="subscribe">
            <input type="email" name="mail" placeholder="Your email here" />
            <button type="submit">
              <FaLongArrowAltRight />
            </button>
          </form>
          <div className="socials">
            <FaFacebook />
            <FaInstagram />
            <FaTiktok />
            <FaTwitter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
