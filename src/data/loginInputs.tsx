// MUI Icons
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
// Model
import { TBaseFormInputProps } from "components/atoms/FormInput/FormInput.model";
import { TLoginFormType } from "components/organisms/Login/Login";

export const loginInputs: TBaseFormInputProps<TLoginFormType>[] = [
    {
        name: "email",
        label: "email",
        type: "text",
        startAdornment: <EmailRoundedIcon />,
    },
    {
        name: "password",
        label: "password",
        type: "password",
        startAdornment: <VpnKeyRoundedIcon />,
    },
];
