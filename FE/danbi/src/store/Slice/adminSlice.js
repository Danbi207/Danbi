import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
      "user":{
        "id": 0,
        "oauthType": "",
        "email": "",
        "name": "",
        "nickname": "",
        "profileUrl": "",
        "role": "",
        "gender": "",
        "state": "",
        "accuseStack": 0
      }
    },
    reducers: {
      setUser : (state,action)=>{
        state.user = {...action.payload};
      },
    }
});

export const {setUser} = adminSlice.actions;

export default adminSlice.reducer;