// MUI
import { Box, Button, Typography, styled } from "@mui/material";
// Model
import { TErrorNotification } from "./ErrorNotification.model";

const Wrapper = styled(Box)({
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    gap: "0.5rem",
});

const ErrorNotificationt = ({ errorMessage, image, buttonText, onHandleError, ...rest }: TErrorNotification) => {
    return (
        <Wrapper>
            <img src={image} alt="Error image" {...rest} />
            <Typography variant="body1">{errorMessage}</Typography>
            {buttonText && (
                <Button variant="contained" onClick={onHandleError}>
                    {buttonText}
                </Button>
            )}
        </Wrapper>
    );
};

export default ErrorNotificationt;
