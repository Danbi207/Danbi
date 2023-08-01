import { createSlice } from "@reduxjs/toolkit";

export const ipSlice = createSlice({
  name: "ip",
  initialState: {
    help_id : 1,
    position : {
      cur_longitude : "128.3444",
      cur_latitude : "36.119485",
      cur_addr : "",
      dest_longitude : "128.3444",
      dest_latitude : "128.3444",
      dest_addr : "", 
      meet_longitude : "128.3444",
      meet_latitude : "128.3444",
      meet_addr : "",
    },
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
      state.openIndex = action.payload;
    },
    setMeetLongitude : (state, action) => {
      state.position.meet_longitude = action.payload;
    },
    setMeetLatitude : (state, action) => {
      state.position.meet_latitude = action.payload;
    },
    setMeetAddr : (state, action) => {
      state.position.meet_addr = action.payload;
    },
    setDestLongitude : (state, action) => {
      state.position.dest_longitude = action.payload;
    },
    setDestLatitude : (state, action) => {
      state.position.dest_latitude = action.payload;
    },
    setDestAddr : (state, action) => {
      state.position.dest_addr = action.payload;
    },
  },
});

export const { setTabMode, setMeetType, setContent, setReserveType, setIsChecked, setOpenIndex,
               setMeetLongitude, setMeetLatitude, setMeetAddr, setDestLongitude, setDestLatitude, setDestAddr,
              } = ipSlice.actions;

export default ipSlice.reducer;