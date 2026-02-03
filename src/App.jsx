import { ToastContainer } from "react-toastify";
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

