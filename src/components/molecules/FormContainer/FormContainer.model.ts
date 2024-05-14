// React
import { USER_TYPE } from "models/user.model";
import { ReactNode } from "react";

export type TFormContainer = {
    children?: ReactNode;
    variant: "login" | "employeeSignup" | "employerSignup";
    userType?: USER_TYPE;
};

