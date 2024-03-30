import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice, blogApi } from "./slices/apiSlice";
import blogReducer from "./slices/blogSlice";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    auth: authReducer,
    blog: blogReducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck:false}).concat([apiSlice.middleware, blogApi.middleware]),
  devTools: true,
});

export default store;
