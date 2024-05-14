// MUI
import { ButtonBase, Typography, styled } from "@mui/material";
// Model
import { TSearchRequest } from "./SearchRequest.model";
// MUI Icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const RequestButton = styled(ButtonBase)({
    width: "100%",
    justifyContent: "flex-start",
    paddingBlock: "0.5rem",
});

const Request = styled(Typography)(({ theme }) => ({
    ...theme.typography.body1,
    marginLeft: "0.5rem",
    fontWeight: theme.typography.fontWeightMedium,
}));

const SearchRequest = ({ request }: TSearchRequest) => {
    return (
        <RequestButton>
            <SearchRoundedIcon />
            <Request>{request}</Request>
        </RequestButton>
    );
};

export default SearchRequest;
