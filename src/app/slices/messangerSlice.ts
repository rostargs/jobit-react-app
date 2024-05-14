// Redux
import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// API
import { firebaseApi } from "app/api/firebaseApi";
// Firebase
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
// Firebase Config
import { firestore } from "../../firebaseConfig";
// Model
import { TMessage, TMessangerRoom, TRoomReference } from "models/messanger.model";
import { TUsers } from "models/user.model";

const messangerAdapter = createEntityAdapter({
    selectId: (message: TMessage) => message.id,
});

export const initialState = messangerAdapter.getInitialState({
    contributors: [],
    lastChange: null,
    roomID: "",
} as Omit<TMessangerRoom, "messages">);

const messangerSlice = createSlice({
    name: "messanger",
    initialState,
    reducers: {
        setRoomInfo: (state, action: PayloadAction<TMessangerRoom>) => {
            const { contributors, messages, lastChange, roomID } = action.payload;
            state.contributors = contributors;
            state.lastChange = lastChange;
            state.roomID = roomID;
            messangerAdapter.setAll(state, messages);
        },
        sendMessage: (state, action: PayloadAction<TMessage>) => {
            messangerAdapter.addOne(state, action.payload);
        },
    },
});

export const extendedMessangerFirebaseApi = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRoomInfo: builder.query<null, { roomId: string }>({
            queryFn: async ({ roomId }, { dispatch }) => {
                try {
                    const roomRef = doc(firestore, "messanger", roomId);
                    onSnapshot(roomRef, (snapshot) => {
                        const data = snapshot.data() as TMessangerRoom;
                        dispatch(messangerSlice.actions.setRoomInfo(data));
                    });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            providesTags: ["Messages"],
        }),
        sendMessage: builder.mutation<null, { roomID: string; message: TMessage }>({
            queryFn: async ({ roomID, message }) => {
                try {
                    const roomRef = doc(firestore, "messanger", roomID);
                    const { messages } = (await getDoc(roomRef)).data() as TMessangerRoom;
                    messages.push(message);
                    await updateDoc(roomRef, { messages });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["Messages"],
        }),
        searchFriendByName: builder.query<TUsers[], null>({
            queryFn: async () => {
                try {
                    const usersCollection = collection(firestore, "users");
                    const friends: TUsers[] = [];
                    (await getDocs(usersCollection)).forEach((snapshot) => friends.push(snapshot.data() as TUsers));
                    return { data: friends };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
        getRoomDetails: builder.query<null, { rooms: TRoomReference[]; userID: string }>({
            queryFn: async ({ rooms, userID }) => {
                try {
                    const roomPromises = rooms.map(async (room) => {
                        const roomRef = doc(firestore, "messanger", room.roomID);
                        const roomDetails = (await getDoc(roomRef)).data() as TMessangerRoom;
                        const companionID = roomDetails.contributors.filter((id) => id !== userID)[0];
                        const companionRef = doc(firestore, "users", companionID);
                        const companionDetails = ((await getDoc(companionRef)).data() as TUsers).data;
                        return { room: roomDetails, companion: companionDetails };
                    });
                    const roomsData = (await Promise.allSettled(roomPromises))
                        .map((promise) => promise.status === "fulfilled" && promise.value)
                        .filter((item) => item);
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
    }),
});

export const { useGetRoomInfoQuery, useSearchFriendByNameQuery, useGetRoomDetailsQuery } = extendedMessangerFirebaseApi;

export default messangerSlice.reducer;
