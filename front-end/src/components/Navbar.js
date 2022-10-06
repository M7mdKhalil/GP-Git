import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const handleScroll = () => {
    const pos = window.pageYOffset;
    setScrollPos(pos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.header}>
      <nav className={scrollPos < 50 ? classes.nav : classes.navScroll}>
        <h1>HireHub</h1>
      </nav>
      <div className={scrollPos < 50 && classes.bar}>
        <div className={scrollPos > 50 && classes.search}>
          <SearchBar />
        </div>
        <div className={scrollPos < 50 ? classes.log : classes.scrollLog}>
          <a className={classes.loginButton}>Login</a>
          <a className={classes.registerButton}>Register</a>
        </div>
      </div>

      {/* <h3>{scrollPos}</h3> */}
    </div>
  );
};

export default Navbar;
