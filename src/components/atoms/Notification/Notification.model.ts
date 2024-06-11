export type TNotification = {
    [V in TNotificationVariantsKeys]: {
        variant: V;
    } & TBaseNotificationProps &
        TNotificationVariants[V];
}[TNotificationVariantsKeys];

type TNotificationVariants = {
    view: {};
    vacancy: {};
    rejected: {};
    applied: {};
    message: {};
};

export type TNotificationVariantsKeys = keyof TNotificationVariants;

type TBaseNotificationProps = {
    isRead: boolean;
    onRead: (id: string) => void;
    onDelete: (id: string) => void;
    avatar: string | null;
};
