// React
import { useCallback, useState } from "react";
// Model
import { TBaseFormInputProps } from "components/atoms/FormInput/FormInput.model";

export const useControlFrom = <T extends Record<string, string>>(arrayOfInputs: TBaseFormInputProps<T>[]) => {
    const [controlForm, setControllForm] = useState(() => {
        const initialState: { [key: string]: boolean } = {};
        const filtredinputs = arrayOfInputs.filter((input) => input.type === "password");
        filtredinputs.forEach((input) => {
            initialState[input.name] = false;
        });
        return initialState;
    });

    const onToggleInputType = useCallback(
        (name: string) => {
            setControllForm((prev) => {
                return {
                    ...prev,
                    [name]: !controlForm[name],
                };
            });
        },
        [controlForm]
    );

    return { controlForm, onToggleInputType };
};
