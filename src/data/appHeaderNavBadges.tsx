// Model
import { TNavBadge } from "components/atoms/NavBadge/NavBadge.model";
// MUI Icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailRoundedIcon from "@mui/icons-material/MailRounded";

export const appHeaderNavBadges: TNavBadge[] = [
    {
        to: "/notifications",
        children: <NotificationsIcon />,
        name: "Notifications",
    },
    {
        to: "/messanger",
        children: <MailRoundedIcon />,
        name: "Messages",
    },
];
