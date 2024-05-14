// MUI
import { styled, List as L, Box, Typography } from "@mui/material";
// Model
import { TList } from "./List.model";
// Components
import ListItem from "components/atoms/ListItem/ListItem";

const StyledList = styled(L)({
    listStylePosition: "inside",
});

const ListTitle = styled(Typography<"span">)(({ theme }) => ({
    ...theme.typography.body1,
}));

const List = ({ label, items, type = "disc" }: TList) => {
    const renderListItems = items.map((text, index) => <ListItem text={text} key={index} />);
    return (
        <Box>
            <ListTitle component="span">{label}</ListTitle>
            <StyledList disablePadding sx={{ listStyleType: type }}>
                {renderListItems}
            </StyledList>
        </Box>
    );
};

export default List;
