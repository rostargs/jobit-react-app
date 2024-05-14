// React
import { Suspense, lazy } from "react";
// MUI
import { Box, IconButton, Typography } from "@mui/material";
// Components
import NavBadge from "components/atoms/NavBadge/NavBadge";
import FormInput from "components/atoms/FormInput/FormInput";
const AvailableFriendsList = lazy(() => import("./AvailableFriendsList"));
// MUI Icons
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
// Hook Form
import { useForm } from "react-hook-form";
// Router
import { useNavigate } from "react-router-dom";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFriendSchema = z.object({
    searchFriend: z.string().trim(),
});

type TSearchFriendSchemaType = z.infer<typeof searchFriendSchema>;

const SearchFriend = () => {
    const { control, watch } = useForm<TSearchFriendSchemaType>({ resolver: zodResolver(searchFriendSchema) });
    const navigate = useNavigate();

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" component="h6">
                    Search friend
                </Typography>
                <NavBadge name="Go back" invisible onClick={() => navigate(-1)}>
                    <KeyboardReturnIcon />
                </NavBadge>
            </Box>
            <Box paddingBlock={3}>
                <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                    <FormInput
                        type="text"
                        control={control}
                        startAdornment={
                            <IconButton disableRipple>
                                <TravelExploreIcon />
                            </IconButton>
                        }
                        placeholder="write your friend name"
                        name="searchFriend"
                        sx={{ borderRadius: "8px" }}
                    />
                </form>
            </Box>
            <Box>
                <Suspense fallback={<>Loading...</>}>
                    <AvailableFriendsList userName={watch("searchFriend")} />
                </Suspense>
            </Box>
        </Box>
    );
};

export default SearchFriend;
