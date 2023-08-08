import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
      "userId": null,
      "profileId": null,
      "name": "",
      "profileUrl": "",
      "gender":""
    },
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
      }
      
    }
});

export const {setUserId,setProfileId,setName,setProfileUrl,setGender} = userSlice.actions;

export default userSlice.reducer;