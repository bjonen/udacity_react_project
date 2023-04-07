// Internal state: anchorEl
// External state: authedUser

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
import { useGetUsersQuery } from "../apiSlice.js";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let content;
  if (isLoading) {
    content = "posts";
    return <div>Loading...</div>;
  } else if (isSuccess) {
    //content = "success";
    content = console.log("success. posts is", users);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    { name: "Home", path: "/" },
    { name: "PollPage", path: "pollpage" },
    { name: "LeaderBoard", path: "leaderboard" },
    { name: "New", path: "new" },
  ];

  const authedUser = "sarahedo";

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
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {authedUser && (
                  <Avatar alt="Remy Sharp" src={users[authedUser].avatarURL} />
                )}
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
                {Object.keys(users).map((name) => (
                  <MenuItem key={name}>
                    <Avatar alt="Remy Sharp" src={users[name].avatarURL} />
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
