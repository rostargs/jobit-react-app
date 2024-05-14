// React
import { ChangeEvent, MouseEvent } from "react";
// Utils
import { checkFileFormat } from "./checkFileFormat";
// Model
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "components/atoms/ImageInput/ImageInput.model";
// Firebase
import { FirebaseStorage, getBlob, ref } from "firebase/storage";

export const uploadImageFromFile = (event: ChangeEvent<HTMLInputElement>): File | undefined => {
    const fileToUpload = event.target.files;

    if (!!!fileToUpload?.length) return;

    const isAcceptable = checkFileFormat(fileToUpload[0], ACCEPTED_IMAGE_TYPES);

    if (fileToUpload[0].size < MAX_FILE_SIZE || isAcceptable) return fileToUpload[0];
};

export const getImageFile = async (src: string, name: string): Promise<File> => {
    const image = await fetch(src);
    const imageBlob = await image.blob();
    const imageFile = new File([imageBlob], name, { type: imageBlob.type });
    return imageFile;
};

export const uploadImageFromSrc = async (event: MouseEvent<HTMLImageElement>, name: string): Promise<File | undefined> => {
    const imageFile = await getImageFile(event.currentTarget.src, name);
    const isAcceptable = checkFileFormat(imageFile, ACCEPTED_IMAGE_TYPES);
    if (imageFile.size < MAX_FILE_SIZE || isAcceptable) return imageFile;
};

export const getImageFileByUrlFromStorage = async (storage: FirebaseStorage, url: string): Promise<File> => {
    const imageRef = ref(storage, url);
    const imageBlob = await getBlob(imageRef);
    return new File([imageBlob], imageRef.name, { type: imageBlob.type });
};
