import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import SearchBar from "./SearchBar";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";

const Navbar = () => {
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [Username, setUsername, removeUsername] = useSessionStorage(
    "Username",
    ""
  );
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
        <h1>
          <a href="/">HireHub</a>
        </h1>
        <div className={classes.scrollLog}>
          {!islogin && (
            <>
              <Button className={classes.loginButton} href="/login">
                Login
              </Button>
              <Button className={classes.registerButton} href="/register">
                Register
              </Button>
            </>
          )}
          {islogin && (
            <Button
              className={classes.loginButton}
              href="/login"
              onClick={() => {
                setislogin(false);
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
      {islogin && <h3>Hi, {Username}</h3>}

      {/* <h3>{scrollPos}</h3> */}
    </div>
  );
};

export default Navbar;
