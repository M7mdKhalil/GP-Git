import React, { useState, useEffect } from "react";
import {Route, Routes} from 'react-router-dom'
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Login from "./components/login&register/Login";
import Register from "./components/login&register/Register";
import OfferDetails from "./components/offer/OfferDetails";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
      
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home/>}></Route>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/register"  element={<Register/>}></Route>
        <Route path="/offer/:id"  element={<OfferDetails/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
