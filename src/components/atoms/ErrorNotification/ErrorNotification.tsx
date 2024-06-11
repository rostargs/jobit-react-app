// MUI
import { Box, Button, Typography, styled } from "@mui/material";
// Model
import { TErrorNotification } from "./ErrorNotification.model";

const Wrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: "0.5rem",
    height: "100%",
});

const ErrorNotification = ({ errorMessage, image, buttonText, onHandleError, ...rest }: TErrorNotification) => {
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

export default ErrorNotification;
