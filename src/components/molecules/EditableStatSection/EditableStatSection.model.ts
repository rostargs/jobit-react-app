// React
import { ReactNode } from "react";

export type TEditableStatSection =
    | (TBaseEditableStatSectionProps & {
          actionButtonText: string;
          onEdit?: () => void;
          isActionButtonHidden?: boolean;
          controls?: never;
      })
    | (TBaseEditableStatSectionProps & {
          actionButtonText?: never;
          onEdit?: () => never;
          isActionButtonHidden?: never;
          controls: ReactNode;
      });

type TBaseEditableStatSectionProps = {
    sectionAdornment: string;
    title: string;
    subtitle: string;
    children?: ReactNode;
    overflow?: "clip" | "visible";
};
