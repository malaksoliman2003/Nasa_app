import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box, Button, Card, CardMedia, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const APOD = () => {
  const [date, setDate] = useState(dayjs()); // Default to today's date
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAPOD = async (selectedDate) => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const API_KEY = "DEMO_KEY"; // Replace with your NASA API key
    const url = `https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${API_KEY}`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      setApodData(response.data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 4,
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: apodData ? `url(${apodData.url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
        padding: "20px",
      }}
    >
      {/* Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          disableFuture
          sx={{
            width: "250px",
            mt: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontSize: "18px",
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
              background: "rgba(255, 255, 255, 0.2)", // Glass effect
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0px 0px 10px rgba(0, 0, 255, 0.2)", // Soft glow effect
              transition: "0.3s",
              "& fieldset": { borderColor: "white" },
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 0px 15px rgba(0, 0, 255, 0.5)",
              },
            },
          }}
        />
      </LocalizationProvider>

      {/* Get APOD Button */}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          ml: 5,
          borderRadius: "20px",
          padding: "12px 25px",
          background: "linear-gradient(45deg, #1E90FF, #0000CD)",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          color: "white",
          boxShadow: "0px 5px 15px rgba(30, 144, 255, 0.5)",
          transition: "0.3s",
          "&:hover": {
            background: "linear-gradient(45deg, #0000CD, #1E90FF)",
            transform: "scale(1.05)",
            boxShadow: "0px 5px 25px rgba(30, 144, 255, 0.8)",
          },
        }}
        onClick={() => fetchAPOD(date)}
      >
        🚀 Get APOD
      </Button>

      {/* Display APOD Data */}
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {apodData && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Card
            sx={{
              mt: 3,
              maxWidth: 700,
              margin: "auto",
              p: 2,
              borderRadius: "12px",
              boxShadow: "0px 0px 15px rgba(0, 0, 255, 0.3)",
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent for readability
              color: "white",
            }}
          >
            <Typography variant="h5">{apodData.title}</Typography>
            <Typography variant="body1" sx={{ mt: 1, fontFamily: "Times New Roman" }}>
              {apodData.explanation}
            </Typography>
            <CardMedia
              component="img"
              image={apodData.url}
              alt={apodData.title}
              sx={{ mt: 2, borderRadius: 2 }}
            />
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default APOD;
