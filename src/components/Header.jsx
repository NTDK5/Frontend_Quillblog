import { FaSignInAlt, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { f } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useEffect, useState } from "react";
import logo from '../assets/logo.png';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [dropdown, setDropdown] = useState(false);


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav>
      <div className="nav">
        <Link to={'/'} className="logo">
          <img src={logo} width={40} height={40}></img>
          <h6>Quill<span>Blog</span></h6>
        </Link>
        <div className="nav_link">
          {userInfo ? (
            <>
              <Link to="/Create" className="create">
                create
              </Link>
              <div className="dropdown_header">
                <button
                  className="dropdown_header_btn"
                  onClick={() => setDropdown(!dropdown)} // Use setDropdown to update state
                >
                  <FaUser />
                </button>
                <div className={dropdown ? "dropdown_header_content" : "none"}>
                  <Link to="/profile"><FaCog />Settings</Link>
                  <button onClick={logoutHandler} className="logout"><FaSignOutAlt/> Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
            <Link to="/login">
              <FaSignInAlt /> Sign In
            </Link>
            <Link to="/register">
            <FaSignInAlt /> Sign Up
          </Link>
          </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
