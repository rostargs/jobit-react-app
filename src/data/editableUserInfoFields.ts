// Models
import { TEmployeeDataKeys } from "components/organisms/BasicUserInfo/BasicUserInfo";
import { TEmployerDataFields } from "components/organisms/CompanyInfo/CompanyInfo";

export const editableEmployeeInfoFields: { name: TEmployeeDataKeys; label: string }[] = [
    {
        name: "email",
        label: "Email Address",
    },
    {
        name: "name",
        label: "Name",
    },
    {
        name: "gender",
        label: "Gender",
    },
    {
        name: "phoneNumber",
        label: "Phone Number",
    },
    {
        name: "location",
        label: "Location",
    },
    {
        name: "position",
        label: "Position",
    },
];

export const editableEmployerInfoFields: { name: TEmployerDataFields; label: string }[] = [
    {
        label: "email",
        name: "email",
    },
    {
        label: "location",
        name: "location",
    },
    {
        label: "phone number",
        name: "phoneNumber",
    },
    {
        label: "owner name",
        name: "ownerName",
    },
    {
        label: "domen",
        name: "domen",
    },
    {
        label: "company name",
        name: "companyName",
    },
];
