import { configureStore } from "@reduxjs/toolkit"
import settingReducer from "./Slice/settingSlice.js"
import ipReducer from './Slice/ipSlice.js'
import JandiReducer from './Slice/JandiSlice.js'
import modalReducer from "./Slice/ModalSlice.js";
import apiReducer from "./Slice/apiSlice.js"
export default configureStore({
  reducer : {
    setting:settingReducer,
    ip : ipReducer,
    Jandi: JandiReducer,
    modal : modalReducer,
    api : apiReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      // ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // ovActions: false,
      // },
    }),
});