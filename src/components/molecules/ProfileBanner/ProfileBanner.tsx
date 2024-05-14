// MUI
import { Card, CardContent, CardMedia, Box, styled, Typography, CardActions } from "@mui/material";
// Assets
import banner from "assets/images/banner.svg";
// Components
import UserAvatar from "components/atoms/UserAvatar/UserAvatar";
// Redux
import { useAppSelector } from "app/hooks";
import { RootState } from "app/store";
// Model
import { TEmployeeUser } from "models/user.model";
import { TProfileBanner } from "./ProfileBanner.model";

const Banner = styled(Card)({
    backgroundColor: "inherit",
    boxShadow: "none",
    position: "relative",
    paddingBottom: "100px",
    overflow: "visible",
});

const BannerContent = styled(CardContent)({
    position: "absolute",
    bottom: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",

    "&:last-child": {
        paddingBottom: "1rem",
    },
});

const UserName = styled(Typography<"h5">)(({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightBold,
}));

const UserPosition = styled(Typography<"span">)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.grey[600],
    fontWeight: theme.typography.fontWeightRegular,
}));

const ProfileBanner = ({ avatar, bannerImage = banner, title, subtitle, subtitleContent, controls }: TProfileBanner) => {
    const userData = useAppSelector((state: RootState) => state.user.currentUser as TEmployeeUser);
    return (
        <Banner>
            <CardMedia component="img" height="320" image={bannerImage} loading="lazy" />
            <BannerContent>
                <Box display="flex" alignItems="inherit">
                    <UserAvatar avatar={avatar} userName="B" isEditable sx={{ height: 120, width: 120 }} />
                    <Box marginLeft={1.5}>
                        <UserName component="h5">{title}</UserName>
                        {subtitleContent || <UserPosition component="span">{subtitle}</UserPosition>}
                    </Box>
                </Box>
                <CardActions>{controls}</CardActions>
            </BannerContent>
        </Banner>
    );
};

export default ProfileBanner;
