import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    mode: null,
    accuse: {
      targetMemberId: null,
    },
    ipdetail: {
      ipRequestList: [],
    },
    targetMemberId: 0,
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setIpRequestList: (state, action) => {
      state.ipdetail.ipRequestList = action.payload;
    },
    setTargetMemberId: (state, action) => {
      state.targetMemberId = action.payload;
    }
  },
});

export const { setMode, setIpRequestList, setTargetMemberId } = modalSlice.actions;

export default modalSlice.reducer;