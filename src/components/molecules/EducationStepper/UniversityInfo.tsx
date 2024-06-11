// MUI
import { Box, Grid } from "@mui/material";
// Componenets
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import FormInput from "components/atoms/FormInput/FormInput";
import ImageInput from "components/atoms/ImageInput/ImageInput";
// Data
import { gradeLevels } from "data/gradeLevels";
// Hook Form
import { useFormContext } from "react-hook-form";
// Zod
import z from "zod";
// Utils
import { formContentLength, formRequiredMessages } from "utils/formSettings";

export const universityInfoSchema = z.object({
    universityTitle: z
        .string()
        .min(formContentLength.min_university_length)
        .max(formContentLength.max_university_length)
        .trim(),
    gradeLevel: z
        .string({ required_error: formRequiredMessages.select_option })
        .refine((str) => gradeLevels.some((level) => level.grade === str), { message: formRequiredMessages.select_option }),
    logo: z.instanceof(File),
    faculty: z.string().min(formContentLength.min_faculty_length).max(formContentLength.max_faculty_length),
});

export type TUniversityInfoFormType = z.infer<typeof universityInfoSchema>;

const UniversityInfo = () => {
    const { control } = useFormContext<TUniversityInfoFormType>();
    return (
        <Grid container spacing={3.5}>
            <Grid item xs={8}>
                <Grid container spacing={3.5}>
                    <Grid item xs={12}>
                        <FormInput
                            name="universityTitle"
                            label="university title"
                            control={control}
                            type="text"
                            helperText="Please write university full name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteInput
                            name="gradeLevel"
                            control={control}
                            label="grade level"
                            optionLabel="grade"
                            options={gradeLevels}
                            renderOption={(props, { image, grade }) => (
                                <Box component="li" {...props} display="flex" gap={1}>
                                    <img src={image} alt={grade} loading="lazy" width={20} />
                                    {grade}
                                </Box>
                            )}
                            helperText="Select the appropriate grade level"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs>
                <ImageInput name="logo" control={control} />
            </Grid>
            <Grid item xs={12}>
                <FormInput
                    name="faculty"
                    control={control}
                    label="faculty name"
                    type="text"
                    helperText="Please write faculty full name"
                />
            </Grid>
        </Grid>
    );
};

export default UniversityInfo;
