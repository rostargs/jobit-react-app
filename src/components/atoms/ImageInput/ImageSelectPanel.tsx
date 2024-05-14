// React
import { MouseEvent, memo } from "react";
// Utils
import { uploadImageFromSrc } from "utils/uploadImageMethods";
// Model
import { TImageSelectPanel } from "./ImageInput.model";
// MUI
import { Grid } from "@mui/material";
// Components
import Image from "../Image/Image";

const ImageSelectPanel = ({ images, onChange }: TImageSelectPanel) => {
    const onClickImage = async (event: MouseEvent<HTMLImageElement>, name: string) => {
        const image = await uploadImageFromSrc(event, name);
        onChange(image);
    };

    const renderStandartImages = images.map(({ image, name }, index) => (
        <Grid item xs={4} height={60} key={index} sx={{ cursor: "pointer" }}>
            <Image
                src={image}
                alt={name}
                width="100%"
                height="100%"
                style={{ objectFit: "contain" }}
                onClick={(e) => onClickImage(e, name)}
            />
        </Grid>
    ));

    return (
        <Grid container spacing={1} padding={1} justifyContent="center">
            {renderStandartImages}
        </Grid>
    );
};

export default memo(ImageSelectPanel);
