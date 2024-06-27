// MUI
import { Box, Button, ButtonGroup, Grid } from "@mui/material";
// Hook Form
import { useFormContext } from "react-hook-form";
// Components
import AutocompleteInput from "components/atoms/AutocompleteInput/AutocompleteInput";
// Data
import { countries } from "data/countries";
import { hierarchyLevels, positions } from "data/hierarchy";
// Models
import { TSearchOptionsType } from "./AdvancedSearch";
// Hooks
import { useFilterVacancies } from "hooks/useFilterVacancies";

const SearchOptions = () => {
    const { control, reset } = useFormContext<TSearchOptionsType>();
    const { onResetSearchParams } = useFilterVacancies();

    const onResetSearchOptions = () => {
        reset({
            position: "",
            level: "",
            location: "",
            search: "",
        });
        onResetSearchParams();
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AutocompleteInput
                        control={control}
                        name="location"
                        label="location"
                        options={countries}
                        optionLabel="country"
                        renderOption={(props, { flag, code, country }) => (
                            <Box component="li" {...props} display="flex" gap={1}>
                                <img loading="lazy" src={flag} alt={code} width={20} />
                                {country}
                            </Box>
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <AutocompleteInput
                        control={control}
                        name="level"
                        label="level"
                        options={hierarchyLevels}
                        optionLabel="level"
                    />
                </Grid>
                <Grid item xs={6}>
                    <AutocompleteInput
                        control={control}
                        name="position"
                        label="position"
                        options={positions}
                        optionLabel="position"
                    />
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
                <ButtonGroup variant="outlined">
                    <Button type="reset" onClick={onResetSearchOptions}>
                        Reset
                    </Button>
                    <Button variant="outlined" type="submit">
                        Apply & Search
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default SearchOptions;
