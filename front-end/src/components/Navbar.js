import React from "react";
import classes from "../stylesheets/Navbar.module.css";

const Navbar = () => {
    
  return (
    <div className={classes.header}>
      <nav className={classes.nav}>
        <h1>HireHub</h1>
      </nav>
    </div>
  );
};

export default Navbar;
