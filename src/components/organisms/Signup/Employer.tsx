// MUI
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// Data
import { employerSignupInputs } from "data/signupInputs";
// Components
import FormInput from "components/atoms/FormInput/FormInput";
import FormContainer from "components/molecules/FormContainer/FormContainer";
import AuthHeroContainer from "../AuthHeroContainer/AuthHeroContainer";
// Hook Form
import { SubmitHandler, useForm } from "react-hook-form";
// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Hooks
import { useControlFrom } from "hooks/useControlForm";
import { useAuthFirebase } from "hooks/useAuthFirebase";
// Firebase Config
import { auth } from "../../../firebaseConfig";
// Model
import { USER_TYPE } from "models/user.model";
// Redux
import { useSetUserMutation } from "app/slices/userSlice";
import { useAppDispatch } from "app/hooks";
import { setViewProperty } from "app/slices/viewSlice";
// Router
import { useNavigate } from "react-router-dom";

const Fieldset = styled("fieldset")({
    display: "flex",
    flexDirection: "column",
    gap: "1.875rem",
});

// Login Schema
const employerSignupSchema = z
    .object({
        email: z.string().email(),
        companyName: z.string().trim().min(3).max(18),
        password: z.string().min(8).max(18),
        confirm: z.string().min(8).max(18),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"],
    });
// Type of signup schema
export type TEmployerSignupFormType = z.infer<typeof employerSignupSchema>;

const Employer = () => {
    const { control, handleSubmit } = useForm<TEmployerSignupFormType>({ resolver: zodResolver(employerSignupSchema) });
    const { controlForm, onToggleInputType } = useControlFrom(employerSignupInputs);
    const navigate = useNavigate();
    const { signupWithEmailAndPassword, loading } = useAuthFirebase(auth);
    const [setUser, { isLoading }] = useSetUserMutation();
    const dispatch = useAppDispatch();

    const isFormSending = isLoading || loading;

    const onSubmitEmployerSignupForm: SubmitHandler<TEmployerSignupFormType> = async (data) => {
        const { email, password, companyName } = data;
        const userAuthInfo = await signupWithEmailAndPassword(email, password, {
            accountType: USER_TYPE.EMPLOYER,
            data: {
                email,
                companyName,
                ownerName: null,
                logo: null,
                location: null,
                phoneNumber: null,
                domen: null,
            },
        });
        await setUser(userAuthInfo);
        dispatch(setViewProperty({ prop: "greeting", value: true }));
        navigate("/");
    };

    const renderSignupInputs = employerSignupInputs.map((input) => (
        <FormInput
            {...input}
            control={control}
            isVisiblePassword={controlForm[input.name]}
            onTogglePassword={onToggleInputType}
            key={input.label}
            name={input.name}
        />
    ));

    return (
        <AuthHeroContainer variant="signup">
            <FormContainer variant="employerSignup">
                <form autoComplete="off" onSubmit={handleSubmit(onSubmitEmployerSignupForm)}>
                    <Fieldset disabled={isFormSending}>
                        {renderSignupInputs}
                        <LoadingButton variant="outlined" type="submit" loading={isFormSending}>
                            Submit
                        </LoadingButton>
                    </Fieldset>
                </form>
            </FormContainer>
        </AuthHeroContainer>
    );
};

export default Employer;
