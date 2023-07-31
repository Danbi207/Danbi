import { createSlice } from "@reduxjs/toolkit";

export const ipSlice = createSlice({
  name: "ip",
  initialState: {
    tabmode : 'meet',
    reservetype : '',
    meetType : '',
    category : ['이동', '기타'],
    detailContent : '',
    openIndex : '0',
    ischecked : false,

  },
  reducers: {
    setTabMode : (state,action)=>{
      state.tabmode = action.payload;
    },
    setMeetType : (state, action) => {
        state.meetType = action.payload;
    },
    setDetailContent : (state, action) => {
        state.detailContent = action.payload;
    },
    setReserveType : (state, action) => {
      state.reservetype = action.payload;
    },
    setIsChecked : (state, action) => {
      state.ischecked = action.payload;
    }

  },
});

export const { setTabMode, setMeetType, setDetailContent, setReserveType, setIsChecked } = ipSlice.actions;

export default ipSlice.reducer;