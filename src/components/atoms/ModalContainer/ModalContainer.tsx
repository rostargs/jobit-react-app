// MUI
import { Box, Fade, IconButton, Modal, Paper, Typography, styled } from "@mui/material";
// Model
import { TModalContainer } from "./ModalContainer.model";
// MUI Icons
import CloseIcon from "@mui/icons-material/Close";

const Wrapper = styled(Paper<"article">)(({ theme }) => ({
    padding: "1rem",
    maxWidth: theme.breakpoints.values.md,
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}));

const ModalContainer = ({ title, isOpened, children, onClose }: TModalContainer) => {
    return (
        <Modal open={isOpened} onClose={onClose} aria-labelledby={title} disableEnforceFocus>
            <Fade in={isOpened} timeout={500}>
                <Wrapper component="article">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" component="h5" textTransform="uppercase">
                            {title}
                        </Typography>
                        <IconButton aria-label="Close" onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box marginTop={2}>{children}</Box>
                </Wrapper>
            </Fade>
        </Modal>
    );
};

export default ModalContainer;
