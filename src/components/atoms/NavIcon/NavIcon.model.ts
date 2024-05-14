export type TNavIcon = {
    to?: string;
    root?: boolean;
    startAdornment?: JSX.Element;
    label: string;
    children?: Omit<TNavIcon, "children" | "root">[];
    onClickIcon?: () => void;
    manualActive?: boolean;
};

export type TListButtonProps = {
    isActive: boolean;
    isHasChildren: boolean;
};
