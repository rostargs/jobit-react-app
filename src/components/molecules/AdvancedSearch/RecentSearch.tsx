// MUI
import { Box, Button, Stack, Typography, styled } from "@mui/material";
// Components
import SkillTag from "components/atoms/SkillTag/SkillTag";
import SearchRequest from "components/atoms/SearchRequest/SearchRequest";
// Model
import { TRecentSearch } from "./Search.model";

const SearchSubtitle = styled(Typography<"h6">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightRegular,
}));

const SwitchButton = styled(Button)(({ theme }) => ({
    textTransform: "capitalize",
    fontWeight: theme.typography.fontWeightMedium,
    ...theme.typography.h6,
}));

const baseSearchTags = ["User Research", "Mobile App Design", "UX", "UI", "User Flow", "Wireframing", "Design System"];
const baseSearchRequests = ["Product Designer", "UX Designer", "Product Manager", "UI Designer"];

const RecentSearch = ({ toggleMode }: TRecentSearch) => {
    const renderSkillTags = baseSearchTags.map((tag) => <SkillTag name={tag} key={tag} />);
    const renderSearchRequests = baseSearchRequests.map((request) => <SearchRequest request={request} key={request} />);
    return (
        <Stack>
            <Box>
                <SearchSubtitle component="h6">Your Recent Searches</SearchSubtitle>
                <Stack>{renderSearchRequests}</Stack>
            </Box>
            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <SearchSubtitle component="h6">Try Searching For Skills</SearchSubtitle>
                    <SwitchButton variant="text" onClick={toggleMode}>
                        Advance Search
                    </SwitchButton>
                </Stack>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {renderSkillTags}
                </Stack>
            </Box>
        </Stack>
    );
};

export default RecentSearch;
