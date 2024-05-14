import ModalContainer from "components/atoms/ModalContainer/ModalContainer";
import { TGreeting } from "./Greeting.model";
import { Box, Typography } from "@mui/material";
import NavButton from "components/atoms/NavButton/NavButton";

const Greeting = ({ isOpened, onClose, accountType }: TGreeting) => {
    const greetingVariants = {
        EMPLOYEE:
            "Thank you for choosing JobPort for your career partner. We recommend that you fill out your CV and start your job search. Good luck!",
        EMPLOYER:
            "Thank you for choosing JobPort for your career partner. Please fill in all the necessary information about your company and create offers. Good luck!",
    };
    return (
        <ModalContainer title="Welcome to JobPort!" isOpened={isOpened} onClose={onClose}>
            <Box>
                <Typography variant="subtitle1" component="p">
                    {greetingVariants[accountType]}
                </Typography>
                <Box marginTop={2} width='fit-content'>
                    <NavButton path="/profile/public" text="Go to profile page" variant='contained' onClick={onClose}/>
                </Box>
            </Box>
        </ModalContainer>
    );
};

export default Greeting;
