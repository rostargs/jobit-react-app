// MUI Icons
import WidgetsIcon from "@mui/icons-material/Widgets";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
// Model
import { TNavIcon } from "components/atoms/NavIcon/NavIcon.model";

export const asideNavigation: TNavIcon[] = [
    {
        to: "/",
        label: "Dashboard",
        startAdornment: <WidgetsIcon />,
    },
    {
        to: "/jobs",
        label: "Jobs",
        root: true,
        startAdornment: <WorkIcon />,
        children: [
            {
                to: "/jobs/all",
                label: "All jobs",
            },
            {
                to: "/jobs/for-me",
                label: "Jobs for me",
            },
            {
                to: "/jobs/mine",
                label: "My jobs",
            },
        ],
    },
    {
        to: "/profile",
        label: "Profile",
        root: true,
        startAdornment: <PersonIcon />,
        children: [
            {
                to: "profile/public",
                label: "Public Profile",
            },
            {
                to: "/profile/views",
                label: "Profile Views",
            },
            {
                to: "/profile/apperance",
                label: "Search Apperances",
            },
        ],
    },
    {
        to: "/settings",
        label: "Settings",
        startAdornment: <SettingsIcon />,
    },
];
