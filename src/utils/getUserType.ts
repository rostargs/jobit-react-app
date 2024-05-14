// Firebase
import { User } from "firebase/auth";
// Model
import { TUserVariants, TUsers, USER_TYPE } from "models/user.model";

export const getUserType = (authData: User, formData: TUserVariants): TUsers => {
    const { uid } = authData;
    const { accountType } = formData;

    switch (accountType) {
        case USER_TYPE.EMPLOYEE:
            return {
                uid,
                ...formData,
                experience: [],
                education: [],
                languages: [],
                skill: [],
                chats: [],
            };
            break;
        case USER_TYPE.EMPLOYER:
            return { ...formData, uid, accountType: accountType, chats: [], benefits: [] };
            break;
        default:
            throw new Error("Invalid user type!");
    }
};