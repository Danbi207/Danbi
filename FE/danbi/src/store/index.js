import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slice/userSlice.js";
import settingReducer from "./Slice/settingSlice.js"
export default configureStore({
  reducer : {
    user: userReducer,
    setting:settingReducer,
  }
});