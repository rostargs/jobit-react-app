// MUI
import { AvatarProps } from "@mui/material";

export type TUserAvatar =
    | (TBaseUserAvatarProps & { isEditable: boolean; withGreeting?: never; withActiveDot?: never })
    | (TBaseUserAvatarProps & { isEditable?: never; withGreeting: boolean; withActiveDot: boolean })
    | (TBaseUserAvatarProps & { isEditable?: never; withGreeting?: never; withActiveDot?: never });

type TBaseUserAvatarProps = {
    userName: string;
    avatar?: string;
    to?: string;
    onClickAvatar?: () => void;
} & AvatarProps;

export type TEditableUserAvatar = {
    isEditable?: boolean;
};
