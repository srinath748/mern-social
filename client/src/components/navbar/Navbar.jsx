// client/src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../state/authSlice";
import { toggleTheme } from "../../state/themeSlice";
import { clearNotifications } from "../../state/notificationsSlice";

const Navbar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const themeMode = useSelector((state) => state.theme.mode);
  const { unreadLikes, unreadComments } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("token");
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
    dispatch(clearNotifications()); // optional: clear unread counts
  };

  const mobileMenu = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {!token && (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
        {token && user && (
          <>
            <ListItem>
              <Avatar
                src={
                  user?.profilePicture
                    ? `${BACKEND_URL}/assets/${user.profilePicture}`
                    : ""
                }
                alt={user?.firstName}
              />
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                sx={{ ml: 1 }}
              />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
            <ListItem button onClick={handleToggleTheme}>
              <ListItemText
                primary={`Switch to ${
                  themeMode === "light" ? "Dark" : "Light"
                } Mode`}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          MERN Social
        </Typography>

        {/* Desktop buttons */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          {!token && (
            <Stack direction="row" spacing={2}>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </Stack>
          )}

          {token && user && (
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Notifications badge */}
              <IconButton onClick={handleNotificationsClick}>
                <Badge badgeContent={unreadLikes + unreadComments} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleNotificationsClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem>Likes: {unreadLikes}</MenuItem>
                <Divider />
                <MenuItem>Comments: {unreadComments}</MenuItem>
              </Menu>

              {/* Theme toggle */}
              <IconButton onClick={handleToggleTheme}>
                {themeMode === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>

              {/* User info */}
              <Avatar
                src={
                  user?.profilePicture
                    ? `${BACKEND_URL}/assets/${user.profilePicture}`
                    : ""
                }
                alt={user?.firstName}
              />
              <Typography variant="body1">
                {user.firstName} {user.lastName}
              </Typography>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          )}
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          {mobileMenu}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
