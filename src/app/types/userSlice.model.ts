// Models
import { TUploadDataCompanyVacancy } from "models/company.model";
import { TEmployeeUser, TEmployerMainInfo, TUsers, TUsersRefWithData } from "models/user.model";
import { TPositionKeys } from "data/hierarchy";

export type TUserSlice = {
    currentUser: TUsers | null;
    loading: boolean;
};

// Employee
export type TEmployeeStatValues = Pick<TEmployeeUser, "education" | "experience" | "languages" | "skill">;

export type TEmployeeStatKeys = keyof TEmployeeStatValues;

export type TEmployeeStatValueByKey<T extends TEmployeeStatKeys> = TEmployeeUser[T][number];

export type TAssignDataTypeByKey = {
    [keyType in keyof TEmployeeStatValues]: { key: keyType } & {
        value: {
            [data in keyof TEmployeeStatValueByKey<keyType>]: TEmployeeStatValueByKey<keyType>[data];
        };
    };
}[keyof TEmployeeStatValues];

export type TAddUpdateStatOperation = {
    userID: string;
} & TAssignDataTypeByKey;

export type TRemoveStatOperation = {
    userID: string;
    key: TEmployeeStatKeys;
    itemID: string;
};

// Employer
export type TAddCompanyItemProps<T> = {
    userID: string;
    data: T;
};

type TMappedItemKey<T extends string> = {
    [Key in `${T}ID`]: string;
};

export type TRemoveCompanyItemProps<T extends string> = {
    userID: string;
} & TMappedItemKey<T>;

export type TGetCompanyVacancies = {
    userID: string;
    vacanciesLimit?: number;
};

export type TRequiredCompanyInfo = Pick<TEmployerMainInfo, "companyName" | "location" | "logo">;

export type TPublicVacancies = TRequiredCompanyInfo & Pick<TUploadDataCompanyVacancy, "position" | "userID" | "id">;

export type TVacancyInfo = {
    companyInfo: TRequiredCompanyInfo;
    vacancyInfo: TUploadDataCompanyVacancy;
    supervisor: TUsersRefWithData;
};

export type TGetCompanyEmployees = {
    userID: string;
} & Partial<TPositionKeys>;
