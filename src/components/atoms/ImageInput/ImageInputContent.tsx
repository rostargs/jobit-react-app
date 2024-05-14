// React
import { memo } from "react";
// Hook Form
import { FieldValues } from "react-hook-form";
// Model
import { TImageInputContent } from "./ImageInput.model";
// MUI
import { Typography } from "@mui/material";
// MUI Icons
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// Components
import Image from "../Image/Image";

function ImageInputContent<T extends FieldValues>({ value, helperText }: TImageInputContent<T>) {
    return (
        <>
            {value ? (
                <Image
                    src={URL.createObjectURL(value)}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "0.5rem", maxHeight: 138, objectFit: "contain" }}
                />
            ) : (
                <>
                    <AddPhotoAlternateIcon fontSize="large" />
                    <Typography variant="subtitle2" component="span" textTransform="capitalize">
                        {helperText}
                    </Typography>
                </>
            )}
        </>
    );
}

export default memo(ImageInputContent);
