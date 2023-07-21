import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken : "",
    userInfo : null,
  },
  reducers: {
    setAccessToken : (state,action)=>{
      state.accessToken = action.payload;
    },
    setUserInfo : (state,action) =>{
      state.userInfo = action.payload;
    },
  },
});

export const { setAccessToken,setUserInfo } = userSlice.actions;

export default userSlice.reducer;