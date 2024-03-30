import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;

