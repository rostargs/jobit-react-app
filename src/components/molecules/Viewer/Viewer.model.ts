// Models
import { TReplyToVacancyParams } from "models/company.model";
import { TEmployeeUser, TEmployerUser } from "models/user.model";

export type TViewer = {
    [V in keyof TViewerVariants]: {
        variant: V;
    } & TViewerTypeProps &
        TViewerVariants[V];
}[keyof TViewerVariants];

type TEmployeeViewer = Pick<Pick<TEmployeeUser, "data">["data"], "avatar" | "position" | "name">;
type TEmployerViewer = Pick<Pick<TEmployerUser, "data">["data"], "ownerName" | "logo" | "domen">;

type TBaseViewerProps = {
    outlined?: boolean;
    buttonText?: string;
    uid: string;
    companyName?: string;
};

type TViewerTypeProps =
    | (TEmployeeViewer & TDisableViewer<TEmployerViewer> & TBaseViewerProps)
    | (TEmployerViewer & TDisableViewer<TEmployeeViewer> & TBaseViewerProps);

export type TViewerVariants = {
    short: {};
    full: {};
    vacancy: TReplyToVacancyParams
};

type TDisableViewer<T extends TEmployeeViewer | TEmployerViewer> = Partial<Record<keyof T, never>>;

export type TViewerVariantProps = Pick<TViewer, "buttonText">;

export type TViewerCardProps = {
    isOutlined: boolean;
};
