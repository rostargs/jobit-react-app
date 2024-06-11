// Models
import { TRequiredCompanyInfo } from "app/types/userSlice.model";

export type TJobCard = {
    [variant in keyof TVariantProps]: {
        variant: variant;
    } & TVariantProps[variant] &
        TRequiredCompanyInfo &
        TJobCardBaseProps;
}[keyof TVariantProps];

type TJobCardBaseProps = {
    outlined?: boolean;
    position: string;
    userID: string;
    id: string;
};

type TVariantProps = {
    applied: {
        enterDate: string;
    };
    view: {};
    default: {};
    saved: {}
};

export type TStyledCardProps = {
    isOutlined: boolean;
};

export type TDefaultVariant = {
    vacancyID: string;
};
