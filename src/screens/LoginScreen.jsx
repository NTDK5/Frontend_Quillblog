import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaSignInAlt, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import signInImage from '../assets/signIn.jpg';
import logo from '../assets/logo.png';
import { FaPerson } from "react-icons/fa6";



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
      const res = await login({ name, password}).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.message || err.error);
    }
  };

  return (
    <div className="login_container">
           <div className="sign_in_image">
        <img src={signInImage} alt="signinimage" />
        <div className="overlay"></div>
      </div>
      <div className="form_container">
        <div className="form_content">
        <img src={logo} width={70} height={70}></img>
          <h1 className="welcome">Welcome Back to <span>Quillblog</span></h1>
          <h6>sign in to your account bellow</h6>
          <form onSubmit={submitHandler}>
          <div className="form_group">
  <FaUser className="input-icon" />
  <input
    type="name"
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
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</div>
        <button type="submit">Sign In</button>
        <Link to="/register">Dosen't have an account, Sign up Now!</Link>
      </form>
        </div>
      </div>

    </div>
  );
};

export default LoginScreen;
