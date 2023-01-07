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
import Profile from "./components/Profile";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextEditor from "./components/UI/TextEditor";
import CreateCompany from "./components/login&register/CreateCompany";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/company" element={<CreateCompany />}></Route>
        <Route path="/offer/:id" element={<OfferDetails />}></Route>
        {/* <Route path="/addoffer" element={<AddOffer />}></Route> */}
        <Route path="/editoffer/:id" element={<EditOffer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
