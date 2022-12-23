import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser } from '../store/userSlice'
import Notification from './Notification'
import { BsBellFill } from "react-icons/bs";
import styles from "../stylesheets/Notification.module.css";


const Navbar = (props) => {
    const dispatch = useDispatch();
  const showUser = useSelector((state) => state.user.userDetails);
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
    );
    const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(fetchUser({ userid: userid }, { signal }));
        return () => {
            controller.abort();
        }
    }, [userid])
  const [scrollPos, setScrollPos] = useState(0);
    const handleScroll = () => {
    const pos = window.pageYOffset;
    setScrollPos(pos);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userdetail = await get(`/user/${userid}`);
  //     setUserDetails(userdetail);
  //     // console.log(userdetail)
  //   };
  //   fetchData();
  // }, []);
    useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    }, []);

  return (
    <div className={classes.header}>
          <nav className={scrollPos < 50 ? classes.nav : classes.navScroll}/>
              {islogin && <h3 className={classes.profile}></h3>}
      <nav className={scrollPos < 50 ? classes.nav : classes.navScroll}>
        {islogin && (
          <h3 className={classes.profile}>
            <img
              className={classes.cardHeader}
                          alt=" "
                          src={showUser?.image?.url}
              width="30"
              height="30"
                      ></img>
                      {showUser?.username}
                      <div onClick={Notification} className={styles['icon']}>
                          <img src='data:image/png;base64,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' /><span>7</span></div>
                  </h3>
            
        )}
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
          {/* <h3>{scrollPos}</h3> */}
    </div>
  );
};

export default Navbar;
