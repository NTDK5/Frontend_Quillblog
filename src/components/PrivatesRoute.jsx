import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivatesRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivatesRoute;
