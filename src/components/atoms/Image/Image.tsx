// React
import { CSSProperties } from "react";
// Model
import { TImage } from "./Image.model";
// MUI
import { Tooltip } from "@mui/material";

const baseImageStyles: CSSProperties = {
    objectFit: "cover",
    cursor: "pointer",
};

const Image = ({ ...rest }: TImage) => {
    return (
        <Tooltip title={rest.alt} placement="bottom">
            <img style={baseImageStyles} {...rest} />
        </Tooltip>
    );
};

export default Image;
