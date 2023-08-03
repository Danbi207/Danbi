import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    mode : true,
  },
  reducers: {
    setMode : (state,action)=>{
      state.mode = action.payload;
    },
  },
});

export const {setMode } = modalSlice.actions;

export default modalSlice.reducer;