// MUI Icons
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
// Model
import { TNavIcon } from "components/atoms/NavIcon/NavIcon.model";

export const userConsoleData: TNavIcon[] = [
    {
        to: "/profile/public",
        startAdornment: <PersonRoundedIcon />,
        label: "My Profile",
    },
    {
        to: "/settings",
        startAdornment: <SettingsIcon />,
        label: "Settings",
    },
    {
        to: "/logout",
        startAdornment: <MeetingRoomRoundedIcon />,
        label: "Logout",
    },
];
