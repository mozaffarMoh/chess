import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data: [],
};

export const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState: initialState,
    reducers: {
        addMoves: (state, action) => {
            state.data.push(action.payload);
        },
        startfromThisPoint: (state, action) => {

            if (action.payload > 0) { state.data = state.data.slice(0, action.payload + 1) }
        }
    }
})

export const { addMoves, startfromThisPoint } = ordersSlice.actions;
export default ordersSlice.reducer;
