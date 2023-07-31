import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slice/userSlice.js";
import settingReducer from "./Slice/settingSlice.js"
import ipReducer from './Slice/ipSlice.js'

export default configureStore({
  reducer : {
    user: userReducer,
    setting:settingReducer,
    ip : ipReducer
  }
});