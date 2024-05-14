// MUI
import { Paper, styled } from "@mui/material";
import NavIcon from "components/atoms/NavIcon/NavIcon";
import { myJobsNav } from "data/myJobsNav";

const Nav = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
    border: `0.1px solid ${theme.palette.grey[300]}`,
    display: "flex",
    padding: "0.25rem",
    width: "fit-content",
    borderRadius: "0.5rem",
    alignItems: "center",
    gap: "0.25rem",
}));

const MyJobsNav = () => {
    const renderNavigation = myJobsNav.map((item) => <NavIcon {...item} key={item.label} />);
    return <Nav>{renderNavigation}</Nav>;
};

export default MyJobsNav;
