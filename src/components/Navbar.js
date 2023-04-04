import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar } from "@mui/material";
//import Link from "@mui/material/Link";
import { Link, useResolvedPath } from "react-router-dom";
import { users } from "../API/_DATA.js";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  console.log(users);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {pages.map((page) => (
            <MenuItem
              component={Link}
              // the 'to' prop (and any other props not recognized by MenuItem itself)
              // will be passed down to the Link component
              to={page.path}
            >
              <Typography textAlign="center">{page.name}</Typography>
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
                  <MenuItem>
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
