// MUI
import { Badge, styled, Tooltip } from "@mui/material";
// Model
import { TBadgeLinkProps, TNavBadge } from "./NavBadge.model";
// Router
import { Link } from "react-router-dom";

const BadgeLink = styled(Link, { shouldForwardProp: (prop) => prop !== "disabled" })<TBadgeLinkProps>(
    ({ theme, disabled }) => ({
        color: theme.palette.primary.main,
        padding: "0.33rem",
        transition: `background-color ${theme.transitions.duration.complex}ms`,
        borderRadius: "50%",
        ":hover": !disabled && {
            backgroundColor: theme.palette.action.hover,
        },
        cursor: disabled ? "default" : "pointer",
    })
);

const NavBadge = ({ to, children, name, badgeContent = " ", disabled, onClick, ...props }: TNavBadge) => {
    return (
        <BadgeLink to={to || "#"} onClick={onClick} disabled={disabled}>
            <Tooltip title={name}>
                <Badge {...props} badgeContent={badgeContent} variant="dot" color="secondary">
                    {children}
                </Badge>
            </Tooltip>
        </BadgeLink>
    );
};

export default NavBadge;
