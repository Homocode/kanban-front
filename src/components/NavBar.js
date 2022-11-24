import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function NavBar({ pages }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const open = Boolean(anchorElNav);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      return navigate(path);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <IconButton
                size="large"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorElNav}
                open={open}
                onClose={handleCloseNavMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.path)}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
                {!!user && (
                  <MenuItem key={"logout"} onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </div>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kanban Board
            </Typography>

            {user ? (
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                LogIn
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
