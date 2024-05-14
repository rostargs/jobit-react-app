// MUI
import { Collapse, List } from "@mui/material";
// Model
import { TNavIconList } from "./NavIconList.model";
// Components
import NavIcon from "components/atoms/NavIcon/NavIcon";

const NavIconList = ({ children, isOpen }: TNavIconList) => {
    const renderChildrenSubmenu = children.map((link) => <NavIcon {...link} key={link.label} />);
    return (
        <Collapse in={isOpen}>
            <List disablePadding>{renderChildrenSubmenu}</List>
        </Collapse>
    );
};

export default NavIconList;
