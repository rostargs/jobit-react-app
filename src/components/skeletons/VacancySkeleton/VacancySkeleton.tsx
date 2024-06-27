// MUI
import { Box, Paper, Skeleton, styled } from "@mui/material";
// Components
import VacancyHeaderSkeleton from "./VacancyHeaderSkeleton";

const VacancySkeletonContent = styled(Paper)({
    boxShadow: "none",
    padding: "3rem",
    minHeight: "100%",
    borderRadius: "0 4px 4px 0",
});

const VacancySkeleton = () => {
    return (
        <VacancySkeletonContent>
            <VacancyHeaderSkeleton />
            <Box marginBlock={3} gap={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Skeleton variant="rounded" width="15rem" height="2.5rem" />
                    <Skeleton variant="rounded" width="10rem" height="2.5rem" />
                </Box>
            </Box>
        </VacancySkeletonContent>
    );
};

export default VacancySkeleton;
