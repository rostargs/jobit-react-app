// MUI
import { Grid } from "@mui/material";
// Components
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import AboutCompany from "../AboutCompany/AboutCompany";
import CompanyBenefits from "../CompanyBenefits/CompanyBenefits";
// Router
import { useOutletContext } from "react-router-dom";

const CompanyMain = () => {
    const { id } = useOutletContext<{ id: string }>();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <CompanyInfo />
            </Grid>
            <Grid item xs={12}>
                <AboutCompany />
            </Grid>
            <Grid item xs={12}>
                <CompanyBenefits />
            </Grid>
        </Grid>
    );
};

export default CompanyMain;
