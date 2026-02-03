import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaLock, FaUser } from "react-icons/fa";
import signInImage from "../assets/signIn.jpg";
import logo from "../assets/logo.png";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ name, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.message || err.error);
    }
  };

  return (
    <div className="login_container">
      <div className="sign_in_image">
        <img src={signInImage} alt="Sign in" />
        <div className="overlay" />
      </div>

      <div className="form_container">
        <div className="form_content">
          <img src={logo} alt="Quillblog logo" width={70} height={70} />

          <h1 className="welcome">
            Welcome Back to <span>Quillblog</span>
          </h1>
          <h6>Sign in to your account below</h6>

          <form onSubmit={submitHandler}>
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
              <FaLock className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <Link to="/register">
              Doesn't have an account? Sign up now!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
