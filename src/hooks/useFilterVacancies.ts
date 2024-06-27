// Router
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
// Models
import { TSearchOptionsType } from "components/molecules/AdvancedSearch/AdvancedSearch";

export const useFilterVacancies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const onSubmitSearchParams = (params: TSearchOptionsType) => {
        const paramsCopy = structuredClone(params);

        Object.keys(paramsCopy).map((key) => {
            const currentKey = key as keyof TSearchOptionsType;

            if (!paramsCopy[currentKey]) {
                delete paramsCopy[currentKey];
            }
        });

        setSearchParams(paramsCopy);
        onNavigateWithParams("jobs/all", paramsCopy);
    };

    const onResetSearchParams = () => {
        setSearchParams({});
    };

    const getCurrentParams = () => {
        const currentParams: TSearchOptionsType = {};
        searchParams.forEach((value, key) => (currentParams[key as keyof TSearchOptionsType] = value));
        return currentParams;
    };

    const onNavigateWithParams = (path: string, params: Record<string, string>) => {
        navigate({ pathname: path, search: createSearchParams(params).toString() }, { replace: true });
    };

    return { searchParams, onSubmitSearchParams, onResetSearchParams, getCurrentParams, onNavigateWithParams };
};


