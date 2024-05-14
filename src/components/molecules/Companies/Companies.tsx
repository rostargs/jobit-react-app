// MUI
import { Grid, Paper, Typography, styled } from "@mui/material";
// Assets
import company1 from "assets/images/companies/Company-1.svg";
import company2 from "assets/images/companies/Company-2.svg";
import company3 from "assets/images/companies/Company-3.svg";
import company4 from "assets/images/companies/Company-4.svg";
import company5 from "assets/images/companies/Company-5.svg";
import company6 from "assets/images/companies/Company-6.svg";
import company7 from "assets/images/companies/Company-7.svg";
// Components
import Image from "components/atoms/Image/Image";

const companyIcons: readonly string[] = [company1, company2, company3, company4, company5, company6, company7];

const CompaniesWrapper = styled(Paper)(({ theme }) => ({
    padding: "2.5rem 4rem",
    borderRadius: "1.5rem",
    boxShadow: theme.shadows[5],
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [theme.breakpoints.down("md")]: {
        padding: "2.5rem 1rem",
    },
}));

const Companies = () => {
    const renderIcons = companyIcons.map((icon, index) => {
        const itemsLength = companyIcons.length;
        return (
            <Grid item lg={12 / itemsLength} md={3} xs={4} display="flex" justifyContent="center" key={index}>
                <Image src={icon} alt="Company icon" />
            </Grid>
        );
    });
    return (
        <CompaniesWrapper>
            <Typography component="h4" fontWeight="bold" variant="h4" textAlign="center">
                Let’s get you hired by 30,000 employers
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {renderIcons}
            </Grid>
        </CompaniesWrapper>
    );
};

export default Companies;
