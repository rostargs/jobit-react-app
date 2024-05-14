// MUI
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// Data
import { employeeSignupInputs } from "data/signupInputs";
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
import { useAuthFirebase } from "hooks/useAuthFirebase";
import { useControlFrom } from "hooks/useControlForm";
// Router
import { useNavigate } from "react-router-dom";
// Model
import { USER_TYPE } from "models/user.model";
// Firebase Config
import { auth } from "../../../firebaseConfig";
// Redux
import { useSetUserMutation } from "app/slices/userSlice";
import { useAppDispatch } from "app/hooks";
import { setViewProperty } from "app/slices/viewSlice";

const Fieldset = styled("fieldset")({
    display: "flex",
    flexDirection: "column",
    gap: "1.875rem",
});

// Login Schema
const employeeSignupSchema = z
    .object({
        email: z.string().email(),
        name: z.string().trim().min(6).max(18),
        password: z.string().min(8).max(18),
        confirm: z.string().min(8).max(18),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"],
    });
// Type of signup schema
export type TEmployeeSignupFormType = z.infer<typeof employeeSignupSchema>;

const Employee = () => {
    const { control, handleSubmit } = useForm<TEmployeeSignupFormType>({ resolver: zodResolver(employeeSignupSchema) });
    const { controlForm, onToggleInputType } = useControlFrom(employeeSignupInputs);
    const navigate = useNavigate();
    const { loading, signupWithEmailAndPassword } = useAuthFirebase(auth);
    const [setUser, { isLoading }] = useSetUserMutation();
    const dispatch = useAppDispatch();

    const isFormSending = isLoading || loading;

    const onSubmitEmploteeSignupForm: SubmitHandler<TEmployeeSignupFormType> = async (data) => {
        const { email, password, name } = data;
        const userAuthInfo = await signupWithEmailAndPassword(email, password, {
            accountType: USER_TYPE.EMPLOYEE,
            data: {
                email: email,
                gender: null,
                location: null,
                name,
                position: null,
                phoneNumber: null,
                avatar: null,
            },
        });
        await setUser(userAuthInfo);
        dispatch(setViewProperty({ prop: "greeting", value: true }));
        navigate("/");
    };

    const renderSignupInputs = employeeSignupInputs.map((input) => (
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
            <FormContainer variant="employeeSignup">
                <form autoComplete="off" onSubmit={handleSubmit(onSubmitEmploteeSignupForm)}>
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

export default Employee;
