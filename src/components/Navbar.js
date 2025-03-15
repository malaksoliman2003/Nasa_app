import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, TextField, Button , Box } from "@mui/material";
import { Home, Camera, Explore, Public, Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TerrainIcon from "@mui/icons-material/Terrain";

const TopNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const routes = {
    apod: "/APOD",
    home: "/",
    mars_rover_photos: "/Mars",
    epic: "/EPIC",
    neo: "/Neo",
    geometric_storm:"/Geometric"
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      let query = searchQuery.toLowerCase().trim().replace(/\s+/g, "_"); // Replace spaces with underscores
  
      if (routes[query]) {
        navigate(routes[query]); // Navigate to the corresponding route
      } else {
        alert("Page not found!");
      }
      setSearchQuery("");
    }
  };
  

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black
        padding: "5px 20px", 
        width: "100vw",  // Full width
        backdropFilter: "blur(10px)", // Blur effect for transparency
        boxShadow: "none" // Remove default shadow
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Menu Icon */}
        <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
  <RocketLaunchIcon sx={{ color: "white", fontSize: 70, mr: 1 }} />  
  <Typography 
    variant="h6" 
    sx={{ color: "white", fontWeight: "bold", fontFamily: "Times New Roman" , fontSize:"70px" }}
  >
    NASA Exploration
  </Typography>
</Box>

        {/* Search Box */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
            color: "white",
            width: "400px",  // Increase width
            height: "50px",  // Increase height
            "& .MuiInputBase-root": { height: "50px" } ,// Ensures input expands
            borderRadius: "5px",
            input: { padding: "5px 10px", color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "#ccc" },
            }
          }}
        />

        {/* Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            <Home sx={{ marginRight: 1 }} /> Home
          </MenuItem>
          <MenuItem component={Link} to="/APOD" onClick={handleMenuClose}>
            <Camera sx={{ marginRight: 1 }} /> APOD
          </MenuItem>
          <MenuItem component={Link} to="/Mars" onClick={handleMenuClose}>
            <Explore sx={{ color:"green",marginRight: 1 }} /> Mars Rover
          </MenuItem>
          <MenuItem component={Link} to="/EPIC" onClick={handleMenuClose}>
            <Public sx={{color : "blue" ,marginRight: 1 }} /> EPIC
          </MenuItem>
          <MenuItem component={Link} to="/Neo" onClick={handleMenuClose}>
          <TerrainIcon sx={{ color: "", fontSize: 30, mr: 1 }} />Neo
          </MenuItem>
          
        </Menu>

       
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
