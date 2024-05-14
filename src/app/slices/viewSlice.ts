import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TViewSlice = {
    greeting: boolean;
};

const initialState: TViewSlice = {
    greeting: false,
};

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        setViewProperty: (state, action: PayloadAction<{ prop: keyof TViewSlice; value: boolean }>) => {
            const { prop, value } = action.payload;
            state[prop] = value;
        },
    },
});

export const { setViewProperty } = viewSlice.actions;
export default viewSlice.reducer;
