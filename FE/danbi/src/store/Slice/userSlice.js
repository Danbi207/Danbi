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
        state.user = action.payload;
        console.log(state);
      },
    }
});

export const {setUserInfo} = userSlice.actions;

export default userSlice.reducer;