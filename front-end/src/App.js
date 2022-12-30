import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/login&register/Login";
import Register from "./components/login&register/Register";
import OfferDetails from "./components/offer/OfferDetails";
import AddOffer from "./components/offer/AddOffer";
import EditOffer from "./components/offer/EditOffer";
import Modal from "./components/UI/Modal";
import PageNotFound from "./components/error/PageNotFound";
import Profile from './components/Profile';

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


      <Navbar />

      <Routes>
        <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/offer/:id" element={<OfferDetails />}></Route>
        {/* <Route path="/addoffer" element={<AddOffer />}></Route> */}
        <Route path="/editoffer/:id" element={<EditOffer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
