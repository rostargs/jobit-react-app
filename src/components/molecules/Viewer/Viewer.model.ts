export type TViewer = {
    outlined?: boolean;
    variant?: "short" | "full";
    buttonText?: string;
};

export type TViewerVariantProps = Pick<TViewer, "buttonText">;

export type TViewerCardProps = {
    isOutlined: boolean;
};
