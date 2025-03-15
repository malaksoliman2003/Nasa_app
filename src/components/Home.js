import React from "react";
import { motion } from "framer-motion";
import { Typography, Box, Card } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        mt: -1,
        display: "flex",
        alignItems: "center",
        height: "100vh",
        background: "url('https://source.unsplash.com/1600x900/?space,galaxy') center/cover", // Space-themed background
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Card
          sx={{
            mt : -2,
            maxWidth: 700,
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent effect
            backdropFilter: "blur(20px)", // Frosted glass effect
            borderRadius: "16px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)", // Soft shadow
            textAlign: "center",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.3)", // Soft border for visibility
          }}
        >
          <Typography
            variant="h4"
            sx={{
              
              fontSize: "20px",
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1px",
              lineHeight: "1.5",
            }}
          >
            🚀 Welcome to NASA Exploration!
Discover the wonders of space with NASA’s most fascinating missions and discoveries. From breathtaking images of distant galaxies to the latest updates on Mars exploration, we bring you closer to the universe than ever before.<br></br>

🌍 Explore Earth’s beauty through EPIC images.<br></br>
🪐 Uncover the secrets of Mars with real-time rover data.<br></br>
☄️ Track asteroids and near-Earth objects in space.<br></br>
✨ Enjoy the Astronomy Picture of the Day (APOD) and learn something new every day.<br></br>

<span style={{ fontSize: "25px" , fontweight : "bold"}}>Join us on this incredible journey beyond the stars! 🌠</span>

          </Typography>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Home;
