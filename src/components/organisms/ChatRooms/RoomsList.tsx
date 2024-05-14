import { Stack } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { useGetRoomDetailsQuery } from "app/slices/messangerSlice";
import { RootState } from "app/store";
import RoomItem from "components/molecules/RoomItem/RoomItem";
import { TUsers } from "models/user.model";

const RoomsList = () => {
    const { chats, uid } = useAppSelector((state: RootState) => state.user.currentUser as TUsers);
    const { data } = useGetRoomDetailsQuery({ rooms: chats, userID: uid });

    const isUserHasChats = !!chats.length;

    return (
        <Stack direction="column" gap={1}>
            <RoomItem />
            <RoomItem />
            <RoomItem />
            <RoomItem />
            <RoomItem />
        </Stack>
    );
};

export default RoomsList;
