// Assets
import loginHero from "assets/images/loginHero.png";
import signupHero from "assets/images/signupHero.png";
import leftPattern from "assets/images/Pattern-1.svg";
import rightPattern from "assets/images/Pattern-2.svg";
// MUI
import { Box, Stack, styled } from "@mui/material";
// Model
import { TAuthHeroContainer, TVariants } from "./AuthHeroContainer.model";

// Hero container variants
const heroVariants = {
    login: {
        pattern: leftPattern,
        heroImage: loginHero,
        styles: {
            left: 0,
        },
    },
    signup: {
        pattern: rightPattern,
        heroImage: signupHero,
        styles: {
            right: 0,
        },
    },
};

const SectionContainer = styled(Stack<"section">)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    height: "100%",
    [theme.breakpoints.down("lg")]: {
        justifyContent: "center",
    },
}));

const ImageBox = styled(Box)<{ variant: TVariants }>(({ theme, variant }) => ({
    backgroundImage: `url(${heroVariants[variant].pattern})`,
    backgroundPositionX: variant === "signup" ? "right" : "left",
    backgroundPositionY: "bottom",
    backgroundSize: 600,
    backgroundRepeat: "no-repeat",
    width: "100%",
    position: "relative",
    minHeight: 600,
    [theme.breakpoints.down("lg")]: {
        display: "none",
    },
    "& > img": {
        position: "absolute",
        bottom: 0,
        maxHeight: "100%",
    },
}));

const ChildrenWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginBottom: 100,
    },
}));

const AuthHeroContainer = ({ variant, children }: TAuthHeroContainer) => {
    const { heroImage, styles } = heroVariants[variant];
    const containerDirection = variant === "signup" ? "row-reverse" : "row";
    return (
        <SectionContainer direction={containerDirection} component="section">
            <ImageBox variant={variant}>
                <img src={heroImage} alt="Login hero" style={styles} />
            </ImageBox>
            <ChildrenWrapper component="article">{children}</ChildrenWrapper>
        </SectionContainer>
    );
};

export default AuthHeroContainer;
