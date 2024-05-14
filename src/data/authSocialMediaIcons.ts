// Assets
import Google from "assets/images/Google.svg";
import Facebook from "assets/images/Facebook.svg";
import GitHub from "assets/images/GitHub.svg";

export const authSocialMediaIcons = {
    github: {
        label: "Github",
        icon: GitHub,
    },
    facebook: {
        label: "Facebook",
        icon: Facebook,
    },
    google: {
        label: "Google",
        icon: Google,
    },
}

export type TAuthProviders = keyof typeof authSocialMediaIcons;
