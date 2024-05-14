// React
import { HTMLProps } from "react";
// Hook Form
import { FieldValues, Path, Control, PathValue } from "react-hook-form";

export type TImageInput<T extends FieldValues> = {
    name: keyof T & Path<T>;
    control: Control<T>;
} & (TImageInputWithSelectionProps<boolean> | Partial<TImageInputWithSelectionProps<never>>) &
    HTMLProps<HTMLInputElement>;

type TImageInputWithSelectionProps<T> = {
    withSelection: T;
    images: T extends never ? never : TSelectableImage[];
};

export type TImageButtonProps = {
    isActive: boolean;
};

export type TImageInputContent<T extends FieldValues> = {
    value: PathValue<T, keyof T & Path<T>>;
    helperText?: string;
};

type TSelectableImage = {
    image: string;
    name: string;
};

export type TImageSelectPanel = {
    images: TSelectableImage[];
    onChange: (...event: any[]) => void;
};

export const MAX_FILE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
