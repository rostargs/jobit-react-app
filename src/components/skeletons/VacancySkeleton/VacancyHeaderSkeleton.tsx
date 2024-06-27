import { Box, IconButton, Skeleton, Typography } from "@mui/material";
// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const headerControls = [<EmailIcon />, <ShareIcon />, <MoreHorizIcon />];

const VacancyHeaderSkeleton = () => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography variant="h3" width="25rem">
                        <Skeleton variant="text" />
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton variant="rounded" width={30} height={30} />
                        <Typography variant="h6" width="7rem">
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="h6" width="4rem">
                            <Skeleton variant="text" />
                        </Typography>
                        <Typography variant="h6" display="inline-flex">
                            $ &nbsp; <Skeleton variant="text" width="5rem" />
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" gap={1} marginTop={1}>
                    {headerControls.map((item, index) => (
                        <IconButton disabled key={index}>
                            {item}
                        </IconButton>
                    ))}
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6">Required skills:</Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton variant="rounded" width={35} height={35} key={index} />
                        ))}
                    </Box>
                </Box>
                <Typography variant="subtitle1" display="inline-flex">
                    Posted at: &nbsp;
                    <Skeleton variant="text" width="7rem" />
                </Typography>
            </Box>
        </Box>
    );
};

export default VacancyHeaderSkeleton;
