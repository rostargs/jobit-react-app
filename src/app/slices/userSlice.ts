// Redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// API
import { firebaseApi } from "app/api/firebaseApi";
// Firebase
import {
    QueryConstraint,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
// Firebase Config
import { firestore, storage } from "../../firebaseConfig";
// Model
import {
    TEmployeeRefWithData,
    TEmployeeUser,
    TEmployerUser,
    TUsers,
    TUsersRefWithData,
    USER_TYPE,
} from "models/user.model";
import { TCandidateInfo, TUploadDataCompanyBenefits, TUploadDataCompanyVacancy } from "models/company.model";
import {
    TAddCompanyItemProps,
    TAddUpdateStatOperation,
    TAssignDataTypeByKey,
    TGetCompanyEmployees,
    TGetCompanyVacancies,
    TPublicVacancies,
    TRemoveCompanyItemProps,
    TRemoveStatOperation,
    TRequiredCompanyInfo,
    TUserSlice,
    TVacancyInfo,
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
        addCompanyVacancy: builder.mutation<null, TUploadDataCompanyVacancy>({
            queryFn: async (data) => {
                try {
                    await setDoc(doc(firestore, "vacancies", data.id), data);
                } catch (error: any) {
                    throw new Error(error.message);
                }
                return { data: null };
            },
            invalidatesTags: ["Vacancy"],
        }),
        getCompanyVacancies: builder.query<TPublicVacancies[], TGetCompanyVacancies>({
            queryFn: async ({ userID, vacanciesLimit }) => {
                try {
                    const {
                        userData: { data },
                    } = await getUserDataByID<TEmployerUser>(firestore, userID);

                    const companyVacancies: TPublicVacancies[] = [];

                    const vacanciesQuery = query(collection(firestore, "vacancies"), where("userID", "==", userID));

                    (await getDocs(vacanciesLimit ? query(vacanciesQuery, limit(vacanciesLimit)) : vacanciesQuery)).forEach(
                        (doc) => {
                            const { position, id } = doc.data() as TUploadDataCompanyVacancy;
                            const { location, companyName, logo } = data;
                            companyVacancies.push({ location, logo, companyName, position, userID, id });
                        }
                    );

                    return { data: companyVacancies };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            providesTags: ["Vacancy"],
        }),
        getVacancies: builder.query<TPublicVacancies[], void>({
            //@ts-ignore
            queryFn: async () => {
                try {
                    const companiesData = new Map<string, TRequiredCompanyInfo>();
                    const vacancies: TUploadDataCompanyVacancy[] = [];
                    const vacanciesQuery = query(collection(firestore, "vacancies"));

                    (await getDocs(vacanciesQuery)).forEach((doc) => {
                        vacancies.push(doc.data() as TUploadDataCompanyVacancy);
                    });

                    const vacanciesData = Promise.all(
                        vacancies.map(async (vacancy) => {
                            const { userID, position, id } = vacancy;

                            if (!companiesData.has(userID)) {
                                const { userData } = await getUserDataByID<TEmployerUser>(firestore, userID);
                                const { companyName, logo, location } = userData.data;
                                companiesData.set(userID, { companyName, location, logo });
                            }

                            return { ...companiesData.get(userID)!, userID, position, id } as TPublicVacancies;
                        })
                    );
                    return { data: vacanciesData };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
        getVacancyInfo: builder.query<TVacancyInfo, { vacancyID: string }>({
            queryFn: async ({ vacancyID }) => {
                try {
                    const vacancyRef = doc(firestore, "vacancies", vacancyID);
                    const vacancyData = (await getDoc(vacancyRef)).data() as TUploadDataCompanyVacancy;
                    const { userData: company } = await getUserDataByID<TEmployerUser>(firestore, vacancyData.userID);
                    const { companyName, location, logo } = company.data;
                    let supervisor: TUsersRefWithData = { uid: company.uid, ...company.data };

                    if (!(company.uid === vacancyData.supervisor)) {
                        const { userData: employee } = await getUserDataByID<TEmployeeUser>(
                            firestore,
                            vacancyData.supervisor
                        );

                        supervisor = { uid: employee.uid, ...employee.data };
                    }

                    return {
                        data: {
                            companyInfo: { companyName, location, logo },
                            vacancyInfo: vacancyData,
                            supervisor,
                        },
                    };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
        }),
        getCompanyEmployees: builder.query<TEmployeeRefWithData[], TGetCompanyEmployees>({
            queryFn: async ({ userID, position }) => {
                try {
                    const filters: QueryConstraint[] = [...(position ? [where("data.position", "==", position)] : [])];
                    const vacanciesQuery = query(
                        collection(firestore, "users"),
                        where("data.currentJob", "==", userID),
                        ...filters
                    );
                    const employees: TEmployeeRefWithData[] = [];

                    (await getDocs(vacanciesQuery)).forEach((doc) => {
                        const currentUser = doc.data() as TEmployeeUser;
                        employees.push({ ...currentUser.data, uid: currentUser.uid });
                    });

                    return { data: employees };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            providesTags: (result, error, arg) =>
                result ? result.map(({ uid }) => ({ type: "Vacancy", id: uid })) : ["Vacancy"],
        }),
        saveVacancy: builder.mutation<null, { vacancyID: string; userID: string }>({
            queryFn: async ({ vacancyID, userID }) => {
                try {
                    const {
                        userData: { savedVacancies },
                        userRef,
                    } = await getUserDataByID<TEmployeeUser>(firestore, userID);

                    if (!savedVacancies.includes(vacancyID)) {
                        savedVacancies.push(vacancyID);
                        await updateDoc(userRef, { savedVacancies });
                    }

                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
            invalidatesTags: ["User"],
        }),
        applyForVacancy: builder.mutation<null, { userID: string; vacancyID: string }>({
            queryFn: async ({ userID, vacancyID }) => {
                try {
                    const vacancyRef = doc(firestore, "vacancies", vacancyID);
                    const { candidates } = (await getDoc(vacancyRef)).data() as TUploadDataCompanyVacancy;

                    if (!candidates.some((item) => item.id === userID)) {
                        candidates.push({ id: userID, status: null });
                    }

                    await updateDoc(vacancyRef, { candidates });
                    return { data: null };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
        getSavedJobs: builder.query<TPublicVacancies[], Pick<TEmployeeUser, "savedVacancies">["savedVacancies"]>({
            queryFn: async (references) => {
                try {
                    const companiesData = new Map<string, TRequiredCompanyInfo>();

                    const promises = Promise.allSettled(
                        references.map(async (item) => {
                            const ref = doc(firestore, "vacancies", item);
                            return (await getDoc(ref)).data() as TUploadDataCompanyVacancy;
                        })
                    );

                    const savedVacancies: TUploadDataCompanyVacancy[] = (await promises)
                        .filter(
                            (promise): promise is PromiseFulfilledResult<TUploadDataCompanyVacancy> =>
                                promise.status === "fulfilled"
                        )
                        .map((promise) => promise.value);

                    const shortVacancyData = await Promise.all(
                        savedVacancies.map(async (vacancy) => {
                            const { userID, position, id } = vacancy;

                            if (!companiesData.has(userID)) {
                                const { userData } = await getUserDataByID<TEmployerUser>(firestore, userID);
                                const { companyName, logo, location } = userData.data;
                                companiesData.set(userID, { companyName, location, logo });
                            }

                            return { ...companiesData.get(userID)!, userID, position, id } as TPublicVacancies;
                        })
                    );

                    return { data: shortVacancyData };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
        getVacancyCandidatesInfo: builder.query<
            TCandidateInfo[],
            Pick<TUploadDataCompanyVacancy, "candidates">["candidates"]
        >({
            queryFn: async (candidates) => {
                try {
                    const promises = candidates.map(async (candidate) => {
                        const {
                            userData: { uid, data },
                        } = await getUserDataByID<TEmployeeUser>(firestore, candidate.id);
                        return { uid, ...data, status: candidate.status } satisfies TCandidateInfo;
                    });

                    const candidatesData = (await Promise.allSettled(promises))
                        .filter(
                            (promise): promise is PromiseFulfilledResult<TCandidateInfo> => promise.status === "fulfilled"
                        )
                        .map((promise) => promise.value);

                    return { data: candidatesData };
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
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
    useAddCompanyVacancyMutation,
    useGetCompanyVacanciesQuery,
    useGetVacanciesQuery,
    useGetVacancyInfoQuery,
    useGetCompanyEmployeesQuery,
    useSaveVacancyMutation,
    useApplyForVacancyMutation,
    useGetSavedJobsQuery,
    useGetVacancyCandidatesInfoQuery,
} = extendedUserFirebaseApi;

export const { setUserLoading, addStaticlyStatItem } = userSlice.actions;

export default userSlice.reducer;
