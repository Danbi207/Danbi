import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "userId": null,
  "profileId": null,
  "name": "",
  "profileUrl": "",
  "gender":""
}

export const userSlice = createSlice({
    name: "user",
    initialState,   
    reducers: {
      setUserId : (state,action)=>{
        state.userId = action.payload;
      },
      setProfileId : (state,action)=>{
        state.profileId = action.payload;
      },
      setName : (state,action)=>{
        state.name = action.payload;
      },
      setProfileUrl : (state,action)=>{
        state.profileUrl = action.payload;
      },
      setGender : (state,action)=>{
        state.gender = action.payload;
      },
      reset: () => initialState
    }
});

export const {setUserId,setProfileId,setName,setProfileUrl,setGender, reset} = userSlice.actions;

export default userSlice.reducer;