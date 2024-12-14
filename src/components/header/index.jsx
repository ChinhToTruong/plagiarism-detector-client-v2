import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";

const settings = [
  {
    id: 0,
    text: "Profile",
    path: "/user",
  },
  {
    id: 1,
    text: "Logout",
    path: "/",
  },
];

const HeaderComponent = () => {
  const user = {
    name: "John Smith",
    image: "https://example.com/image.jpg",
  };

  function handleUserName(user) {
    if (!user) return "";
    return user.name.charAt(0).toUpperCase();
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="flex items-center justify-end w-full px-4">
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{handleUserName(user)}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem key={index} onClick={handleCloseUserMenu}>
              <Link to={setting.path}>
                <Typography sx={{ textAlign: "center" }}>
                  {setting.text}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
};

export default HeaderComponent;
