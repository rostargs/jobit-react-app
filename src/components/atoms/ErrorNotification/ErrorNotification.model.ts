import { HTMLProps } from "react";

export type TErrorNotification =
    | (TErrorNotificationBaseProps & {
          buttonText: string;
          onHandleError: () => void;
      })
    | (TErrorNotificationBaseProps & { buttonText?: never; onHandleError?: never });

type TErrorNotificationBaseProps = { image: string; errorMessage: string } & HTMLProps<HTMLImageElement>;
