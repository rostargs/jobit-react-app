import { TLanguageFormSchemaType } from "./LanguageForm";

export type TLanguageFrom = {
    isOpened: boolean;
    onClose: () => void;
    defaultValues?: (TLanguageFormSchemaType & { id: string }) | null;
};
