// React
import { Suspense, lazy } from "react";
// MUI
import { Box, IconButton, Stack, Typography } from "@mui/material";
// MUI Icons
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// Hook Form
import { useForm } from "react-hook-form";
// Zod
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import FormInput from "components/atoms/FormInput/FormInput";
import NavBadge from "components/atoms/NavBadge/NavBadge";
const RoomsList = lazy(() => import("./RoomsList"));

const searchUserSchema = z.object({
    userName: z.string().trim().optional(),
});

type TSearchUserType = z.infer<typeof searchUserSchema>;

const ChatRooms = () => {
    const { control } = useForm<TSearchUserType>({ resolver: zodResolver(searchUserSchema) });

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" component="h6" fontWeight="medium">
                    Messages
                </Typography>
                <NavBadge name="Add friend" invisible to="search">
                    <PersonAddIcon />
                </NavBadge>
            </Box>
            <Box paddingBlock={3}>
                <form autoComplete="off">
                    <FormInput
                        control={control}
                        placeholder="search by name"
                        name="userName"
                        type="text"
                        startAdornment={
                            <IconButton disableRipple>
                                <PersonSearchIcon />
                            </IconButton>
                        }
                        sx={{ borderRadius: "8px" }}
                    />
                </form>
            </Box>
            <Box>
                <Suspense fallback={<>Loading...</>}>
                    <RoomsList />
                </Suspense>
            </Box>
        </Box>
    );
};

export default ChatRooms;
