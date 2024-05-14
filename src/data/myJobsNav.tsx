// Model
import { TNavIcon } from "components/atoms/NavIcon/NavIcon.model";
// MUI Icons
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SendIcon from "@mui/icons-material/Send";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

export const myJobsNav: TNavIcon[] = [
    {
        label: "Applied",
        startAdornment: <SendIcon />,
        to: "#",
    },
    {
        label: "Hired",
        startAdornment: <AssignmentTurnedInIcon />,
        to: "/hired",
    },
    {
        label: "Rejected",
        startAdornment: <NotInterestedIcon />,
        to: "/rejected",
    },
];
