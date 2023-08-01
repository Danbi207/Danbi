import { createSlice } from "@reduxjs/toolkit";

export const JandiSlice = createSlice({
    name: "Jandi",
    initialState: {
        created_time: null,
        showOverLay: false,
    },
    reducers: {
        setCreatedTime: (state, action) => {
            state.created_time = action.payload;
        },
        setShowOverLay: (state, action) => {
            state.showOverLay = action.payload;
        }
    }
});

export const {setCreatedTime, setShowOverLay} = JandiSlice.actions;

export default JandiSlice.reducer;