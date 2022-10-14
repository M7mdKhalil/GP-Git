import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import SearchBar from "./SearchBar";
import {useSessionStorage} from 'react-use-storage'
const Navbar = () => {
  const [islogin,setislogin,removeislogin]=useSessionStorage('islogin',false);
  const [Username,setUsername,removeUsername]=useSessionStorage('Username','');
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
        <h1><a href="/">HireHub</a></h1>
      </nav>
      <div className={scrollPos < 50 && classes.bar}>
        <div className={scrollPos > 50 && classes.search}>
          <SearchBar />
        </div>
        <div className={scrollPos < 50 ? classes.log : classes.scrollLog}>
          <h3>hi {Username}</h3>
          {!islogin && <>
          <a className={classes.loginButton} href='/login'>Login</a>
          <a className={classes.registerButton} href='/register'>Register</a></>}
          {islogin&& <a className={classes.loginButton} href='/login' onClick={()=>{setislogin(false)}}>Logout</a> }
        </div>
      </div>

      {/* <h3>{scrollPos}</h3> */}
    </div>
  );
};

export default Navbar;
