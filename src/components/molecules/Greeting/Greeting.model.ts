// Model
import { USER_TYPE } from "models/user.model";

export type TGreeting = {
    isOpened: boolean;
    onClose: () => void;
    accountType: USER_TYPE;
};
