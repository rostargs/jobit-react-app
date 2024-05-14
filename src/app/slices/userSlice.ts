// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// API
import { firebaseApi } from "app/api/firebaseApi";
// Firebase
import { doc, setDoc, updateDoc } from "firebase/firestore";
// Firebase Config
import { firestore, storage } from "../../firebaseConfig";
// Model
import { TEmployeeUser, TEmployerUser, TUsers, USER_TYPE } from "models/user.model";
import { TUploadDataCompanyBenefits } from "models/company.model";
import {
    TUploadDataResumeEducation,
    TUploadDataResumeExperience,
    TUploadDataResumeLanguage,
    TUploadDataResumeSkill,
} from "models/resume.model";
// Utils
import { getUserDataByID, uploadImageIntoStorage } from "utils/firebaseOperations";

type TUserSlice = {
    currentUser: TUsers | null;
    loading: boolean;
};

type TEmployeeStatValues = Pick<TEmployeeUser, "education" | "experience" | "languages" | "skill">;
type TEmployeeStatValueByKey<T extends keyof TEmployeeStatValues> = TEmployeeUser[T][number];
type TAssignDataTypeByKey = {
    [keyType in keyof TEmployeeStatValues]: { key: keyType } & {
        value: {
            [data in keyof TEmployeeStatValueByKey<keyType>]: TEmployeeStatValueByKey<keyType>[data];
        };
    };
}[keyof TEmployeeStatValues];

type TAddItemProps<T> = {
    userID: string;
    data: T;
};

type TMappedItemKey<T extends string> = {
    [Key in `${T}ID`]: string;
};

type TRemoveItemProps<T extends string> = {
    userID: string;
} & TMappedItemKey<T>;

type TRemoveStatItemParams = {
    userID: string;
    key: keyof TEmployeeStatValues;
    itemID: string;
};

const initialState: TUserSlice = {
    currentUser: null,
    loading: true,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<TUsers>) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addStaticlyExperienceItem: (state, action: PayloadAction<TUploadDataResumeExperience>) => {
            if (state.currentUser?.accountType === USER_TYPE.EMPLOYEE) state.currentUser.experience.push(action.payload);
        },
        addStaticlyEducationItem: (state, action: PayloadAction<TUploadDataResumeEducation>) => {
            if (state.currentUser?.accountType === USER_TYPE.EMPLOYEE) state.currentUser.education.push(action.payload);
        },
        addStaticlySkillItem: (state, action: PayloadAction<TUploadDataResumeSkill>) => {
            if (state.currentUser?.accountType === USER_TYPE.EMPLOYEE) state.currentUser.skill.push(action.payload);
        },
        addStaticlyLanguage: (state, action: PayloadAction<TUploadDataResumeLanguage>) => {
            if (state.currentUser?.accountType === USER_TYPE.EMPLOYEE) state.currentUser.languages.push(action.payload);
        },
        addStaticlyStatItem: (state, action: PayloadAction<TAssignDataTypeByKey>) => {
            const { key, value } = action.payload;
            if (state.currentUser?.accountType !== USER_TYPE.EMPLOYEE) return;
            state.currentUser[key].push(value as any);
        },
    },
});

export const extendedUserFirebaseApi = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        setUser: builder.mutation<null, TUsers>({
            queryFn: async (userData) => {
                try {
                    await setDoc(doc(firestore, "users", userData.uid), userData);
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        getUserByID: builder.query<TUsers, string>({
            queryFn: async (userID, { dispatch }) => {
                try {
                    const { userData } = await getUserDataByID<TUsers>(firestore, userID);
                    dispatch(userSlice.actions.setUserInfo(userData));
                    return { data: userData };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            providesTags: (result, error, arg) => [{ type: "User", id: arg }],
        }),
        addStatItem: builder.mutation<null, TAssignDataTypeByKey & { userID: string }>({
            queryFn: async ({ key, value, userID }) => {
                try {
                    const { userData, userRef } = await getUserDataByID<TEmployeeUser>(firestore, userID);

                    switch (key) {
                        case "experience":
                            if (typeof value.logo === "string") return { data: null };
                            const companyLogoURL = await uploadImageIntoStorage(storage, value.logo);
                            userData.experience.push({ ...value, logo: companyLogoURL });
                            await updateDoc(userRef, { experience: userData.experience });
                            break;
                        case "education":
                            if (typeof value.logo === "string") return { data: null };
                            const universityLogo = await uploadImageIntoStorage(storage, value.logo);
                            userData.education.push({ ...value, logo: universityLogo });
                            await updateDoc(userRef, { education: userData.education });
                            break;
                        case "languages":
                            userData.languages.push(value);
                            await updateDoc(userRef, { languages: userData.languages });
                            break;
                        case "skill":
                            userData.skill.push(value);
                            await updateDoc(userRef, { skill: userData.skill });
                            break;
                        default:
                            throw new Error("No statistics were found for this key.");
                    }

                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
        removeStatItem: builder.mutation<null, TRemoveStatItemParams>({
            queryFn: async ({ userID, key, itemID }) => {
                const { userData, userRef } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                try {
                    const updatedStatItem = userData[key].filter((item) => item.id !== itemID);
                    await updateDoc(userRef, { [key]: updatedStatItem });
                } catch (error: any) {
                    throw new Error(error.message);
                }
                return { data: null };
            },
        }),
        editStatItem: builder.mutation<null, TAssignDataTypeByKey & { userID: string }>({
            queryFn: async ({ userID, value, key }) => {
                const { userData, userRef } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                try {
                    switch (key) {
                        case "experience":
                            if (typeof value.logo === "string") return { data: null };
                            const companyLogoURL = await uploadImageIntoStorage(storage, value.logo);
                            const updatedExp = userData.experience.map((exp) =>
                                exp.id === value.id ? (exp = { ...value, logo: companyLogoURL }) : null
                            );
                            await updateDoc(userRef, { experience: updatedExp });
                            break;
                        case "education":
                            if (typeof value.logo === "string") return { data: null };
                            const universityLogoURL = await uploadImageIntoStorage(storage, value.logo);
                            const updateEdu = userData.education.map((edu) =>
                                edu.id === value.id ? (edu = { ...value, logo: universityLogoURL }) : null
                            );
                            await updateDoc(userRef, { education: updateEdu });
                            break;
                        case "skill":
                            const updatedSkillData = userData.skill.map((item) =>
                                item.id === value.id ? (item = { ...value }) : null
                            );
                            await updateDoc(userRef, { skill: updatedSkillData });
                            break;
                        case "languages":
                            const updatedLanguages = userData.languages.map((lang) =>
                                lang.id === value.id ? (lang = { ...value }) : null
                            );
                            await updateDoc(userRef, { languages: updatedLanguages });
                            break;
                        default:
                            throw new Error("No statistics were found for this key.");
                    }
                } catch (error: any) {
                    throw new Error(error.message);
                }
                return { data: null };
            },
        }),
        addExperienceItem: builder.mutation<null, TAddItemProps<TUploadDataResumeExperience>>({
            queryFn: async ({ data, userID }) => {
                try {
                    const { logo, ...rest } = data;
                    if (typeof logo === "string") return { data: null };
                    const {
                        userData: { experience },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const logoUrl = await uploadImageIntoStorage(storage, logo);
                    experience.push({ ...rest, logo: logoUrl });
                    await updateDoc(userRef, {
                        experience,
                    });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        removeEperienceItem: builder.mutation<null, TRemoveItemProps<"experience">>({
            queryFn: async ({ userID, experienceID }) => {
                try {
                    const {
                        userData: { experience },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const updatedExpList = experience.filter((exp) => exp.id !== experienceID);
                    await updateDoc(userRef, { experience: updatedExpList });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        addEducationItem: builder.mutation<null, TAddItemProps<TUploadDataResumeEducation>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const { logo, ...rest } = data;
                    if (typeof logo === "string") return { data: null };
                    const {
                        userData: { education },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const logoUrl = await uploadImageIntoStorage(storage, logo);
                    education.push({ ...rest, logo: logoUrl });
                    await updateDoc(userRef, { education });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        removeEducationItem: builder.mutation<null, TRemoveItemProps<"education">>({
            queryFn: async ({ userID, educationID }) => {
                try {
                    const {
                        userData: { education },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const updatedEduList = education.filter((edu) => edu.id !== educationID);
                    await updateDoc(userRef, { education: updatedEduList });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        addSkillitem: builder.mutation<null, TAddItemProps<TUploadDataResumeSkill>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const {
                        userData: { skill },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    skill.push(data);
                    await updateDoc(userRef, { skill });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        removeSkillItem: builder.mutation<null, TRemoveItemProps<"skill">>({
            queryFn: async ({ userID, skillID }) => {
                try {
                    const {
                        userData: { skill },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const updatedSkill = skill.filter((item) => item.id !== skillID);
                    await updateDoc(userRef, { skill: updatedSkill });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        addLanguage: builder.mutation<null, TAddItemProps<TUploadDataResumeLanguage>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const {
                        userData: { languages },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    languages.push(data);
                    await updateDoc(userRef, { languages });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        removeLanguage: builder.mutation<null, TRemoveItemProps<"language">>({
            queryFn: async ({ userID, languageID }) => {
                try {
                    const {
                        userData: { languages },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const updatedLanguages = languages.filter((language) => language.id !== languageID);
                    await updateDoc(userRef, { languages: updatedLanguages });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        editExperienceItem: builder.mutation<null, TAddItemProps<TUploadDataResumeExperience>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const { logo, ...rest } = data;
                    if (typeof logo === "string") return { data: null };
                    const {
                        userData: { experience },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const logoUrl = await uploadImageIntoStorage(storage, logo);
                    const updatedExp = experience.map((exp) => {
                        if (exp.id === data.id) exp = { ...rest, logo: logoUrl };
                        return exp;
                    });
                    await updateDoc(userRef, { experience: updatedExp });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        editEducationItem: builder.mutation<null, TAddItemProps<TUploadDataResumeEducation>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const { logo, ...rest } = data;
                    if (typeof logo === "string") return { data: null };
                    const {
                        userData: { education },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const logoUrl = await uploadImageIntoStorage(storage, logo);
                    const updatedEdu = education.map((edu) => {
                        if (edu.id === data.id) edu = { ...rest, logo: logoUrl };
                        return edu;
                    });
                    await updateDoc(userRef, { education: updatedEdu });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        editSkillItem: builder.mutation<null, TAddItemProps<TUploadDataResumeSkill>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const {
                        userData: { skill },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const updatedSkill = skill.map((item) => {
                        if (item.id === data.id) item = { ...data };
                        return item;
                    });
                    await updateDoc(userRef, { skill: updatedSkill });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        editLanguageItem: builder.mutation<null, TAddItemProps<TUploadDataResumeLanguage>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const {
                        userData: { languages },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                    const updatedLanguages = languages.map((lang) => {
                        if (lang.id === data.id) lang = { ...data };
                        return lang;
                    });
                    await updateDoc(userRef, { languages: updatedLanguages });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        addCompanyBenefit: builder.mutation<null, TAddItemProps<TUploadDataCompanyBenefits>>({
            queryFn: async ({ userID, data }) => {
                try {
                    const {
                        userData: { benefits },
                        userRef,
                    } = await getUserDataByID<TEmployerUser>(firestore, userID);
                    benefits.push(data);
                    await updateDoc(userRef, { benefits });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        removeCompanyBenefit: builder.mutation<null, TRemoveItemProps<"benefit">>({
            queryFn: async ({ userID, benefitID }) => {
                try {
                    const {
                        userData: { benefits },
                        userRef,
                    } = await getUserDataByID<TEmployerUser>(firestore, userID);
                    const updatedBenefits = benefits.filter((benefit) => benefit.id !== benefitID);
                    await updateDoc(userRef, { benefits: updatedBenefits });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUserByIDQuery,
    useSetUserMutation,
    useAddExperienceItemMutation,
    useRemoveEperienceItemMutation,
    useAddEducationItemMutation,
    useRemoveEducationItemMutation,
    useAddSkillitemMutation,
    useRemoveSkillItemMutation,
    useAddLanguageMutation,
    useRemoveLanguageMutation,
    useEditExperienceItemMutation,
    useEditEducationItemMutation,
    useEditSkillItemMutation,
    useEditLanguageItemMutation,
    useAddCompanyBenefitMutation,
    useRemoveCompanyBenefitMutation,
} = extendedUserFirebaseApi;

export const {
    setUserLoading,
    addStaticlyExperienceItem,
    setUserInfo,
    addStaticlyEducationItem,
    addStaticlySkillItem,
    addStaticlyLanguage,
} = userSlice.actions;

export default userSlice.reducer;
