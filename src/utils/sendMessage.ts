// Firebase
import { Firestore, updateDoc } from "firebase/firestore";
// Utils
import { getUserDataByID } from "./firebaseOperations";
// Models
import { TUsers } from "models/user.model";

export const sendMessage = async (firestore: Firestore, userID: string, message: any) => {
    const { userData, userRef } = await getUserDataByID<TUsers>(firestore, userID);
    await updateDoc(userRef, {});
};
