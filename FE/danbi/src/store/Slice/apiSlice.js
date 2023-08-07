import { createSlice } from "@reduxjs/toolkit";
import api from "../../Util/apis/api";

export const apiSlice = createSlice({
  name: "api",
  initialState: new api(),
  reducers: {
    
  },
});

// export const {} = apiSlice.actions;

export default apiSlice.reducer;