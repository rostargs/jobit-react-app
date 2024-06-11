// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import PhoneInput from "components/atoms/PhoneInput/PhoneInput";
import EditableUserInfo from "components/atoms/EditableUserInfo/EditableUserInfo";
import FormInput from "components/atoms/FormInput/FormInput";
// Assets
import building from "assets/images/publicProfile/building.svg";
// Hook Form
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
// Hooks
import { useToggle } from "hooks/useToggle";
// MUI
import { Box, Button, CardActions, Grid } from "@mui/material";
// Zod
import z, { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Models
import { TEmployerUser } from "models/user.model";
// Data
import { countries } from "data/countries";
import { editableEmployerInfoFields } from "data/editableUserInfoFields";
import { domens } from "data/domens";
// Phone Validation
import { isValidPhoneNumber } from "libphonenumber-js";
// React
import { useEffect } from "react";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// Utils
import { formRequiredMessages } from "utils/formSettings";

export type TEmployerDataFields = keyof Omit<Pick<TEmployerUser, "data">["data"], "logo">;

const editCompanyInfoSchema = z.object<Record<TEmployerDataFields, ZodTypeAny>>({
    email: z.string().optional(),
    location: z
        .array(
            z.string().refine((str) => countries.some((country) => country.country === str), {
                message: formRequiredMessages.select_option,
            }),
            {
                required_error: formRequiredMessages.select_option,
                invalid_type_error: formRequiredMessages.empty_multi_option,
            }
        )
        .min(1, { message: formRequiredMessages.empty_multi_option }),
    phoneNumber: z
        .string({ invalid_type_error: formRequiredMessages.invalid_phone })
        .refine((number) => isValidPhoneNumber(number), { message: formRequiredMessages.invalid_phone }),
    ownerName: z.string({ invalid_type_error: formRequiredMessages.empty_string }),
    domen: z
        .array(
            z.string().refine((str) => domens.some((domen) => domen.domain === str), {
                message: formRequiredMessages.select_option,
            }),
            {
                required_error: formRequiredMessages.select_option,
                invalid_type_error: formRequiredMessages.empty_multi_option,
            }
        )
        .min(1, { message: formRequiredMessages.empty_multi_option }),
    companyName: z.string({ invalid_type_error: formRequiredMessages.empty_string }),
});

type TEditCompanyInfoSchemaType = z.infer<typeof editCompanyInfoSchema>;

const EditCompanyInfo = () => {
    const { control } = useFormContext<TEditCompanyInfoSchemaType>();

    return (
        <>
            <Grid item xs={6}>
                <FormInput
                    control={control}
                    label="company title"
                    name="companyName"
                    type="text"
                    helperText="Write the company title."
                />
            </Grid>
            <Grid item xs={6}>
                <FormInput
                    control={control}
                    label="owner name"
                    name="ownerName"
                    type="text"
                    helperText="Write full name of company's owner."
                />
            </Grid>
            <Grid item xs={6}>
                <AutocompleteInput
                    control={control}
                    name="location"
                    label="location"
                    optionLabel="country"
                    options={countries}
                    helperText="Please input your current location in the designated field."
                    multiple
                    renderOption={(props, option) => (
                        <Box component="li" {...props} display="flex" gap={1}>
                            <img loading="lazy" src={option.flag} width={20} alt={option.code} />
                            {option.country}
                        </Box>
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <AutocompleteInput
                    control={control}
                    name="domen"
                    label="domen"
                    optionLabel="domain"
                    options={domens}
                    helperText="Please input correct domen."
                    multiple
                />
            </Grid>
            <Grid item xs={6}>
                <PhoneInput
                    control={control}
                    name="phoneNumber"
                    label="phone number"
                    helperText="Please input your phone number in the designated field."
                />
            </Grid>
        </>
    );
};

const CompanyInfo = () => {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);
    const methods = useForm<TEditCompanyInfoSchemaType>({ resolver: zodResolver(editCompanyInfoSchema), mode: "onChange" });
    const { data } = useAppSelector((state: RootState) => state.user.currentUser as TEmployerUser);

    const onClose = () => {
        methods.reset();
        onSetToNegative();
    };

    const onSubmitForm: SubmitHandler<TEditCompanyInfoSchemaType> = (data) => {
        console.log(data);
    };

    const renderEditableEmployerFields = editableEmployerInfoFields.map((item) => (
        <Grid item xs={6} key={item.name}>
            <EditableUserInfo {...item} control={methods.control} />
        </Grid>
    ));

    useEffect(() => {
        methods.reset(data);
    }, [data]);

    return (
        <EditableStatSection
            title="Company information"
            actionButtonText="Edit"
            sectionAdornment={building}
            subtitle="Update company inforamtion"
            onEdit={onSetToPositive}
            overflow="visible"
            isActionButtonHidden={active}
        >
            <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmitForm)}>
                <FormProvider {...methods}>
                    <Grid container spacing={active ? 4 : 1}>
                        {active ? <EditCompanyInfo /> : renderEditableEmployerFields}
                    </Grid>
                </FormProvider>
                {active && (
                    <CardActions sx={{ paddingTop: 5 }}>
                        <Box display="flex" marginLeft="auto" gap={1}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit">
                                Apply
                            </Button>
                        </Box>
                    </CardActions>
                )}
            </form>
        </EditableStatSection>
    );
};

export default CompanyInfo;
