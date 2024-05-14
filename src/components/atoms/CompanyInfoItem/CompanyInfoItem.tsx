// Model
import { Box, Typography } from "@mui/material";
// MUI
import { TCompanyInfoItem } from "./CompanyInfoItem.model";

const CompanyInfoItem = ({ adornmentImage, title }: TCompanyInfoItem) => {
    return (
        <Box display="flex" alignItems="center" gap={1} color={(theme) => theme.palette.grey[600]}>
            {adornmentImage}
            <Typography variant="subtitle1" component="span" fontWeight="medium">
                {title}
            </Typography>
        </Box>
    );
};

export default CompanyInfoItem;
