// Models
import { TBenefitFormSchemaType } from "components/molecules/BenefitForm/BenefitForm";
import { TAddVacancyFormType } from "components/organisms/AddVacancyForm/AddVacancyForm";
import { TEmployeeRefWithData } from "./user.model";

export type TUploadDataCompanyBenefits = TBenefitFormSchemaType & { id: string };

export type TUploadDataCompanyVacancy = Omit<
    TAddVacancyFormType,
    "postDate" | "companyLogo" | "companyName" | "supervisor"
> & {
    id: string;
    postDate: string;
    userID: string;
    supervisor: string;
    candidates: {
        id: string;
        status: CandidateStatus | null;
    }[];
};

export enum CandidateStatus {
    APPLIED = "applied",
    REJECTED = "rejected",
}

export type TCandidateInfo = TEmployeeRefWithData & { status: CandidateStatus | null };

export type TReplyToVacancyParams = {
    vacancyID: string;
    candidateID: string;
    status: CandidateStatus | null;
};
