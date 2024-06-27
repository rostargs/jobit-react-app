// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// Firebase Config
import { firestore } from "../firebaseConfig";
// Models
import { TUploadDataCompanyVacancy } from "models/company.model";

export const getVacancyPage = async (vacancyID: string, limitPerPage: number): Promise<number | null> => {
    const vacancies: TUploadDataCompanyVacancy[] = [];

    const vacanciesQuery = query(collection(firestore, "vacancies"));
    (await getDocs(vacanciesQuery)).forEach((doc) => vacancies.push(doc.data() as TUploadDataCompanyVacancy));

    const vacancyIndex = vacancies.findIndex((vacancy) => vacancy.id === vacancyID);

    if (vacancyIndex === -1) return null;

    return Math.ceil(vacancyIndex / limitPerPage);
};
