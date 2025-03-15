import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

export const Searchbar = () => {
  const [input, setInput] = useState("");

  return (
    <div 
      style={{
        display: "flex",
        justifyContent : "flex-start",  // Centers horizontally
        alignItems: "center",  // Centers vertically
        height: "100vh",  // Full screen height
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "300px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};
