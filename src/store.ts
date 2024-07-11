import { configureStore } from "@reduxjs/toolkit";
import MovesReducer from './Slices/MovesSlice';
import returnMovesReducer from './Slices/returnMovesCount';


const store = configureStore({
    reducer: {
        moves: MovesReducer,
        returnMovesCount: returnMovesReducer
    }
})

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;