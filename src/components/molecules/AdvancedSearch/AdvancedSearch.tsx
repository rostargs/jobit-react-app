// MUI
import { ClickAwayListener, IconButton, InputAdornment, Grow, styled, Paper } from "@mui/material";
// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Model
import { SearchTypes, TAdvancedSearch, TSearchMenuProps } from "./Search.model";
// React
import { useState } from "react";
// MUI Icons
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// Components
import RecentSearch from "./RecentSearch";
import SearchOptions from "./SearchOptions";
import FormInput from "components/atoms/FormInput/FormInput";
// Hook Form
import { useForm } from "react-hook-form";
// Hooks
import { useToggle } from "hooks/useToggle";

const INPUT_WIDTH = 520;

const Form = styled("form")({
    position: "relative",
    maxWidth: INPUT_WIDTH,
    width: "100%",
    display: "flex",
    justifyContent: "center",
});

const SearchMenu = styled(Paper, { shouldForwardProp: (prop) => prop !== "headerHeight" })<TSearchMenuProps>(
    ({ theme, headerHeight }) => ({
        position: "absolute",
        maxWidth: INPUT_WIDTH + 32,
        width: "110%",
        top: "-1rem",
        borderRadius: "0.5rem",
        boxShadow: theme.shadows[5],
        padding: `${headerHeight}px 1rem 1rem 1rem`,
    })
);

const AdvancedSearch = ({ headerHeight }: TAdvancedSearch) => {
    const { active, onSetToNegative, onSetToPositive } = useToggle(false);
    const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.RECENT);
    const { control } = useForm();

    const onClickAway = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
        const targetElement = event.target as HTMLElement;

        if (targetElement.localName === "body") {
            return;
        }

        onSetToNegative();
    };

    const onChangeTypeToAdvance = () => {
        setSearchType(SearchTypes.OPTIONS);
    };

    const onChangeTypeToRecent = () => {
        setSearchType(SearchTypes.RECENT);
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
            <Form>
                <FormInput
                    autoComplete="off"
                    type="text"
                    placeholder="search job title or skill"
                    startAdornment={
                        <IconButton disableRipple>
                            <SearchRoundedIcon />
                        </IconButton>
                    }
                    name="search"
                    control={control}
                    sx={{ borderRadius: "0.5rem", paddingInline: 1, zIndex: (theme) => theme.zIndex.appBar }}
                    endAdornment={endAdornment}
                    onFocus={onSetToPositive}
                />
                <Grow in={active}>
                    <SearchMenu headerHeight={headerHeight}>{searchVariants[searchType]}</SearchMenu>
                </Grow>
            </Form>
        </ClickAwayListener>
    );
};

export default AdvancedSearch;
