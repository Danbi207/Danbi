import { createSlice } from "@reduxjs/toolkit";
import { Token } from "../../Util/private/token";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token:new Token()
  },
  reducers: {
    
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;