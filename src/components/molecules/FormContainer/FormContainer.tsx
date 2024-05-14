// MUI
import { Box, Grow, Paper, Stack, Typography, styled } from "@mui/material";
// Router
import { Link, useNavigate } from "react-router-dom";
// Utils
import { paths } from "utils/paths";
// Model
import { TFormContainer } from "./FormContainer.model";
// Components
import Image from "components/atoms/Image/Image";
// Hooks
import { useAuthFirebase } from "hooks/useAuthFirebase";
// Firebase Config
import { auth } from "../../../firebaseConfig";
// Data
import { TAuthProviders, authSocialMediaIcons } from "data/authSocialMediaIcons";

const FormBase = styled(Paper)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "2.5rem 4.5rem",
    zIndex: theme.zIndex.appBar - 1,
    width: 530,
    [theme.breakpoints.down("lg")]: {
        width: 700,
    },
    [theme.breakpoints.down("md")]: {
        width: "100%",
        paddingInline: "2.5rem",
    },
    [theme.breakpoints.down("sm")]: {
        padding: "1.5rem",
    },
}));

const FormTitle = styled(Typography<"h4">)(({ theme }) => ({
    ...theme.typography.h4,
    fontWeight: theme.typography.fontWeightBold,
}));

const IconsContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    paddingTop: "1rem",
});

const formVariants = {
    login: {
        title: "Login",
        paragraph: "New Job Seeker?",
        link: {
            text: "Signup",
            to: paths.SIGNUP,
        },
    },
    employeeSignup: {
        title: "Employee Signup",
        paragraph: "Already have account?",
        link: {
            text: "Login",
            to: paths.LOGIN,
        },
    },
    employerSignup: {
        title: "Employer Signup",
        paragraph: "Already have account?",
        link: {
            text: "Login",
            to: paths.LOGIN,
        },
    },
};

const FormContainer = ({ children, variant, userType }: TFormContainer) => {
    const navigate = useNavigate();
    const { loginWithSocialMedia } = useAuthFirebase(auth);

    const { title, paragraph, link } = formVariants[variant];

    const onLoginWithSocialMedia = async (provider: TAuthProviders) => {
        const user = await loginWithSocialMedia(provider);
        navigate("/");
    };

    const renderIcons = Object.keys(authSocialMediaIcons).map((key, index) => {
        const iconKey = key as TAuthProviders;
        const { icon, label } = authSocialMediaIcons[iconKey];
        return (
            <Image
                src={icon}
                alt={label}
                key={index}
                width={26}
                height={26}
                onClick={() => onLoginWithSocialMedia(iconKey)}
            />
        );
    });

    return (
        <Grow timeout={1000} in>
            <FormBase elevation={4}>
                <FormTitle component="h4">{title}</FormTitle>
                <IconsContainer>{renderIcons}</IconsContainer>
                <Typography component="span" variant="body1" paddingTop={2}>
                    or
                </Typography>
                <Box width="100%" paddingTop={1}>
                    {children}
                </Box>
                <Stack direction="row" paddingTop={3.5}>
                    <Typography component="p" variant="body1" paddingRight={2}>
                        {paragraph}
                    </Typography>
                    <Link to={link.to}>
                        <Typography component="span" variant="body1" fontWeight="bold">
                            {link.text}
                        </Typography>
                    </Link>
                </Stack>
            </FormBase>
        </Grow>
    );
};

export default FormContainer;
