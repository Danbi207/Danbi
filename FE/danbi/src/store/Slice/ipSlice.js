import { createSlice } from "@reduxjs/toolkit";

export const ipSlice = createSlice({
  name: "ip",
  initialState: {
    tabmode : 'meet',
    reservetype : '',
    meetType : '',
    category : ['이동', '기타'],
    content : '',
    openIndex : 0,
    ischecked : false,
  },
  reducers: {
    setTabMode : (state,action)=>{
      state.tabmode = action.payload;
    },
    setMeetType : (state, action) => {
        state.meetType = action.payload;
    },
    setContent : (state, action) => {
        state.content = action.payload;
    },
    setReserveType : (state, action) => {
      state.reservetype = action.payload;
    },
    setIsChecked : (state, action) => {
      state.ischecked = action.payload;
    },
    setOpenIndex : (state, action) => {
      state.openIndex = action.payload
    }
  },
});

export const { setTabMode, setMeetType, setContent, setReserveType, setIsChecked, setOpenIndex } = ipSlice.actions;

export default ipSlice.reducer;