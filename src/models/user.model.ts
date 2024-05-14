import { TUploadDataCompanyBenefits } from "./company.model";
import { TRoomReference } from "./messanger.model";
import {
    TUploadDataResumeEducation,
    TUploadDataResumeExperience,
    TUploadDataResumeLanguage,
    TUploadDataResumeSkill,
} from "./resume.model";

export enum USER_TYPE {
    EMPLOYEE = "EMPLOYEE",
    EMPLOYER = "EMPLOYER",
}

// EMPLOYER ACCOUNT TYPES
export type TEmployerUser = {
    uid: string;
    chats: TRoomReference[];
    benefits: TUploadDataCompanyBenefits[];
} & TAuthEmployerVariant;

export type TAuthEmployerVariant = {
    accountType: USER_TYPE.EMPLOYER;
    data: {
        email: string | null;
        companyName: string | null;
        ownerName: string | null;
        location: string | null;
        logo: string | null;
        phoneNumber: string | null;
        domen: string | null;
    };
};

// EMPLOYEE ACCOUNT TYPES
export type TEmployeeUser = {
    uid: string;
    experience: TUploadDataResumeExperience[];
    education: TUploadDataResumeEducation[];
    skill: TUploadDataResumeSkill[];
    languages: TUploadDataResumeLanguage[];
    chats: TRoomReference[];
} & TAuthEmployeeVariant;

export type TAuthEmployeeVariant = {
    accountType: USER_TYPE.EMPLOYEE;
    data: {
        email: string | null;
        phoneNumber: string | null;
        gender: string | null;
        location: string | null;
        position: string | null;
        name: string | null;
        avatar: string | null;
    };
};

export type TUserVariants = TAuthEmployeeVariant | TAuthEmployerVariant;
export type TUsers = TEmployeeUser | TEmployerUser;
