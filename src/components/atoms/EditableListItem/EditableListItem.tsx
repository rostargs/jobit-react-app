// MUI
import {
    ClickAwayListener,
    InputBase,
    styled,
    Box,
    Fade,
    Paper,
    Typography,
    InputAdornment,
    boxClasses,
} from "@mui/material";
// MUI Icons
import HelpIcon from "@mui/icons-material/Help";
import RemoveIcon from "@mui/icons-material/Remove";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";
// Models
import { TEditableListItem, TErrorState, TStyledListItemProps } from "./EditableListItem.model";
// Utils
import { removeWhiteSpace } from "utils/removeWhiteSpace";
// Hooks
import { useToggle } from "hooks/useToggle";
// Components
import NavBadge from "../NavBadge/NavBadge";

const StyledListItem = styled("li", { shouldForwardProp: (prop) => prop !== "isError" })<TStyledListItemProps>(
    ({ theme, isError }) => ({
        display: "list-item",
        paddingBottom: "0px",
        paddingTop: "0.25rem",
        color: isError ? theme.palette.error.main : "inherit",
        border: "1px solid transparent",
        borderRadius: "0.25rem",
        transition: "all 0.25s ease-in",
    })
);

const Input = styled(InputBase)(({ theme, error }) => ({
    color: error ? theme.palette.error.main : "inherit",
    alignItems: "baseline",

    [`.${boxClasses.root}`]: {
        visibility: "hidden",
        opacity: 0,
        transition: "all 0.25s linear",
        transitionDelay: "0.4s",
    },

    [`&:hover  .${boxClasses.root}`]: {
        visibility: "visible",
        opacity: 1,
    },
}));

const ErrorContent = styled(Paper)({
    position: "absolute",
    bottom: "110%",
    right: 0,
    padding: "0.5rem 1rem",
});

const DragIndicator = styled(InputAdornment)(({ theme }) => ({
    cursor: "grab",
    transition: "all 0.25s ease",

    "&:hover": {
        color: theme.palette.action.focus,
        opacity: 0.9,
    },
}));

const ErrorState = ({ message }: TErrorState) => {
    const { active, onSetToNegative, onToggle } = useToggle(false);

    const isError = !!message?.length;
    const tooltipText = isError ? "Item state" : "Verified";

    return (
        <ClickAwayListener onClickAway={onSetToNegative}>
            <Box position="relative" display="flex">
                <NavBadge name={tooltipText} invisible disabled={!isError}>
                    {isError ? <HelpIcon color="error" onClick={onToggle} /> : <VerifiedUserIcon />}
                </NavBadge>
                <Fade in={active}>
                    <ErrorContent elevation={5}>
                        <Typography variant="body2" whiteSpace="nowrap">
                            {message}
                        </Typography>
                    </ErrorContent>
                </Fade>
            </Box>
        </ClickAwayListener>
    );
};

function EditableListItem<T extends FieldValues>({
    control,
    name,
    onDelete,
    index,
    baseInputProps,
    listItemProps,
    hideVerifiedIcon = false,
}: TEditableListItem<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ fieldState: { error }, field: { onChange, value } }) => {
                const isError = !!error?.message;
                return (
                    <StyledListItem isError={isError} {...listItemProps} datatype-index={index}>
                        <Input
                            onChange={(e) => onChange(removeWhiteSpace(e.target.value))}
                            value={value}
                            multiline
                            fullWidth
                            error={isError}
                            endAdornment={
                                !baseInputProps?.disabled && (
                                    <Box display="flex" alignItems="center" gap="1rem" marginLeft={3}>
                                        <NavBadge name="Remove item" invisible onClick={() => onDelete(index)}>
                                            <RemoveIcon color="error" />
                                        </NavBadge>
                                        {!hideVerifiedIcon && <ErrorState message={error?.message} />}
                                    </Box>
                                )
                            }
                            startAdornment={
                                listItemProps?.draggable && (
                                    <DragIndicator position="start">
                                        <DragIndicatorIcon />
                                    </DragIndicator>
                                )
                            }
                            {...baseInputProps}
                        />
                    </StyledListItem>
                );
            }}
        />
    );
}

export default EditableListItem;
