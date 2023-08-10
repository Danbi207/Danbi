import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    mode : null,
    accuse:{
      targetMemberId:null,
    },
    ipdetail : {
      ipRequestList : [],
    },
  },
  reducers: {
    setMode : (state,action)=>{
      state.mode = action.payload;
    },
    setIpRequestList : (state, action) => {
      state.mode = action.payload;
    }
  },
});

export const { setMode, setIpRequestList } = modalSlice.actions;

export default modalSlice.reducer;