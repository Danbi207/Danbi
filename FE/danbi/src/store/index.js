import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./Slice/settingSlice.js";
import ipReducer from './Slice/ipSlice.js';
import JandiReducer from './Slice/JandiSlice.js';
import modalReducer from "./Slice/ModalSlice.js";
import userReducer from "./Slice/userSlice.js";
export default configureStore({
  reducer : {
    setting:settingReducer,
    ip : ipReducer,
    Jandi: JandiReducer,
    modal : modalReducer,
    user : userReducer
  }
});