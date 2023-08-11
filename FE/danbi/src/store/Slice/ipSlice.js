import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position : {
    cur_longitude : '',
    cur_latitude : '',  
    cur_addr : '',
    dest_longitude : '',
    dest_latitude : '',
    dest_addr : '', 
    meet_longitude : '',
    meet_latitude : '',
    meet_addr : '',
  },
  tabmode : 'time',
  reservetype : '',
  meetType : '',
  category : 'NONE',
  caution : '',
  content : '',
  ischecked : false,
  currentDay : [],
  currentTime : [],
  useTimes : 0,
}

export const ipSlice = createSlice({
  name: "ip",
  initialState,
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
    setCaution : (state, action) => {
        state.caution = action.payload;
    },
    setReserveType : (state, action) => {
      state.reservetype = action.payload;
    },
    setIsChecked : (state, action) => {
      state.ischecked = action.payload;
    },
    setCategory : (state, action) => {
      state.category = action.payload
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
    setCurLongitude : (state, action) => {
      state.position.cur_longitude = action.payload;
    },
    setCurLatitude : (state, action) => {
      state.position.cur_latitude = action.payload;
    },
    setCurrentDay : (state, action) => {
      state.currentDay = action.payload;
    },
    setCurrentTime : (state, action) => {
      state.currentTime = action.payload;
    },
    setUseTimes : (state, action) => {
      state.useTimes = action.payload;
    },
    ResetIpState: () => initialState,
    // SetHelpDetailData : (state, action) => {
    //   state.
    // }
  },
});

export const { setTabMode, setMeetType, setContent, setReserveType, setIsChecked, setCategory, setCaution,
               setMeetLongitude, setMeetLatitude, setMeetAddr, setDestLongitude, setDestLatitude, setDestAddr, setCurLongitude, setCurLatitude,
               setCurrentDay, setUseTimes, setCurrentTime,
               ResetIpState
              } = ipSlice.actions;

export default ipSlice.reducer;