import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slice/userSlice.js";
export default configureStore({
  reducer : {
    user: userReducer,
  }
});