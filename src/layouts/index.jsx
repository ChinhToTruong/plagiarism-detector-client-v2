import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HeaderComponent from "../components/header";
import { ListItemIcon } from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SchoolIcon from "@mui/icons-material/School";

const drawerWidth = 240;
const components = [
  {
    id: 0,
    text: "Profile",
    path: "/user",
    icon: <ContactPageIcon />,
  },
  {
    id: 1,
    text: "Class",
    path: "/user/class-room",
    icon: <SchoolIcon />,
  },
  {
    id: 2,
    text: "Plagiarism",
    path: "/user/plagiarism",
    icon: <ContactPageIcon />,
  },
];

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <HeaderComponent />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <p className="text-2xl font-lg text-center uppercase font-bold">
            plagiarism
          </p>
        </Toolbar>
        <Divider />
        <List>
          {components.map((com) => (
            <ListItem key={com.id} disablePadding>
              <ListItemButton>
                <Link
                  to={`${com.path}`}
                  className="flex justify-center items-center "
                >
                  <ListItemIcon>{com.icon}</ListItemIcon>
                  <ListItemText primary={com.text} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
