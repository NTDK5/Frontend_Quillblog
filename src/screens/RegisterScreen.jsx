import { FaEnvelope, FaLock, FaUser, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import signInImage from "../assets/signIn.jpg";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="login_container">
      <div className="form_container">
        <div className="form_content">
          <img
            src={logo}
            alt="Quillblog logo"
            width={70}
            height={70}
          />

          <h1 className="welcome">
            Welcome to <span>Quillblog</span> — Join Us!
          </h1>
          <h6>Create your account below</h6>

          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <FaUser className="input-icon" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                required
              />
            </div>

            <div className="form_group">
              <FaEnvelope className="input-icon" />
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="form_group">
              <FaCheckCircle className="input-icon" />
              <input
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>

            <Link to="/login">
              Already have an account? Sign in now!
            </Link>
          </form>
        </div>
      </div>

      <div className="sign_in_image">
        <img src={signInImage} alt="Register illustration" />
        <div className="overlay" />
      </div>
    </div>
  );
};

export default RegisterScreen;
