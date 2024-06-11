// MUI
import { Grid, Paper, styled } from "@mui/material";
// Components
import Chat from "components/organisms/Chat/Chat";
// Router
import { Outlet } from "react-router-dom";

const Wrapper = styled(Grid)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
}));

const ScrollSection = styled(Grid)({
    height: "100vh",
    maxHeight: "calc(100vh - 90px - 32px)",
    overflowY: "scroll",
    "::-webkit-scrollbar": {
        width: 0,
    },
});

const AsideContent = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.5rem 0px 0px 0.5rem",
    padding: "1rem",
    minHeight: "100%",
}));

const Messanger = () => {
    return (
        <Wrapper container>
            <ScrollSection item xs={4}>
                <AsideContent>
                    <Outlet />
                </AsideContent>
            </ScrollSection>
            <ScrollSection item xs>
                <Chat />
            </ScrollSection>
        </Wrapper>
    );
};
export default Messanger;
