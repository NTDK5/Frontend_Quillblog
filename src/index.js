import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CreateBlogScreen from "./screens/CreateBlog.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivatesRoute from "./components/PrivatesRoute.jsx";
import firebase from 'firebase/compat/app'; // Import Firebase app
import firebaseConfig from './firebaseConfig';
import HomeScreen from "./screens/HomeScreen.jsx";
import DetailBlog from "./screens/DetailBlog.jsx";
import EditBlogScreen from "./screens/EditBlogScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/create" element={<CreateBlogScreen />} />
      <Route path="/editblog/:id" element={<EditBlogScreen />} />
      <Route
          path="/blog/:id"
          element={<DetailBlog/>}
        />
      <Route path="" element={<PrivatesRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
