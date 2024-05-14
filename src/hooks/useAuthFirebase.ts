// React
import { useEffect, useState } from "react";
// Firebase
import {
    Auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
// Model
import { TUserVariants } from "models/user.model";
import { TAuthProviders } from "data/authSocialMediaIcons";
// Utils
import { getUserType } from "utils/getUserType";
// Redux
import { useAppDispatch } from "app/hooks";
import { extendedUserFirebaseApi, setUserLoading } from "app/slices/userSlice";

export const useAuthFirebase = (auth: Auth) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const signupWithEmailAndPassword = async (email: string, password: string, formData: TUserVariants) => {
        try {
            setLoading(true);
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            return getUserType(user, formData);
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loginWithEmailAndPassword = async (email: string, password: string) => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const loginWithSocialMedia = async (provider: TAuthProviders) => {
        try {
            setLoading(true);
            const providers = {
                google: new GoogleAuthProvider(),
                github: new GithubAuthProvider(),
                facebook: new FacebookAuthProvider(),
            };

            const currentProvider = providers[provider];
            const { user } = await signInWithPopup(auth, currentProvider);

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await dispatch(extendedUserFirebaseApi.endpoints.getUserByID.initiate(user.uid));
            } else dispatch(setUserLoading(false));
        });
        return () => subscribe();
    }, [auth]);

    return { loading, signupWithEmailAndPassword, loginWithEmailAndPassword, loginWithSocialMedia };
};
