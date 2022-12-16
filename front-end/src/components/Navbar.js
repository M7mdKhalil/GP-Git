import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import SearchBar from "./SearchBar";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import useFetch from "use-http";

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
                      {showUser?.username}
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
