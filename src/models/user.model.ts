// Models
import { TPositionValues } from "data/hierarchy";
import { TUploadDataCompanyBenefits } from "./company.model";
import { TRoomReference } from "./messanger.model";
import {
    TUploadDataResumeEducation,
    TUploadDataResumeExperience,
    TUploadDataResumeLanguage,
    TUploadDataResumeSkill,
} from "./resume.model";
import { TCountriesNames } from "data/countries";
import { TDomensValues } from "data/domens";
import { TGendersValues } from "data/genders";

// User Variants
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
    data: TEmployerMainInfo;
};

export type TEmployerMainInfo = {
    email: string | null;
    companyName: string | null;
    ownerName: string | null;
    location: TCountriesNames | null;
    logo: string | null;
    phoneNumber: string | null;
    domen: TDomensValues | null;
};

export type TEmployerRefWithData = TEmployerMainInfo & Pick<TEmployerUser, "uid">;

// EMPLOYEE ACCOUNT TYPES
export type TEmployeeUser = {
    uid: string;
    experience: TUploadDataResumeExperience[];
    education: TUploadDataResumeEducation[];
    skill: TUploadDataResumeSkill[];
    languages: TUploadDataResumeLanguage[];
    chats: TRoomReference[];
    savedVacancies: string[];
} & TAuthEmployeeVariant;

export type TAuthEmployeeVariant = {
    accountType: USER_TYPE.EMPLOYEE;
    data: TEmployeeMainInfo;
};

export type TEmployeeMainInfo = {
    email: string | null;
    phoneNumber: string | null;
    gender: TGendersValues | null;
    location: TCountriesNames | null;
    position: TPositionValues | null;
    name: string | null;
    avatar: string | null;
    currentJob: string | null;
};

export type TEmployeeRefWithData = TEmployeeMainInfo & Pick<TEmployeeUser, "uid">;

// Unions
export type TUserVariants = TAuthEmployeeVariant | TAuthEmployerVariant;
export type TUsers = TEmployeeUser | TEmployerUser;
export type TUsersRefWithData = TEmployeeRefWithData | TEmployerRefWithData;
