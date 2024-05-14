import { TSkillFormSchemaType } from "./SkillForm";

export type TSkillForm = {
    isOpened: boolean;
    onClose: () => void;
    defaultValues?: (TSkillFormSchemaType & { id: string }) | null;
};
