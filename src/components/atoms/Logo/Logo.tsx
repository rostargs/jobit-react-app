// MUI
import { ButtonBase, Typography, Stack } from "@mui/material";
// Router
import { Link } from "react-router-dom";
// Assets
import logo from "assets/images/logo.svg";

const Logo = () => {
    return (
        <ButtonBase centerRipple>
            <Link to="/" style={{ color: "unset" }}>
                <Stack direction="row" alignItems="center">
                    <img src={logo} alt="Company logo" />
                    <Typography component="h1" variant="h4" fontWeight="bold">
                        JobPort
                    </Typography>
                </Stack>
            </Link>
        </ButtonBase>
    );
};

export default Logo;
