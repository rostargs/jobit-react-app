// MUI
import { FormControl, FormLabel, InputBase, styled } from "@mui/material";
// React
import { useId } from "react";
// Models
import { TEditableUserInfo } from "./EditableUserInfo.model";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";

const InputLabel = styled(FormLabel)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
}));

const Input = styled(InputBase)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
    "& > input::placeholder": {
        color: theme.palette.text.secondary,
    },
}));

function EditableUserInfo<T extends FieldValues>({ label, name, ...rest }: TEditableUserInfo<T>) {
    const editableInputID = useId();
    return (
        <Controller
            name={name}
            render={({ field: { value } }) => (
                <FormControl fullWidth disabled>
                    <InputLabel htmlFor={editableInputID}>{label}</InputLabel>
                    <Input
                        id={editableInputID}
                        name={name}
                        {...rest}
                        value={value}
                        placeholder={!value ? "-" : undefined}
                        autoComplete="off"
                    />
                </FormControl>
            )}
        />
    );
}

export default EditableUserInfo;
