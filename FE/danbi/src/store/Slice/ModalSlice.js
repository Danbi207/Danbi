import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    mode: null,
    ipRequestList: [],
    targetMemberId: 0,
    isDeleted : false,
  },
  reducers: {
    setIsDeleted: (state,action)=>{
      state.isDeleted=!state.isDeleted;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setIpRequestList: (state, action) => {
      state.ipRequestList = action.payload;
    },
    setTargetMemberId: (state, action) => {
      state.targetMemberId = action.payload;
    },
    // 항목 삭제 리덕스 적용
    deleteIpRequest: (state, action) => {
      state.ipRequestList = state.ipRequestList.filter(
        item => item.helpPostId !== action.payload
      );
    },
  },
});

export const { setIsDeleted,setMode, setIpRequestList, setTargetMemberId, deleteIpRequest } = modalSlice.actions;

export default modalSlice.reducer;