import { createSlice } from "@reduxjs/toolkit";

export const ipSlice = createSlice({
  name: "ip",
  initialState: {
    help_id : 1,
    position : {
      cur_longitude : null,
      cur_latitude : null,  
      cur_addr : '',
      dest_longitude : null,
      dest_latitude : null,
      dest_addr : null, 
      meet_longitude : null,
      meet_latitude : null,
      meet_addr : null,
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
    }
  },
});

export const { setTabMode, setMeetType, setContent, setReserveType, setIsChecked, setCategory, setCaution,
               setMeetLongitude, setMeetLatitude, setMeetAddr, setDestLongitude, setDestLatitude, setDestAddr, setCurLongitude, setCurLatitude,
               setCurrentDay, setUseTimes, setCurrentTime
              } = ipSlice.actions;

export default ipSlice.reducer;