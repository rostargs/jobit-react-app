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
    TAddCompanyItemProps,
    TAddUpdateStatOperation,
    TAssignDataTypeByKey,
    TRemoveCompanyItemProps,
    TRemoveStatOperation,
    TUserSlice,
} from "app/types/userSlice.model";
// Utils
import { getUserDataByID, uploadImageIntoStorage } from "utils/firebaseOperations";

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
        addStatItem: builder.mutation<null, TAddUpdateStatOperation>({
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
            invalidatesTags: ["User"],
        }),
        removeStatItem: builder.mutation<null, TRemoveStatOperation>({
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
            invalidatesTags: ["User"],
        }),
        editStatItem: builder.mutation<null, TAddUpdateStatOperation>({
            queryFn: async ({ userID, value, key }) => {
                const {
                    userData: { education, experience, skill, languages },
                    userRef,
                } = await getUserDataByID<TEmployeeUser>(firestore, userID);
                try {
                    switch (key) {
                        case "experience":
                            if (typeof value.logo === "string") return { data: null };
                            const companyLogoURL = await uploadImageIntoStorage(storage, value.logo);
                            const updatedExp = experience.map((exp) =>
                                exp.id === value.id ? (exp = { ...value, logo: companyLogoURL }) : null
                            );
                            await updateDoc(userRef, { experience: updatedExp });
                            break;
                        case "education":
                            if (typeof value.logo === "string") return { data: null };
                            const universityLogoURL = await uploadImageIntoStorage(storage, value.logo);
                            const updateEdu = education.map((edu) =>
                                edu.id === value.id ? (edu = { ...value, logo: universityLogoURL }) : null
                            );
                            await updateDoc(userRef, { education: updateEdu });
                            break;
                        case "skill":
                            const updatedSkillData = skill.map((item) =>
                                item.id === value.id ? (item = { ...value }) : null
                            );
                            await updateDoc(userRef, { skill: updatedSkillData });
                            break;
                        case "languages":
                            const updatedLanguages = languages.map((lang) =>
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
            invalidatesTags: ["User"],
        }),
        addCompanyBenefit: builder.mutation<null, TAddCompanyItemProps<TUploadDataCompanyBenefits>>({
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
        removeCompanyBenefit: builder.mutation<null, TRemoveCompanyItemProps<"benefit">>({
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
    useAddCompanyBenefitMutation,
    useRemoveCompanyBenefitMutation,
    useAddStatItemMutation,
    useRemoveStatItemMutation,
    useEditStatItemMutation,
} = extendedUserFirebaseApi;

export const { setUserLoading, addStaticlyStatItem } = userSlice.actions;

export default userSlice.reducer;
