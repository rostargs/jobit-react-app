// MUI
import { Box, Paper, Typography, styled } from "@mui/material";
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
import { TRoomItem } from "./RoomItem.model";

const ItemCard = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    border: "1px solid transparent",
    transition: "border 0.15s ease",
    cursor: "pointer",
    "&:hover": {
        border: `1px solid ${theme.palette.divider}`,
    },
}));

const Details = styled(Typography<"p">)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
    fontSize: 12,
}));

const RoomItem = ({ name, position, company, onClickCard }: TRoomItem) => {
    return (
        <ItemCard onClick={onClickCard}>
            <UserAvatar userName="Rostislav" sx={{ width: 72, height: 72 }} />
            <Box>
                <Typography variant="subtitle2" component="p">
                    {name}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5} paddingBlock={0.5}>
                    <Details component="p">{position}</Details>
                    {company && <Details component="p">{company}</Details>}
                </Box>
                <Details component="p">You: Thank you very much for your support...</Details>
            </Box>
        </ItemCard>
    );
};

export default RoomItem;
