import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {useUpdateUserMutation} from "../slices/usersApiSlice"

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;
  console.log(token)

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          token,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
        navigate('/')
      } catch (err) {
        toast.error(err.data.message || err.error);
      }
    }
  };
  return (
    <>
    <div className="update_form_container">
      <div className="update_form_content">
      <h2>
        <FaSignOutAlt />
        Update Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="form_group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="form_group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form_group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      </div>
    </div>
    </>
  );
};

export default ProfileScreen;
