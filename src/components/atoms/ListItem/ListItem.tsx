// Model
import { TListItem } from "./ListItem.model";
// MUI
import { ListItem as Item, styled } from "@mui/material";

const StyledListItem = styled(Item)({
    display: "list-item",
    paddingBottom: "0px",
    paddingTop: "0.25rem",
});

const ListItem = ({ text }: TListItem) => {
    return <StyledListItem>{text}</StyledListItem>;
};

export default ListItem;
