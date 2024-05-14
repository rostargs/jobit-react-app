export type TNavItem = {
    to?: string;
    text: string;
    depthLevel?: number;
    children?: TNavItem[];
};
