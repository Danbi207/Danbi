import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    mode : null,
    targetMemberId:0,
  },
  reducers: {
    setMode : (state,action)=>{
      state.mode = action.payload;
    },
    setTargetMemberId : (state,action)=>{
      state.targetMemberId = action.payload;
    }
  },
});

export const { setMode,setTargetMemberId } = modalSlice.actions;

export default modalSlice.reducer;