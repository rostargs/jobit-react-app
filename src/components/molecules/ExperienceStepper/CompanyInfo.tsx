// MUI
import { Box, Grid } from "@mui/material";
// Zod
import z from "zod";
// Hook Form
import { useFormContext } from "react-hook-form";
// Components
import FormInput from "components/atoms/FormInput/FormInput";
import ImageInput from "components/atoms/ImageInput/ImageInput";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
// Data
import { countries } from "data/countries";

export const companyInfoSchema = z.object({
    companyName: z.string().trim().min(3).max(18),
    country: z
        .string({ invalid_type_error: "Choose correct option." })
        .refine((str) => countries.some((country) => country.country === str)),
    logo: z.instanceof(File),
});

export type TCompanyInfoFormType = z.infer<typeof companyInfoSchema>;

const CompanyInfo = () => {
    const { control } = useFormContext<TCompanyInfoFormType>();

    return (
        <Grid container spacing={3.5}>
            <Grid item md={8}>
                <Grid container spacing={3.5}>
                    <Grid item xs={12}>
                        <FormInput
                            label="company name"
                            name="companyName"
                            control={control}
                            type="text"
                            helperText="Write al least 3 symbols, but not more than 18."
                            placeholder="EPAM"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteInput
                            name="country"
                            label="select country"
                            options={countries}
                            optionLabel="country"
                            control={control}
                            helperText="Select one of possible options."
                            renderOption={(props, option) => (
                                <Box component="li" {...props} display="flex" gap={1}>
                                    <img loading="lazy" src={option.flag} width={20} alt={option.code} />
                                    {option.country}
                                </Box>
                            )}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md>
                <ImageInput control={control} name="logo" />
            </Grid>
        </Grid>
    );
};

export default CompanyInfo;
