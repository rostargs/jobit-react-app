// MUI
import { Box, Button, ButtonGroup, Divider, List, ListItem, Paper, Typography, styled } from "@mui/material";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import Notification from "components/atoms/Notification/Notification";
// MUI Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const NotificationsContent = styled(Paper)({
    minHeight: "100%",
    padding: "1rem",
});

const StyledListItem = styled(ListItem)({
    paddingBlock: "0.25rem",
});

const Notifications = () => {
    return (
        <NotificationsContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" component="nav">
                <Typography variant="h6" component="h6">
                    Notifications
                </Typography>
                <Box display="flex" gap={2}>
                    <ButtonGroup>
                        <Button variant="contained">All</Button>
                        <Button>Unread</Button>
                    </ButtonGroup>
                    <NavBadge name="More" invisible>
                        <MoreHorizIcon />
                    </NavBadge>
                </Box>
            </Box>
            <Box marginBlock={4}>
                <List>
                    <StyledListItem disableGutters>
                        <Notification variant="vacancy" />
                    </StyledListItem>
                    <StyledListItem disableGutters>
                        <Notification variant="view" />
                    </StyledListItem>
                    <StyledListItem disableGutters>
                        <Notification variant="applied" />
                    </StyledListItem>
                    <StyledListItem disableGutters>
                        <Notification variant="rejected" />
                    </StyledListItem>
                    <StyledListItem disableGutters>
                        <Notification variant="message" />
                    </StyledListItem>
                </List>
            </Box>
        </NotificationsContent>
    );
};

export default Notifications;
