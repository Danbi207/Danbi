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
      setUserInfo : (state,action)=>{
        console.log(action);
        state = action.payload;
      },
    }
});

export const {setUserInfo} = userSlice.actions;

export default userSlice.reducer;