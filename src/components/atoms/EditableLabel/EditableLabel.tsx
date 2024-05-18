// Models
import { TEditableLabel } from "./EditableLabel.model";
// MUI
import { ClickAwayListener, TextField, Typography, styled, outlinedInputClasses, Box } from "@mui/material";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";
// Hooks
import { useToggle } from "hooks/useToggle";
// React
import { useLayoutEffect } from "react";

const EditInput = styled(TextField)(({ theme }) => ({
    [`.${outlinedInputClasses.root}`]: {
        ...theme.typography.subtitle1,
        fontWeight: theme.typography.fontWeightMedium,
        borderRadius: "0.5rem",
        marginTop: "-0.2rem",
    },
    [`.${outlinedInputClasses.input}`]: {
        padding: "0.2rem 0.5rem",
        height: "auto",
    },
}));

const DisplayLabel = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
    overflow: "hidden",
    textWrap: "nowrap",
    textOverflow: "ellipsis",
    padding: "0.2rem 0.5rem",
    border: "1px solid transparent",
    borderRadius: "0.5rem",
    transition: "border-color 0.2s ease",
    marginTop: "-0.2rem",

    "&:hover": {
        borderColor: theme.palette.divider,
    },
}));

function EditableLabel<T extends FieldValues>({ name, control, placeholder = "Edit me", ...props }: TEditableLabel<T>) {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);

    useLayoutEffect(() => {
        const onPressEnter = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Enter") onSetToNegative();
        };

        window.addEventListener("keypress", onPressEnter);

        return () => window.removeEventListener("keypress", onPressEnter);
    }, []);

    return (
        <ClickAwayListener onClickAway={onSetToNegative}>
            <div>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) =>
                        active ? (
                            <EditInput value={value} onChange={onChange} error={!!error?.message} {...props} autoFocus />
                        ) : (
                            <Box maxWidth="30vw">
                                <DisplayLabel component="h6" onClick={onSetToPositive}>
                                    {value || placeholder}
                                </DisplayLabel>
                            </Box>
                        )
                    }
                />
            </div>
        </ClickAwayListener>
    );
}

export default EditableLabel;
