// React
import { ReactNode } from "react";
// zod
import { ZodTypeAny } from "zod";

export type TStepperContainer<T extends Record<string, any>> = TBaseStepperContainerProps &
    (
        | {
              onSubmit: (data: T) => void;
              defaultValues?: never;
              onSaveChanges?: never;
          }
        | { onSubmit?: never; defaultValues: (T & { id: string }) | null; onSaveChanges: (data: T) => void }
    );

type TBaseStepperContainerProps = {
    steps: TStep[];
    isOpened: boolean;
    onClose: () => void;
};

export type TStep = {
    label: string;
    validationRules?: ZodTypeAny;
    component: ReactNode;
};
