// React
import { ReactNode } from "react";
// Models
import {
    TUploadDataResumeEducation,
    TUploadDataResumeExperience,
    TUploadDataResumeLanguage,
    TUploadDataResumeSkill,
} from "models/resume.model";
import { TEmployeeUser } from "models/user.model";

export type TDetailItem = {
    label: string;
    value: string;
    image: string;
};

export type TContent = {
    children?: ReactNode;
    title: string;
    lastChild?: boolean;
};

export type TPDFEmployeeResume = {
    userData: TEmployeeUser;
};

export type TExperienceList = {
    experience: TUploadDataResumeExperience[];
};

export type TEducationList = {
    education: TUploadDataResumeEducation[];
};

export type TSkillList = {
    skills: TUploadDataResumeSkill[];
};

export type TResumeUserInfo = {
    languages: TUploadDataResumeLanguage[];
} & Pick<TEmployeeUser, 'data'>;

export type TLanguagesList = Pick<TResumeUserInfo, "languages">;

export type TExperienceItem = TUploadDataResumeExperience;
export type TEducationItem = TUploadDataResumeEducation;
export type TSkillItem = TUploadDataResumeSkill;
export type TLanguageItem = {
    language: string;
    level: string;
    image?: string;
};
