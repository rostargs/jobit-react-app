// MUI Icons
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BadgeIcon from "@mui/icons-material/Badge";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
// Model
import { TBaseFormInputProps } from "components/atoms/FormInput/FormInput.model";
import { TEmployeeSignupFormType } from "components/organisms/Signup/Employee";
import { TEmployerSignupFormType } from "components/organisms/Signup/Employer";

export const employeeSignupInputs: TBaseFormInputProps<TEmployeeSignupFormType>[] = [
    {
        name: "email",
        label: "email",
        type: "text",
        startAdornment: <EmailRoundedIcon />,
    },
    {
        name: "name",
        label: "employee full name",
        type: "text",
        startAdornment: <BadgeIcon />,
    },
    {
        name: "password",
        label: "password",
        type: "password",
        startAdornment: <VpnKeyRoundedIcon />,
    },
    {
        name: "confirm",
        label: "confirm password",
        type: "password",
        startAdornment: <OfflinePinIcon />,
    },
];

export const employerSignupInputs: TBaseFormInputProps<TEmployerSignupFormType>[] = [
    {
        name: "email",
        label: "email",
        type: "text",
        startAdornment: <EmailRoundedIcon />,
    },
    {
        name: "companyName",
        label: "company name",
        type: "text",
        startAdornment: <ApartmentIcon />,
    },
    {
        name: "password",
        label: "password",
        type: "password",
        startAdornment: <VpnKeyRoundedIcon />,
    },
    {
        name: "confirm",
        label: "confirm password",
        type: "password",
        startAdornment: <OfflinePinIcon />,
    },
];
