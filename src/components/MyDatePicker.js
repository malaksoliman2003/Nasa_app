import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs"; // ✅ Ensure you import dayjs


const MyDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs()); // ✅ Use dayjs() as the initial value
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker

  value={selectedDate}
  onChange={(newValue) => setSelectedDate(newValue)}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px", // Rounded borders
      fontSize: "18px", // Bigger text
      color: "blue", // Text color
      "& fieldset": { borderColor: "Black" }, // Border color
      "&:hover fieldset": { borderColor: "Blue" }, // Hover effect
      backgroundColor:"white",
      justifyContent : "center",
      alignItems : "center"

    },
  }}
  renderInput={(params) => <TextField {...params} />}
/>

    </LocalizationProvider>
  );
};

export default MyDatePicker;

