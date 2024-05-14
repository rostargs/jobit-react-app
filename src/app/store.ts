// Redux
import { configureStore } from "@reduxjs/toolkit";
// Api
import { firebaseApi } from "./api/firebaseApi";
// Slices
import userSlice from "./slices/userSlice";
import viewSlice from "./slices/viewSlice";
import messangerSlice from "./slices/messangerSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        view: viewSlice,
        messanger: messangerSlice,
        [firebaseApi.reducerPath]: firebaseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
