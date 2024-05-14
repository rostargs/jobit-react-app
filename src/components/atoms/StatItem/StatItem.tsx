// Model
import { TStatItem, TStatItemAction } from "./StatItem.model";
// MUI
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    ClickAwayListener,
    Fade,
    IconButton,
    Paper,
    Typography,
    styled,
} from "@mui/material";
// MUI Icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// Hooks
import { useToggle } from "hooks/useToggle";

const StatCard = styled(Card)({
    overflow: "visible",
});

const Count = styled(Typography<"span">)(({ theme }) => ({
    ...theme.typography.h3,
    fontWeight: theme.typography.fontWeightBold,
}));

const StatItemHeader = styled(CardHeader)(({ theme }) => ({
    paddingBlock: "0.5rem",
    ".MuiCardHeader-action": {
        alignSelf: "center",
        color: theme.palette.primary.main,
    },
}));

const ActionBox = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xl")]: {
        alignItems: "flex-end",
    },
}));

const StatItemContent = styled(CardContent)({
    paddingBlock: "0.5rem",
    ":last-child": {
        paddingBottom: "0.5rem",
    },
});

const StatItemActionWrapper = styled(Paper)(({ theme }) => ({
    position: "absolute",
    top: "100%",
    padding: "0.25rem",
    zIndex: theme.zIndex.fab,
}));

const ActionButton = styled(Button)({
    textWrap: "nowrap",
    width: "100%",
});

const StatItemAction = ({ isActive }: TStatItemAction) => {
    return (
        <Fade in={isActive}>
            <StatItemActionWrapper elevation={5}>
                <ActionButton>Previous month</ActionButton>
                <ActionButton>All the time</ActionButton>
                <ActionButton>Next month</ActionButton>
            </StatItemActionWrapper>
        </Fade>
    );
};

const StatItem = ({}: TStatItem) => {
    const { active, onToggle, onSetToNegative } = useToggle(false);
    return (
        <StatCard>
            <StatItemHeader
                action={
                    <ClickAwayListener onClickAway={onSetToNegative}>
                        <ActionBox>
                            <IconButton aria-label="settings" color="inherit" onClick={onToggle}>
                                <MoreHorizIcon />
                            </IconButton>
                            <StatItemAction isActive={active} />
                        </ActionBox>
                    </ClickAwayListener>
                }
                title="Potential Jobs"
                subheader="(This Month)"
            />
            <StatItemContent>
                <Count component="span">8</Count>
            </StatItemContent>
        </StatCard>
    );
};

export default StatItem;
