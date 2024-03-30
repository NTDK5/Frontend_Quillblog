import { FaSignInAlt, FaEnvelope, FaLock, FaUser, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import signInImage from '../assets/signIn.jpg';


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          name: name,
          email: email,
          password: password,
        });
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
        <div className="login_container">
        <div className="form_container">
          <div className="form_content">
          <img src={logo} width={70} height={70}></img>
            <h1 className="welcome">Welcome to <span>Quillblog</span> Join Us!</h1>
            <h6>sign in to your account bellow</h6>
            <form onSubmit={handleSubmit}>
            <div className="form_group">
    <FaEnvelope className="input-icon" />
    <input
      type="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Username"
      required
    />
  </div>
  <div className="form_group">
    <FaUser className="input-icon" />
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      required
    />
  </div>
  <div className="form_group">
    <FaLock className="input-icon" />
    <input
      type="password"
      value={password}
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  <div className="form_group">
    <FaCheckCircle className="input-icon" />
    <input
      type="Password"
      value={confirmpassword}
      placeholder="Confirm Password"
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
  </div>
          <button type="submit">Sign In</button>
          <Link to="/login">Already Have an account Sign In now!</Link>
        </form>
          </div>
        </div>
              <div className="sign_in_image">
        <img src={signInImage} alt="signinimage" />
        <div className="overlay"></div>
      </div>
  
      </div>
  );
};

export default RegisterScreen;
