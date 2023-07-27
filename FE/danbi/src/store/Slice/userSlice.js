import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    tokenInfo : {
      accessToken:null,
      accessTokenExpireTime:null,
      grantType:null,
    },
    role : null,
  },
  reducers: {
    setTokenInfo : (state,action)=>{
      state.tokenInfo = action.payload;
    },
    setRole : (state,action) => {
      state.role = action.payload;
    }
  },
});

export const { setTokenInfo,setRole } = userSlice.actions;

export default userSlice.reducer;