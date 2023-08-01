import { createSlice } from "@reduxjs/toolkit";

export const JandiSlice = createSlice({
    name: "Jandi",
    initialState: {
        created_time: null,
        showOverLay: false,
    },
    reducers: {
        setCreatedTime: (state, action) => {
            if(state.created_time === null) {
                state.created_time = action.payload;
            } else {
                state.created_time = null;
            }
        },
        setShowOverLay: (state) => {
            state.showOverLay = false;
        }
    }
});

export const {setCreatedTime, setShowOverLay} = JandiSlice.actions;

export default JandiSlice.reducer;