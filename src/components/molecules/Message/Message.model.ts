export type TMessage = {
    variant: TMessageVariants;
};

export type TMessageVariants = "outgoing" | "incoming";
