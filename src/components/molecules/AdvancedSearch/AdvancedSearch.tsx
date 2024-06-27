// MUI
import { ClickAwayListener, IconButton, InputAdornment, styled, Paper } from "@mui/material";
// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Model
import { SearchTypes, TAdvancedSearch, TSearchMenuProps } from "./Search.model";
// React
import { useCallback, useState } from "react";
// MUI Icons
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// Components
import RecentSearch from "./RecentSearch";
import SearchOptions from "./SearchOptions";
import FormInput from "components/atoms/FormInput/FormInput";
// Hook Form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// Hooks
import { useToggle } from "hooks/useToggle";
import { useFilterVacancies } from "hooks/useFilterVacancies";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const INPUT_WIDTH = 520;

const Form = styled("form")({
    position: "relative",
    maxWidth: INPUT_WIDTH,
    width: "100%",
    display: "flex",
    justifyContent: "center",
});

const SearchMenu = styled(Paper, {
    shouldForwardProp: (prop) => prop !== "headerHeight" && prop !== "isActive",
})<TSearchMenuProps>(({ theme, headerHeight, isActive }) => ({
    position: "absolute",
    maxWidth: INPUT_WIDTH + 32,
    width: "110%",
    top: "-1rem",
    borderRadius: "0.5rem",
    boxShadow: theme.shadows[5],
    padding: `${headerHeight}px 1rem 1rem 1rem`,
    visibility: "hidden",
    opacity: 0,
    transition: "all 0.2s ease-in",

    ...(isActive && { visibility: "visible", opacity: 1 }),
}));

const searchOptionsSchema = z.object({
    location: z.string().optional(),
    level: z.string().optional(),
    position: z.string().optional(),
    search: z.string().optional(),
});

export type TSearchOptionsType = z.infer<typeof searchOptionsSchema>;

const AdvancedSearch = ({ headerHeight }: TAdvancedSearch) => {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);
    const { getCurrentParams, onSubmitSearchParams } = useFilterVacancies();
    const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.RECENT);
    const methods = useForm<TSearchOptionsType>({
        resolver: zodResolver(searchOptionsSchema),
        defaultValues: { ...getCurrentParams() },
    });

    const { control, handleSubmit } = methods;

    const onClickAway = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
        const targetElement = event.target as HTMLElement;

        if (targetElement.localName === "body") {
            return;
        }

        onSetToNegative();
    };

    const onChangeTypeToAdvance = useCallback(() => {
        setSearchType(SearchTypes.OPTIONS);
    }, [searchType]);

    const onChangeTypeToRecent = () => {
        setSearchType(SearchTypes.RECENT);
    };

    const onSearch: SubmitHandler<TSearchOptionsType> = (data) => {
        onSubmitSearchParams(data);
        onSetToNegative();
    };

    const endAdornment = active ? (
        <InputAdornment position="end">
            {searchType === SearchTypes.RECENT ? (
                <IconButton disableRipple onClick={onSetToNegative}>
                    <CancelRoundedIcon />
                </IconButton>
            ) : (
                <IconButton disableRipple onClick={onChangeTypeToRecent}>
                    <ArrowBackIcon />
                </IconButton>
            )}
        </InputAdornment>
    ) : null;

    const searchVariants: Record<SearchTypes, JSX.Element> = {
        options: <SearchOptions />,
        recent: <RecentSearch toggleMode={onChangeTypeToAdvance} />,
    };

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Form autoComplete="off" onSubmit={handleSubmit(onSearch)}>
                <FormInput
                    type="text"
                    placeholder="search job by skill tag"
                    startAdornment={
                        <IconButton disableRipple type="submit">
                            <SearchRoundedIcon />
                        </IconButton>
                    }
                    name="search"
                    control={control}
                    sx={{ borderRadius: "0.5rem", paddingInline: 1, zIndex: (theme) => theme.zIndex.appBar }}
                    endAdornment={endAdornment}
                    onFocus={onSetToPositive}
                />
                <FormProvider {...methods}>
                    <SearchMenu headerHeight={headerHeight} isActive={active}>
                        {searchVariants[searchType]}
                    </SearchMenu>
                </FormProvider>
            </Form>
        </ClickAwayListener>
    );
};

export default AdvancedSearch;
