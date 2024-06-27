// Models
import { TVacancyInfo } from "app/types/userSlice.model";
import { TUploadDataCompanyVacancy } from "models/company.model";

export type TVacancyHeader = TVacancyInfo;

export type TCandidatesList = {
    candidates: Pick<TUploadDataCompanyVacancy, "candidates">["candidates"];
    vacancyID: string;
};

export type TVacancyControls = {
    vacancyInfo: TUploadDataCompanyVacancy;
    vacancyID: string;
}
