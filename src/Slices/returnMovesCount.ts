import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    value: 0,
};

export const returnMovesSlices = createSlice({
    name: "returnMovesSlices",
    initialState: initialState,
    reducers: {
        increaseCount: (state) => {
            state.value = state.value + 1;
        },
        decreaseCount: (state) => {
            state.value = state.value - 1;
        },
    }
})

export const { increaseCount, decreaseCount } = returnMovesSlices.actions;
export default returnMovesSlices.reducer;
