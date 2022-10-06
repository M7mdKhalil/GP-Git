import React, { useState, useEffect } from "react";
import logo from "./myLogo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Card from "./components/Card";
import SideBar from "./components/SideBar";

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
      <div className="main-content">
        <SideBar/>

        <Container>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Container>
        {/* <p>{!data ? "Loading..." : data}</p> */}
      </div>
    </div>
  );
}

export default App;
