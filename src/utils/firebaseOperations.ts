// Firebase
import { Firestore, doc, getDoc } from "firebase/firestore";
import { FirebaseStorage, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { TUsers } from "models/user.model";

export const uploadImageIntoStorage = async (storage: FirebaseStorage, image: File) => {
    const storageRef = ref(storage, `logos/${image.name}`);
    const uploadFile = uploadBytesResumable(storageRef, image);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(uploadFile.snapshot.ref);
};

export const getUserDataByID = async <T extends TUsers>(firestore: Firestore, userID: string) => {
    const userRef = doc(firestore, "users", userID);
    const userData = (await getDoc(userRef)).data() as T;
    return { userData, userRef };
};
