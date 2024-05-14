// Model
import { TDropdown } from "./Dropdown.model";
// MUI
import { Collapse, Paper, styled } from "@mui/material";
// Componetns
import NavItem from "components/atoms/NavItem/NavItem";

const DropdownList = styled(Collapse, { shouldForwardProp: (prop) => prop !== "depthLevel" })<{ depthLevel: number }>(
    ({ theme, depthLevel }) => ({
        position: "absolute",
        left: depthLevel > 1 ? "100%" : 0,
        top: depthLevel <= 1 ? "100%" : 0,
        boxShadow: theme.shadows[4],
    })
);

const Wrapper = styled(Paper)({
    borderRadius: 0,
});

const Dropdown = ({ isOpen, links, depthLevel }: TDropdown) => {
    depthLevel += 1;

    const renderChildrenLinks = links.map((link) => <NavItem {...link} depthLevel={depthLevel} key={link.text} />);

    return (
        <DropdownList in={isOpen} depthLevel={depthLevel}>
            <Wrapper>{renderChildrenLinks}</Wrapper>
        </DropdownList>
    );
};

export default Dropdown;
