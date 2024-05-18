// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Models
import { TSetViewPropertyAction, TViewSlice } from "app/types/viewSlice.model";

const initialState: TViewSlice = {
    greeting: false,
};

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setViewProperty: (state, action: PayloadAction<TSetViewPropertyAction>) => {
            const { prop, value } = action.payload;
            state[prop] = value;
        },
    },
});

export const { setViewProperty } = viewSlice.actions;
export default viewSlice.reducer;
