// MUI
import { Paper, styled } from "@mui/material";
// Components
import NavIcon from "components/atoms/NavIcon/NavIcon";
// Data
import { publicProfileNavigation } from "data/publicProfileNavigation";
// Model
import { TPublicProfileNav } from "./PublicProfileNav.model";
// Hooks
import { useSectionNavigation } from "hooks/useSectionNavigation";

const Navigation = styled(Paper<"nav">)({
    position: "sticky",
    top: 0,
    boxShadow: "none",
    padding: "0.5rem",
});

const PublicProfileNav = ({ sections }: TPublicProfileNav) => {
    const { onNavigateToSection, onView } = useSectionNavigation(sections);

    const renderProfileNav = publicProfileNavigation.map((nav) => (
        <NavIcon
            {...nav}
            key={nav.label}
            onClickIcon={() => onNavigateToSection(nav.to)}
            manualActive={nav.to === onView}
        />
    ));

    return <Navigation component="nav">{renderProfileNav}</Navigation>;
};

export default PublicProfileNav;
