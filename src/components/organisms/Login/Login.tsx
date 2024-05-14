// MUI
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// Data
import { loginInputs } from "data/loginInputs";
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
// Router
import { useNavigate } from "react-router-dom";
// Firebase Config
import { auth } from "../../../firebaseConfig";

const Fieldset = styled("fieldset")({
    display: "flex",
    flexDirection: "column",
    gap: "1.875rem",
});

// Login Schema
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(18),
});
// Type of login schema
export type TLoginFormType = z.infer<typeof loginSchema>;

const Login = () => {
    const { control, handleSubmit } = useForm<TLoginFormType>({ resolver: zodResolver(loginSchema) });
    const { controlForm, onToggleInputType } = useControlFrom(loginInputs);
    const navigate = useNavigate();
    const { loginWithEmailAndPassword, loading } = useAuthFirebase(auth);

    const onSubmitLoginForm: SubmitHandler<TLoginFormType> = async (data) => {
        const { email, password } = data;
        await loginWithEmailAndPassword(email, password);
        navigate("/");
    };

    const renderLoginInputs = loginInputs.map((input) => (
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
        <AuthHeroContainer variant="login">
            <FormContainer variant="login">
                <form autoComplete="off" onSubmit={handleSubmit(onSubmitLoginForm)}>
                    <Fieldset disabled={loading}>
                        {renderLoginInputs}
                        <LoadingButton variant="outlined" type="submit" loading={loading}>
                            Submit
                        </LoadingButton>
                    </Fieldset>
                </form>
            </FormContainer>
        </AuthHeroContainer>
    );
};

export default Login;
