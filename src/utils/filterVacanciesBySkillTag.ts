// Models
import { TUploadDataCompanyVacancy } from "models/company.model";
// Utils
import { removeWhiteSpace } from "./removeWhiteSpace";

export const filterVacanciesBySkillTag = (vacancies: TUploadDataCompanyVacancy[], tag: string): string[] => {
    return vacancies
        .filter((vacancy) => {
            const currentVacancyTags = vacancy.skills.map((skill) => removeWhiteSpace(skill.toLocaleLowerCase(), 0));

            return (
                currentVacancyTags.includes(removeWhiteSpace(tag.toLocaleLowerCase(), 0)) ||
                currentVacancyTags.some((item) => item.includes(removeWhiteSpace(tag.toLocaleLowerCase(), 0)))
            );
        })
        .map(({ id }) => id);
};
