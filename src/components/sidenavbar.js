import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PhotoIcon from "@mui/icons-material/Photo";
import InfoIcon from "@mui/icons-material/Info";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* Menu Button */}
      <IconButton onClick={toggleDrawer(true)} sx={{ position: "absolute", top: 20, left: 20 }}>
        <MenuIcon />
      </IconButton>

      {/* Side Navbar Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemIcon><PhotoIcon /></ListItemIcon>
              <ListItemText primary="Mars Photos" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
