// React
import { ReactNode } from "react";

export type TModalContainer = {
    title: string;
    isOpened: boolean;
    children?: ReactNode;
    onClose: () => void;
};
