// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Hook Form
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// Components
import FormInput from "components/atoms/FormInput/FormInput";
import DatePicker from "components/atoms/DatePicker/DatePicker";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import ImageInput from "components/atoms/ImageInput/ImageInput";
import EditableDetailSection from "components/molecules/EditableDetailSection/EditableDetailSection";
// MUI
import { Box, Grid, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// MUI Icons
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PublishIcon from "@mui/icons-material/Publish";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// Assets
import test from "assets/images/maleUser.svg";
// Data
import { hierarchyLevels, positions } from "data/hierarchy";
import { technologies } from "data/technologies";
import { countries } from "data/countries";
// React
import { useCallback, useEffect } from "react";
// Utils
import { getImageFile } from "utils/uploadImageMethods";
import { formContentLength, formRequiredMessages } from "utils/formSettings";
// Redux
import { useAddCompanyVacancyMutation, useGetCompanyEmployeesQuery } from "app/slices/userSlice";
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { nanoid } from "@reduxjs/toolkit";
// Models
import { TEmployeeMainInfo, TEmployerUser } from "models/user.model";
import { TUploadDataCompanyVacancy } from "models/company.model";
// Router
import { useNavigate } from "react-router-dom";

const addVacancyFormSchema = (employees: TEmployeeMainInfo[]) =>
    z.object({
        companyName: z.string(),
        postDate: z.date(),
        description: z
            .string({ required_error: formRequiredMessages.empty_string })
            .min(formContentLength.min_description_length)
            .max(formContentLength.max_description_length),
        companyLogo: z.instanceof(File),
        position: z
            .string({ required_error: formRequiredMessages.select_option })
            .refine((str) => positions.some((position) => position.position === str), {
                message: formRequiredMessages.select_option,
            }),
        details: z.array(
            z.object({
                label: z.string().min(formContentLength.min_label_length).max(formContentLength.max_label_length),
                content: z.array(
                    z.object({
                        text: z
                            .string()
                            .min(formContentLength.min_list_item_length)
                            .max(formContentLength.max_list_item_length),
                    })
                ),
            })
        ),
        level: z
            .string({ required_error: formRequiredMessages.select_option })
            .refine((str) => hierarchyLevels.some((level) => level.level === str), {
                message: formRequiredMessages.select_option,
            }),
        salary: z.number({ required_error: formRequiredMessages.invalid_number }).min(0).max(100_000),
        skills: z.array(z.string()),
        location: z.string({ required_error: formRequiredMessages.select_option }),
        supervisor: z
            .string()
            .refine((str) => employees.some((employee) => employee.name === str), {
                message: formRequiredMessages.select_option,
            })
            .optional(),
    });

export type TAddVacancyFormType = z.infer<ReturnType<typeof addVacancyFormSchema>>;

const AddVacancyForm = () => {
    const { uid } = useAppSelector((state: RootState) => state.user.currentUser as TEmployerUser);
    const { data: employees = [], isFetching } = useGetCompanyEmployeesQuery({
        userID: uid,
        position: "Recruiting",
    });
    const [addCompanyVacancy] = useAddCompanyVacancyMutation();
    const navigate = useNavigate();
    const methods = useForm<TAddVacancyFormType>({
        resolver: zodResolver(addVacancyFormSchema(employees)),
        defaultValues: {
            companyName: "BOMJ",
            postDate: new Date(),
            details: [
                {
                    label: "Responsibilities 📩:",
                    content: [{ text: "Writing code every day and drink a lot of coffee 😂!" }],
                },
            ],
            location: "Ukraine",
        },
    });
    const { control, reset, handleSubmit } = methods;
    const arrayMethods = useFieldArray({ control, name: "details" });

    const convertImageIntoFile = useCallback(async () => {
        const file = await getImageFile(test, "CompanyName");
        reset({ companyLogo: file });
    }, []);

    const onSubmitVacancyForm: SubmitHandler<TAddVacancyFormType> = async (data) => {
        const { companyLogo, companyName, supervisor, ...rest } = data;

        const formatedData: TUploadDataCompanyVacancy = {
            ...rest,
            postDate: String(data.postDate),
            userID: uid,
            id: nanoid(),
            supervisor: supervisor ? employees.find((employee) => employee.name === supervisor)!.uid : uid,
            candidates: [],
        };

        await addCompanyVacancy(formatedData);
        reset();
        navigate(`/jobs/all/${formatedData.id}`);
    };

    useEffect(() => {
        convertImageIntoFile();
    }, []);

    const controls = [
        {
            tooltipTitle: "Add section",
            icon: <NoteAddIcon />,
            onClick: () =>
                arrayMethods.append({ label: "Editable section ❤️:", content: [{ text: "Editable section item 📩" }] }),
        },
        { tooltipTitle: "Submit form", icon: <PublishIcon />, onClick: handleSubmit(onSubmitVacancyForm) },
    ];

    const renderVacancyFormControls = controls.map((control) => (
        <SpeedDialAction key={control.tooltipTitle} {...control} />
    ));

    return (
        <form>
            <FormProvider {...methods}>
                <Grid container spacing={3.5}>
                    <Grid item xs={12}>
                        <Grid container spacing={3.5}>
                            <Grid item xs={8}>
                                <Grid container spacing={3.5}>
                                    <Grid item xs={12}>
                                        <FormInput control={control} name="companyName" label="company name" disabled />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker control={control} name="postDate" label="post date" disabled />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <ImageInput control={control} name="companyLogo" disabled />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <AutocompleteInput
                            control={control}
                            label="choose position"
                            name="position"
                            options={positions}
                            optionLabel="position"
                            helperText="Choose a vacancy position."
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <AutocompleteInput
                            control={control}
                            label="choose technologies"
                            name="skills"
                            options={technologies}
                            optionLabel="name"
                            helperText="Choose required technologies."
                            multiple
                            renderOption={(params, { name, logo }) => (
                                <Box component="li" {...params} display="flex" gap={1}>
                                    <img src={logo} alt={name} width={20} />
                                    {name}
                                </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <AutocompleteInput
                            control={control}
                            name="level"
                            label="choose level"
                            options={hierarchyLevels}
                            optionLabel="level"
                            helperText="Choose a knowledge level."
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormInput
                            control={control}
                            name="salary"
                            label="salary"
                            helperText="Write a salary for this vacancy."
                            type="number"
                            inputMode="numeric"
                            startAdornment={<AttachMoneyIcon />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <AutocompleteInput
                            control={control}
                            name="location"
                            label="location"
                            options={countries}
                            optionLabel="country"
                            helperText="Choose location."
                            renderOption={(props, option) => (
                                <Box component="li" {...props} display="flex" gap={1}>
                                    <img loading="lazy" src={option.flag} width={20} alt={option.code} />
                                    {option.country}
                                </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteInput
                            control={control}
                            name="supervisor"
                            options={employees}
                            optionLabel="name"
                            label="vacancy supervisor"
                            helperText="Please, choose a vacancy supersisor (HR) - OPTIONAL."
                            loading={isFetching}
                            renderOption={(props, { name, avatar, position }) => (
                                <Box component="li" {...props} display="flex" gap={3}>
                                    <img loading="lazy" src={avatar} width={40} alt={name} />
                                    <Typography variant="subtitle1" fontWeight="medium">
                                        {name} - {position}
                                    </Typography>
                                </Box>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormInput
                            control={control}
                            name="description"
                            label="description"
                            multiline
                            minRows={3}
                            type="text"
                            helperText="Write some information about vacancy"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* @ts-ignore */}
                        <EditableDetailSection {...arrayMethods} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <SpeedDial icon={<SpeedDialIcon />} ariaLabel="Add vacancy control panel" direction="left">
                                {renderVacancyFormControls}
                            </SpeedDial>
                        </Box>
                    </Grid>
                </Grid>
            </FormProvider>
        </form>
    );
};

export default AddVacancyForm;
