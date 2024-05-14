// Model
import { TAvailableFriendsList } from "./SearchFriend.model";
// Redux
import { useSearchFriendByNameQuery } from "app/slices/messangerSlice";
// MUI
import { Box } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { TUsers } from "models/user.model";
import RoomItem from "../RoomItem/RoomItem";
import { useMemo } from "react";

const AvailableFriendsList = ({ userName }: TAvailableFriendsList) => {
    const { uid } = useAppSelector((state: RootState) => state.user.currentUser as TUsers);
    const { data: availableUsersList } = useSearchFriendByNameQuery(null);

    const filteredUsersList = useMemo(() => {
        const formatedUserName = String(userName).trim().toLowerCase();
        if (!!!availableUsersList?.length || !!!formatedUserName.length) return [];
        return availableUsersList.filter((user) => {
            const isNotTheSameUser = user.uid !== uid;
            if (isNotTheSameUser) return user.data.name.toLowerCase().includes(formatedUserName);
        });
    }, [availableUsersList, userName]);

    const isFriendsFound = !!filteredUsersList?.length;

    const renderFriendsList = filteredUsersList.map(({ data, uid }) => (
        <RoomItem name={data.email} position={data.position} onClickCard={() => console.log(uid)} key={uid} />
    ));

    return <Box>{isFriendsFound ? renderFriendsList : <>No friends found</>}</Box>;
};

export default AvailableFriendsList;
