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

export type TEmployerDataFields = keyof Omit<Pick<TEmployerUser, "data">["data"], "logo">;

const editCompanyInfoSchema = z.object<Record<TEmployerDataFields, ZodTypeAny>>({
    email: z.string().optional(),
    location: z
        .string()
        .refine((str) => countries.some((country) => country.country === str), { message: "Choose correct option." }),
    phoneNumber: z.string().refine((number) => isValidPhoneNumber(number), { message: "Wtire correct phone number." }),
    ownerName: z.string(),
    domen: z.string().refine((str) => domens.some((domen) => domen.domain === str), { message: "Choose correct option." }),
    companyName: z.string(),
});

type TEditCompanyInfoSchemaType = z.infer<typeof editCompanyInfoSchema>;

const EditCompanyInfo = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<TEditCompanyInfoSchemaType>();

    return (
        <>
            <Grid item xs={6}>
                <FormInput
                    register={register}
                    label="company title"
                    name="companyName"
                    errorText={errors.companyName?.message?.toString()}
                    type="text"
                    helperText="Write the company title."
                />
            </Grid>
            <Grid item xs={6}>
                <FormInput
                    register={register}
                    label="owner name"
                    name="ownerName"
                    errorText={errors.ownerName?.message?.toString()}
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
            <Grid item xs={6}>
                <AutocompleteInput
                    control={control}
                    name="domen"
                    label="domen"
                    optionLabel="domain"
                    options={domens}
                    helperText="Please input correct domen."
                />
            </Grid>
            <Grid item xs={6}></Grid>
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
