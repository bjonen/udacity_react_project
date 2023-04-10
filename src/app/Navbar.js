import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../features/questions/questionSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/users/authedUserSlice.js";
import { processGetApis } from "./util.js";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authedUser = useSelector((state) => state.authedUser.id);
  const dispatch = useDispatch();

  const { data: users, isLoading } = processGetApis(useGetUsersQuery());
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const fullUsers = { ...users };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    const newUser = event.target.dataset["key"];
    setAnchorEl(null);
    if (newUser) {
      dispatch(login(event.target.dataset["key"]));
    }
  };

  const pages = [
    { name: "Home", path: "/" },
    { name: "Leader Board", path: "leaderboard" },
    { name: "New", path: "add" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              component={Link}
              // the 'to' prop (and any other props not recognized by MenuItem itself)
              // will be passed down to the Link component
              to={page.path}
            >
              <Typography key={page.name} textAlign="center">
                {page.name}
              </Typography>
            </MenuItem>
          ))}
          {/* Dummy element to push auth to ride end */}
          <Typography sx={{ flexGrow: 1 }}></Typography>
          {
            <div>
              {authedUser !== "anonymous"
                ? fullUsers[authedUser].name
                : "Logged out"}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {
                  <Avatar
                    alt="Remy Sharp"
                    src={fullUsers[authedUser].avatarURL}
                  />
                }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {Object.keys(fullUsers).map((name) => (
                  <MenuItem
                    key={name}
                    mykey={name}
                    data-key={name}
                    onClick={handleClose}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      mykey="blub"
                      src={fullUsers[name].avatarURL}
                    />
                    {fullUsers[name].name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
