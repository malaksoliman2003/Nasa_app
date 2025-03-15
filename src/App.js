import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Mars from "./components/Mars";
import APOD from "./components/APOD";
import EPIC from "./components/EPIC";
import Neo from "./components/NEO";
import Home from "./components/Home"; // Import your actual Home component
import GeoStorm from "./components/GeoStorm";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/APOD" element={<APOD />} />
        <Route path="/Geometric" element={<GeoStorm />} />
        <Route path="/Mars" element={<Mars />} />       
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/EPIC" element = {<EPIC/>}/>
        <Route path = "/NEO" element = {<Neo/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
