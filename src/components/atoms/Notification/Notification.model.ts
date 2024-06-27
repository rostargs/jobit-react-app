export type TNotification = {
    [V in TNotificationVariantsKeys]: {
        variant: V;
    } & TBaseNotificationProps &
        TNotificationVariants[V];
}[TNotificationVariantsKeys];

export type TViewNotificationVariant = {
    viewerName: string;
    userID: string;
};

export type TVacancyNotificationVariant = {
    vacancyID: string;
    candidateID: string;
};

export type TRejectedNotificationVariant = {
    vacancyID: string;
    date: string;
};

export type TAppliedNotificationVariant = {
    vacancyID: string;
    date: string;
};

export type TMessageNotificationVariant = {
    senderName: string;
    uid: string;
    roomID: string;
    message: string;
};

type TNotificationVariants = {
    view: TViewNotificationVariant;
    vacancy: TVacancyNotificationVariant;
    rejected: TRejectedNotificationVariant;
    applied: TAppliedNotificationVariant;
    message: TMessageNotificationVariant;
};

export type TNotificationTypes = {
    [V in TNotificationVariantsKeys]: {
        variant: V;
    } & TNotificationVariants[V] &
        TBaseNotificationProps;
}[TNotificationVariantsKeys];

export type TNotificationVariantsKeys = keyof TNotificationVariants;

type TBaseNotificationProps = {
    isRead: boolean;
    avatar: string | null;
    id: string;
};
