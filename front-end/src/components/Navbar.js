import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import SearchBar from "./SearchBar";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser } from '../store/userSlice'

const Navbar = (props) => {
<<<<<<< HEAD
  const showUser = useSelector((state) => state.user.userDetails);
    console.log('showuser', showUser);
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
    );
    const dispatch = useDispatch();
    const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
    useEffect(() => {
        dispatch(fetchUser({ userid: userid }));
    },[])
=======
  const { get, post } = useFetch("http://localhost:5000");
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");

  const [Username, setUsername, removeUsername] = useSessionStorage(
    "Username",
    ""
  );
  const [userDetails, setUserDetails] = useState({});
>>>>>>> 46474719c851c03f24d8c9943f72f76842e39a44
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
<<<<<<< HEAD
          <nav className={scrollPos < 50 ? classes.nav : classes.navScroll}>
              {islogin && <h3 className={classes.profile}>{showUser.username}</h3>}
=======
      <nav className={scrollPos < 50 ? classes.nav : classes.navScroll}>
        {islogin && (
          <h3 className={classes.profile}>
            <img
              className={classes.cardHeader}
              alt=" "
              src={props.image}
              width="70"
              height="70"
            ></img>
            {Username}
          </h3>
        )}
>>>>>>> 46474719c851c03f24d8c9943f72f76842e39a44
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
