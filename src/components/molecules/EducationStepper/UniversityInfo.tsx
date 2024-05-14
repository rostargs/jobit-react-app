// MUI
import { Box, Grid } from "@mui/material";
// Componenets
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import FormInput from "components/atoms/FormInput/FormInput";
import ImageInput from "components/atoms/ImageInput/ImageInput";
import { gradeLevels } from "data/gradeLevels";
import { useFormContext } from "react-hook-form";
// Zod
import z from "zod";

export const universityInfoSchema = z.object({
    universityTitle: z.string().min(6).max(48).trim(),
    gradeLevel: z.string(),
    logo: z.instanceof(File),
    faculty: z.string().min(3).max(36),
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
