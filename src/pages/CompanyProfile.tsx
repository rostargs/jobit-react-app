// MUI
import { Box, ClickAwayListener, Fade, Grid, Paper, Tab, Tabs, styled } from "@mui/material";
// MUI Icons
import ApartmentIcon from "@mui/icons-material/Apartment";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
// Components
import ProfileBanner from "components/molecules/ProfileBanner/ProfileBanner";
import CompanyInfoItem from "components/atoms/CompanyInfoItem/CompanyInfoItem";
import NavBadge from "components/atoms/NavBadge/NavBadge";
import NavIcon from "components/atoms/NavIcon/NavIcon";
// Assets
import banner from "assets/images/banner-2.svg";
// Router
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
// Hooks
import { useToggle } from "hooks/useToggle";

const MoreMenu = styled(Paper<"ul">)(({ theme }) => ({
    position: "absolute",
    top: "110%",
    right: 0,
    zIndex: theme.zIndex.speedDial,
    width: "20vw",
    padding: "0.25rem",
    margin: 0,
}));

const CompanyDetailsList = () => {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <CompanyInfoItem adornmentImage={<ApartmentIcon />} title="Tech" />
            <CompanyInfoItem adornmentImage={<PlaceIcon />} title="Location" />
            <CompanyInfoItem adornmentImage={<PeopleAltIcon />} title="1-50 employees" />
        </Box>
    );
};

const CompanyActions = () => {
    const { active, onToggle, onSetToNegative } = useToggle(false);

    return (
        <Box display="flex" alignItems="center" gap={1} position="relative">
            <NavBadge name="Share" aria-label="Share" invisible>
                <ShareIcon />
            </NavBadge>
            <ClickAwayListener onClickAway={onSetToNegative}>
                <Box display="flex">
                    <NavBadge name="More" aria-label="More" invisible onClick={onToggle}>
                        <MoreVertIcon />
                    </NavBadge>
                    <Fade in={active}>
                        <MoreMenu component="ul">
                            <NavIcon startAdornment={<NoteAddIcon />} to="/jobs/add-vacancy" label="Add a new vacancy" />
                        </MoreMenu>
                    </Fade>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

const CompanyProfile = () => {
    const { pathname } = useLocation();
    const params = useParams<{ id?: string }>();

    const base = params.id ? `/company/${params.id}` : "/company";

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ProfileBanner
                    title="VNTU COMPANY"
                    subtitleContent={<CompanyDetailsList />}
                    bannerImage={banner}
                    controls={<CompanyActions />}
                />
            </Grid>
            <Grid item xs={12}>
                <Tabs value={pathname} aria-label="Company navigation">
                    <Tab component={Link} label="About information" to={base} value={base} />
                    <Tab component={Link} label="Active vacancies" to={`${base}/vacancies`} value={`${base}/vacancies`} />
                    <Tab component={Link} label="Working staff" to={`${base}/staff`} value={`${base}/staff`} />
                </Tabs>
            </Grid>
            <Grid item xs={12}>
                <Outlet context={{ id: params.id }} />
            </Grid>
        </Grid>
    );
};

export default CompanyProfile;
