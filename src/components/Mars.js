import React, { useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box, Button, Card, CardMedia, Typography, CircularProgress } from "@mui/material";

const Mars = () => {
  const [date, setDate] = useState(dayjs()); // Default to today
  const [marsData, setMarsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMarsPhotos = async () => {
    const formattedDate = date.format("YYYY-MM-DD");
    const API_KEY = "DEMO_KEY"; // Replace with your NASA API key
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${API_KEY}`;

    setLoading(true);
    setError("");
    setMarsData([]);

    try {
      const response = await axios.get(url);

      if (response.data.photos.length === 0) {
        setError("No photos found for this date. Try another date!");
      } else {
        setMarsData(response.data.photos);
      }
    } catch (error) {
      setError("Error fetching data. Please check your API key or try later.");
      console.error("Error fetching Mars data:", error);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>

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
              onClick={() => fetchMarsPhotos(date)}
            >
              🚀 Get Mars
            </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {error && (
        <Typography sx={{ mt: 2, color: "red", fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      {marsData.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 3 }}>
          {marsData.map((photo) => (
            <Card key={photo.id} sx={{ maxWidth: 300, m: 2, p: 2 }}>
              <CardMedia
                component="img"
                image={photo.img_src}
                alt="Mars Rover Image"
                sx={{ borderRadius: 2 }}
              />
              <Typography variant="body2">Camera: {photo.camera.full_name}</Typography>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Mars;
