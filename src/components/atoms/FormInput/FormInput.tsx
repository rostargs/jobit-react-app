// MUI
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
// React
import { useId } from "react";
// Model
import { TFormInput } from "./FormInput.model";
// MUI Icons
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";

function FormInput<T extends FieldValues>({
    label,
    startAdornment,
    endAdornment,
    isVisiblePassword,
    onTogglePassword,
    name,
    control,
    helperText,
    type,
    ...props
}: TFormInput<T>) {
    const inputId = useId();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                const isError = !!error?.message;
                return (
                    <FormControl fullWidth error={isError} sx={{ position: "relative" }}>
                        <InputLabel htmlFor={inputId}>{label}</InputLabel>
                        <OutlinedInput
                            id={inputId}
                            value={value}
                            label={label}
                            type={type === "password" ? (isVisiblePassword ? "text" : "password") : type}
                            startAdornment={
                                startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>
                            }
                            endAdornment={
                                type === "password" ? (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => onTogglePassword?.(name)}>
                                            {isVisiblePassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ) : (
                                    <InputAdornment position="end">{endAdornment}</InputAdornment>
                                )
                            }
                            onChange={(event) =>
                                onChange(
                                    type === "number" ? parseInt(event.currentTarget.value) : event.currentTarget.value
                                )
                            }
                            {...props}
                        />
                        <FormHelperText sx={{ position: "absolute", top: "100%" }}>
                            {isError ? error.message : helperText}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}

export default FormInput;
