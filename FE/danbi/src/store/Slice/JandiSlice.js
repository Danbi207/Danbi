import { createSlice } from "@reduxjs/toolkit";

export const JandiSlice = createSlice({
    name: "Jandi",
    initialState: {
        item : {
			name : "원래색",
			uncheckedRgb : "#39D353",
			checkedRgb : "#006D32",
			tier : "COMMON"
		},
		dew_point : 123456,
    },
    reducers: {
        setUnchedkedRgb: (state, action) => {
            state.item.uncheckedRgb = action.payload
        },
        setCheckedRgb: (state, action) => {
            state.item.checkedRgb = action.payload
        },
        setName: (state, action) => {
            state.item.name = action.payload
        },
        setTier: (state, action) => {
            state.item.tier = action.payload
        },
        setDewPoint: (state, action) => {
            state.data = action.payload
        }
    }
});

export const {setUnchedkedRgb, setCheckedRgb, setName, setTier, setDewPoint} = JandiSlice.actions;

export default JandiSlice.reducer;