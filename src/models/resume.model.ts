// Models
import { TStudyPeriodFormType } from "components/molecules/EducationStepper/StudyPeriod";
import { TUniversityInfoFormType } from "components/molecules/EducationStepper/UniversityInfo";
import { TCompanyInfoFormType } from "components/molecules/ExperienceStepper/CompanyInfo";
import { TPositionFormType } from "components/molecules/ExperienceStepper/Position";
import { TWorkPeriodFormType } from "components/molecules/ExperienceStepper/WorkPeriod";
import { TLanguageFormSchemaType } from "components/molecules/LanguageForm/LanguageForm";
import { TSkillFormSchemaType } from "components/molecules/SkillForm/SkillForm";

// User Experince Types
export type TFormDataResumeExperience = TCompanyInfoFormType & TWorkPeriodFormType & TPositionFormType;
export type TUploadDataResumeExperience = TOmitResumeBaseCard<TFormDataResumeExperience>;

// User Education Types
export type TFormDataResumeEducation = TUniversityInfoFormType & TStudyPeriodFormType;
export type TUploadDataResumeEducation = TOmitResumeBaseCard<TFormDataResumeEducation>;

// User Skill Types
export type TUploadDataResumeSkill = TOmitResumeSmallCard<TSkillFormSchemaType>;

// User Language types
export type TUploadDataResumeLanguage = TOmitResumeSmallCard<TLanguageFormSchemaType>;

// Necessary props in upload type for experiece & education
type TNecessaryPropsResumeMainInfo = {
    id: string;
    enterYear: string;
    leaveYear: string;
    logo: string | File;
};

// Omit unnecessary fields from type for experience & education
type TOmitResumeBaseCard<T extends TFormDataResumeEducation | TFormDataResumeExperience> = Omit<
    T,
    "enterYear" | "leaveYear" | "logo"
> &
    TNecessaryPropsResumeMainInfo;

// Omit unnecessary fields from type for skills & languages
type TOmitResumeSmallCard<T extends TSkillFormSchemaType | TLanguageFormSchemaType> = Omit<T, "rating"> & {
    id: string;
    rating: string;
};
