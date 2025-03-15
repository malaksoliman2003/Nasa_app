import React, { useState } from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";

const Neo = () => {
  const [date1, setDate1] = useState(dayjs());
  const [date2, setDate2] = useState(dayjs());
  const [NEOData, setNEOData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const fetchNeo = async (selectedDate1, selectedDate2) => {
    const formattedDate1 = selectedDate1.format("YYYY-MM-DD");
    const formattedDate2 = selectedDate2.format("YYYY-MM-DD");
    const API_KEY = "DEMO_KEY"; // Replace with your NASA API key
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate1}&end_date=${formattedDate2}&api_key=${API_KEY}`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      const allNEO = Object.values(response.data.near_earth_objects).flat();
      setNEOData(allNEO);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error fetching NEO:", error);
      setNEOData([]);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(NEOData.length / itemsPerPage);
  const displayedData = NEOData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
       <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" , mt:1 }}>
    Select Start Date:
     </Typography>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date1}
                onChange={(newDate) => setDate1(newDate)}
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
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" , mt:1 }}>
    Select End Date:
     </Typography>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date2}
                onChange={(newDate) => setDate2(newDate)}
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
            <br></br>
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
             onClick={() => fetchNeo(date1,date2)}
           >
             🚀 Get NEO
           </Button>

      
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}

      {displayedData.length > 0 && (
        <Box sx={{ mt: 3, mx: "auto", width: "80%" }}>
          {displayedData.map((neo) => (
            <Box key={neo.id} sx={{ mb: 3, p: 2, border: "1px solid gray", borderRadius: "10px" , backgroundColor:"white"}}>
              <Typography variant="h6">🚀 Name: {neo.name}</Typography>
              <Typography>📏 Diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</Typography>
              <Typography>💨 Velocity: {neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour} km/h</Typography>
              <Typography>🌍 Miss Distance: {neo.close_approach_data[0]?.miss_distance.kilometers} km</Typography>
              <Typography>⚠️ Hazardous: {neo.is_potentially_hazardous_asteroid ? "Yes 🚨" : "No ✅"}</Typography>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>
              ⬅️ Previous
            </Button>
            <Typography sx={{ mx: 2 }}>Page {currentPage + 1} of {totalPages}</Typography>
            <Button disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)}>
              Next ➡️
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Neo;
