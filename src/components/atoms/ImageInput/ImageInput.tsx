// Model
import { ACCEPTED_IMAGE_TYPES, TImageButtonProps, TImageInput } from "./ImageInput.model";
// MUI
import {
    Box,
    ButtonBase,
    ClickAwayListener,
    Divider,
    IconButton,
    Paper,
    Fade,
    Tooltip,
    styled,
    FormControl,
} from "@mui/material";
// MUI Icons
import CameraIcon from "@mui/icons-material/Camera";
// Hooks
import { useToggle } from "hooks/useToggle";
// Components
import ImageSelectPanel from "./ImageSelectPanel";
import ImageInputContent from "./ImageInputContent";
// React
import { ChangeEvent, useId } from "react";
// Hook Form
import { Controller, FieldValues } from "react-hook-form";
// Utils
import { uploadImageFromFile } from "utils/uploadImageMethods";

const ImageButton = styled(ButtonBase, { shouldForwardProp: (prop) => prop !== "isActive" })<TImageButtonProps>(
    ({ theme, isActive, disabled }) => ({
        borderRadius: "0.5rem",
        width: "100%",
        height: "100%",
        transition: "all 0.2s ease",

        ...(isActive
            ? {
                  color: theme.palette.primary.main,
                  border: `2px dashed ${theme.palette.primary.main}`,
              }
            : {
                  color: theme.palette.grey[400],
                  border: `2px dashed ${theme.palette.grey[400]}`,
              }),

        "&:hover": !disabled &&
            theme.palette.mode === "light" && {
                color: theme.palette.common.black,
                border: `2px dashed ${theme.palette.common.black}`,
            },
    })
);

const ImageWrapper = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    width: "100%",
    marginTop: "0.5rem",
    zIndex: theme.zIndex.fab,
    maxHeight: "200px",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
        width: 0,
    },
}));

const ImageInputLabel = styled("label")({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
});

const Content = styled(FormControl)(({ theme, error }) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",

    "& > button": error && {
        color: `${theme.palette.error.main} !important`,
        border: `2px dashed ${theme.palette.error.main} !important`,
    },
}));

function ImageInput<T extends FieldValues>({ withSelection = false, name, control, images, ...props }: TImageInput<T>) {
    const imageInputID = useId();
    const { active, onSetToNegative, onToggle } = useToggle(false);

    const inputHelperText = withSelection ? "Click to see variants" : "Upload image";

    const onOpenSelection = () => {
        if (!withSelection || props.disabled) return;
        onToggle();
    };

    const onUploadFile = (event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const image = uploadImageFromFile(event);
        onChange(image);
        onSetToNegative();
    };

    return (
        <ClickAwayListener onClickAway={onSetToNegative}>
            <Box height="100%">
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        const isError = !!error?.message;
                        return (
                            <Content error={isError}>
                                <ImageButton
                                    centerRipple
                                    onClick={onOpenSelection}
                                    isActive={active}
                                    disabled={props.disabled}
                                >
                                    <ImageInputLabel htmlFor={withSelection ? "#" : imageInputID}>
                                        <ImageInputContent value={value} helperText={inputHelperText} />
                                    </ImageInputLabel>
                                </ImageButton>
                                <Fade in={active} timeout={300}>
                                    <ImageWrapper elevation={5}>
                                        {images && <ImageSelectPanel images={images} onChange={onChange} />}
                                        <Divider />
                                        <Box padding={1} display="flex" justifyContent="center">
                                            <IconButton color="primary">
                                                <ImageInputLabel htmlFor={imageInputID}>
                                                    <Tooltip title="Upload image" placement="right-end">
                                                        <CameraIcon />
                                                    </Tooltip>
                                                </ImageInputLabel>
                                            </IconButton>
                                        </Box>
                                    </ImageWrapper>
                                </Fade>
                                <input
                                    onChange={(e) => onUploadFile(e, onChange)}
                                    type="file"
                                    hidden
                                    id={imageInputID}
                                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                    {...props}
                                />
                            </Content>
                        );
                    }}
                />
            </Box>
        </ClickAwayListener>
    );
}

export default ImageInput;
