import { ReactNode } from "react";

export type TVariants = "login" | "signup";

export type TAuthHeroContainer = {
    children?: ReactNode;
    variant: TVariants;
};
