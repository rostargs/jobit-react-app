// Types
import { TNavButton } from "components/atoms/NavButton/NavButton.model";
import { TNavItem } from "components/atoms/NavItem/NavItem.model";
// Utils
import { paths } from "utils/paths";
// MUI Icons
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

export const authNavigation: TNavItem[] = [
    {
        text: "Jobs",
        children: [
            {
                to: "/auth/login",
                text: "All jobs",
            },
            {
                to: "/f",
                text: "Jobs for me",
            },
            {
                to: "f",
                text: "My jobs",
            },
        ],
    },
    {
        // to: "f",
        text: "For Employers",
        children: [
            {
                to: "f",
                text: "Hire employee",
            },
            {
                to: "f",
                text: "Create offer",
            },
        ],
    },
];

export const authNavButtons: TNavButton[] = [
    {
        text: "Login",
        path: paths.LOGIN,
    },
    {
        text: "Signup",
        path: "/auth/signup",
        nestedButtons: [
            {
                text: "Employee signup",
                path: "/auth/signup/employee",
                startIcon: <WorkHistoryIcon />,
            },
            {
                text: "Employer signup",
                path: "/auth/signup/employer",
                startIcon: <PersonSearchIcon />,
            },
        ],
    },
];
