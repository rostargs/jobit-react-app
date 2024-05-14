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
import { Box, Grid, SpeedDial, SpeedDialAction } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// MUI Icons
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PublishIcon from "@mui/icons-material/Publish";
// Assets
import test from "assets/images/maleUser.svg";
// Data
import { positions } from "data/hierarchy";
// React
import { useCallback, useEffect } from "react";
// Utils
import { getImageFile } from "utils/uploadImageMethods";

const addVacancyFormSchema = z.object({
    companyName: z.string(),
    postDate: z.date(),
    description: z.string(),
    companyLogo: z.instanceof(File),
    position: z
        .string()
        .refine((str) => positions.some((position) => position.position === str), { message: "Choose correct option." }),
    details: z.array(
        z.object({
            label: z.string(),
            content: z.array(z.object({ text: z.string() })),
        })
    ),
});

type TAddVacancyFormType = z.infer<typeof addVacancyFormSchema>;

const AddVacancyForm = () => {
    const methods = useForm<TAddVacancyFormType>({
        resolver: zodResolver(addVacancyFormSchema),
        defaultValues: {
            companyName: "BOMJ",
            postDate: new Date(),
            details: [
                {
                    label: "Responsibilities 📩:",
                    content: [{ text: "Writing code!" }],
                },
            ],
        },
    });
    const { control, reset, handleSubmit } = methods;
    const arrayMethods = useFieldArray({ control, name: "details" });

    const convertImageIntoFile = useCallback(async () => {
        const file = await getImageFile(test, "CompanyName");
        reset({ companyLogo: file });
    }, []);

    const onSubmitVacancyForm: SubmitHandler<TAddVacancyFormType> = (data) => {
        console.log(data);
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
                    <Grid item xs={12}>
                        <AutocompleteInput
                            control={control}
                            label="choose position"
                            name="position"
                            options={positions}
                            optionLabel="position"
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
                            placeholder="Write some information about vacancy"
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
