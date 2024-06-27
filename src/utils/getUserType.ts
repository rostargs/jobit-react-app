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
                savedVacancies: [],
                notifications: [],
            };
        case USER_TYPE.EMPLOYER:
            return { ...formData, uid, chats: [], benefits: [], notifications: [] };
        default:
            throw new Error("Invalid user type!");
    }
};
