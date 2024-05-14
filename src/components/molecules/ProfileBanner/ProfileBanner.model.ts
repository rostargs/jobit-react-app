// React
import { ReactNode } from "react";

export type TProfileBanner =
    | (TProfileBannerBaseProps & { subtitle: string; subtitleContent?: never })
    | (TProfileBannerBaseProps & { subtitle?: never; subtitleContent: ReactNode });

type TProfileBannerBaseProps = {
    title: string;
    avatar?: string;
    bannerImage?: string;
    controls?: ReactNode
};
