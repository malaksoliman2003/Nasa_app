import React, { useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";

const EPIC = () => {
  const [date, setDate] = useState(dayjs()); // Default to today's date
  const [EPICData, setEPICData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEPIC = async (selectedDate) => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const year = selectedDate.format("YYYY");
    const month = selectedDate.format("MM");
    const day = selectedDate.format("DD");

    const API_KEY = "DEMO_KEY"; // Replace with your NASA API key
    const url = `https://api.nasa.gov/EPIC/api/natural/date/${formattedDate}?api_key=${API_KEY}`;

    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await axios.get(url);

      if (response.data.length === 0) {
        setError("No images available for this date.");
        setEPICData(null);
      } else {
        setEPICData(response.data);
      }
    } catch (error) {
      setError("Error fetching EPIC data. Please try again.");
      console.error("Error fetching EPIC data:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {/* Date Picker */}
   <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
             value={date}
             onChange={(newDate) => setDate(newDate)}
             disableFuture
             sx={{
               width: "250px", mt :1,
               "& .MuiOutlinedInput-root": {
                 borderRadius: "10px",
                 fontSize: "18px",
                 color: "white",
                 fontWeight: "bold", fontStyle:"italic",
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

        <Button
             variant="contained"
             sx={{
               mt: 2, ml : 5,
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
             onClick={() => fetchEPIC(date)}
           >
             🚀 Get EPIC
           </Button>

      {/* Display Loading and Error Messages */}
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {error && (
        <Typography sx={{ mt: 2, color: "red", fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      {/* Display EPIC Data */}
      {EPICData && (
        <motion.div
          initial={{ opacity: 0, y: 30 }} // Start invisible and slightly lower
          animate={{ opacity: 1, y: 0 }} // Fade in and move up
          transition={{ duration: 1.5, ease: "easeOut" }} // Smooth effect
        >
          {EPICData.map((imageData, index) => {
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date.format(
              "YYYY/MM/DD"
            )}/png/${imageData.image}.png`;

            return (
              <Card key={index} sx={{ mt: 3, maxWidth: 700, margin: "auto", p: 2 }}>
                <Typography variant="h5">EPIC Image - {date.format("YYYY-MM-DD")}</Typography>
                <Typography variant="body1" sx={{ mt: 1, fontFamily: "Times New Roman" }}>
                  {imageData.caption}
                </Typography>
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt="EPIC Earth Image"
                  sx={{ mt: 2, borderRadius: 2 }}
                />
              </Card>
            );
          })}
        </motion.div>
      )}
    </Box>
  );
};

export default EPIC;
