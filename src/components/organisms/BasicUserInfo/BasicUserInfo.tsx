// Components
import EditableStatSection from "components/molecules/EditableStatSection/EditableStatSection";
import EditableUserInfo from "components/atoms/EditableUserInfo/EditableUserInfo";
import PhoneInput from "components/atoms/PhoneInput/PhoneInput";
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
import FormInput from "components/atoms/FormInput/FormInput";
// Assets
import user from "assets/images/publicProfile/user.svg";
// MUI
import { Box, Button, CardActions, Grid } from "@mui/material";
// Hooks
import { useToggle } from "hooks/useToggle";
// Data
import { editableEmployeeInfoFields } from "data/editableUserInfoFields";
import { countries } from "data/countries";
import { positions } from "data/hierarchy";
import { genders } from "data/genders";
// Zod
import z, { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Hook Form
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form";
// Phone number validation
import { isValidPhoneNumber } from "libphonenumber-js";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// React
import { useEffect } from "react";
// Model
import { TEmployeeUser } from "models/user.model";
// Utils
import { formContentLength, formRequiredMessages } from "utils/formSettings";

export type TEmployeeDataKeys = keyof Omit<Pick<TEmployeeUser, "data">["data"], "avatar" | "currentJob">;

const editUserInfoSchema = z.object<Record<TEmployeeDataKeys, ZodTypeAny>>({
    email: z.string(),
    name: z.string().min(formContentLength.min_name_length).max(formContentLength.max_name_length),
    gender: z
        .string({ required_error: formRequiredMessages.select_option })
        .refine((str) => genders.some((gender) => gender.gender === str), { message: formRequiredMessages.select_option }),
    location: z
        .string({ required_error: formRequiredMessages.select_option })
        .refine((str) => countries.some((country) => country.country === str), {
            message: formRequiredMessages.select_option,
        }),
    position: z
        .string({ required_error: formRequiredMessages.select_option })
        .refine((str) => positions.some((pos) => pos.position === str), { message: formRequiredMessages.select_option }),
    phoneNumber: z
        .string({ required_error: formRequiredMessages.invalid_number })
        .refine((number) => isValidPhoneNumber(number), { message: formRequiredMessages.invalid_number }),
});

export type TEditUserInfoShemaType = z.infer<typeof editUserInfoSchema>;

const EditUserInfo = () => {
    const { control } = useFormContext<TEditUserInfoShemaType>();

    return (
        <>
            <Grid item md={6}>
                <AutocompleteInput
                    control={control}
                    name="gender"
                    label="gender"
                    optionLabel="gender"
                    options={genders}
                    helperText="Choose the option that aligns with your gender identity."
                />
            </Grid>
            <Grid item md={6}>
                <FormInput control={control} label="name" name="name" type="text" helperText="Write your full name." />
            </Grid>
            <Grid item md={6}>
                <PhoneInput
                    control={control}
                    name="phoneNumber"
                    label="phone number"
                    helperText="Please input your phone number in the designated field."
                />
            </Grid>
            <Grid item md={6}>
                <AutocompleteInput
                    control={control}
                    name="location"
                    label="location"
                    optionLabel="country"
                    options={countries}
                    helperText="Please input your current location in the designated field."
                />
            </Grid>
            <Grid item md={6}>
                <AutocompleteInput
                    control={control}
                    name="position"
                    label="position"
                    optionLabel="position"
                    options={positions}
                    helperText="Choose the option that fits your current role in your organization."
                />
            </Grid>
        </>
    );
};

const BasicUserInfo = () => {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);
    const { data } = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    const methods = useForm<TEditUserInfoShemaType>({ resolver: zodResolver(editUserInfoSchema), mode: "onChange" });

    const renderEditableFields = editableEmployeeInfoFields.map((field, index) => (
        <Grid item md={6} key={index}>
            <EditableUserInfo {...field} control={methods.control} />
        </Grid>
    ));

    const onClose = () => {
        methods.reset();
        onSetToNegative();
    };

    const onSubmitForm: SubmitHandler<TEditUserInfoShemaType> = (data) => {
        console.log(data);
    };

    useEffect(() => {
        methods.reset(data);
    }, [data]);

    return (
        <EditableStatSection
            sectionAdornment={user}
            title="Basic Information"
            subtitle="Update profile information"
            actionButtonText="Edit"
            onEdit={onSetToPositive}
            isActionButtonHidden={active}
            overflow="visible"
        >
            <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmitForm)}>
                <FormProvider {...methods}>
                    <Grid container spacing={active ? 3.5 : 1}>
                        {active ? <EditUserInfo /> : renderEditableFields}
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

export default BasicUserInfo;
