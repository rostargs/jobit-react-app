import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApi = createApi({
    reducerPath: "firebase",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["User", "Messages"],
    endpoints: () => ({}),
});
