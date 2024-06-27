// Firebase
import { Firestore, updateDoc } from "firebase/firestore";
// Utils
import { getUserDataByID } from "./firebaseOperations";
// Models
import { TUsers } from "models/user.model";
import { TNotificationTypes } from "components/atoms/Notification/Notification.model";

export const sendNotification = async (
    firestore: Firestore,
    userID: string,
    notification: TNotificationTypes
): Promise<void> => {
    const {
        userData: { notifications },
        userRef,
    } = await getUserDataByID<TUsers>(firestore, userID);
    notifications.push(notification);
    await updateDoc(userRef, notification);
};

export const deleteNotification = async (firestore: Firestore, userID: string, notificationID: string): Promise<void> => {
    const {
        userData: { notifications },
        userRef,
    } = await getUserDataByID<TUsers>(firestore, userID);
    const updatedNotifications = notifications.filter((notification) => notification.id !== notificationID);
    await updateDoc(userRef, { notification: updatedNotifications });
};
