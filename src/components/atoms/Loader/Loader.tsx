// MUI
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <Backdrop open>
            <CircularProgress color="info" size="3rem" disableShrink />
        </Backdrop>
    );
};

export default Loader;
