import React, { useState, useEffect } from "react";
import classes from "../stylesheets/Navbar.module.css";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/userSlice";
import Notification from "./Notification";
import { BsBellFill } from "react-icons/bs";
import styles from "../stylesheets/Notification.module.css";
import { useFetch } from "use-http";
import { TextButton } from "./UI/CustomButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const Navbar = (props) => {
  const { post } = useFetch("http://localhost:5000");
  const dispatch = useDispatch();
  const showUser = useSelector((state) => state.user.userDetails);
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [read, setRead] = useState(false);
  var box = document.getElementById("box");
  var down = false;
  function toggleNotifi() {
    if (down) {
      post("/user/newnot", { kind: showUser?.kind, _id: showUser?._id });
      setRead(true);
      box.style.height = "0px";
      box.style.display = "none";
      down = false;
    } else {
      box.style.height = "510px";
      box.style.display = "block";
      down = true;
    }
  }
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(fetchUser({ userid: userid }, { signal }));
    return () => {
      controller.abort();
    };
  }, [userid]);
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

  const calcCounter = (showUser) => {
    let counter = 0;
    if (read === true) {
      return 0;
    } else {
      for (let i = 0; i < showUser?.notification?.length; i++) {
        if (showUser?.notification[i]?.new === true) {
          counter++;
        }
      }
      return counter;
    }
  };

  return (
    <div className={classes.header}>
      <nav className={classes.nav}>
              {islogin && (
                  <div className={classes.profile} onClick={() => { window.location='/profile' }}>
            {/* <img
              className={classes.cardHeader}
              alt=" "
              src={showUser?.image?.url}
              width="30"
              height="30"
            ></img>
            <h4>{showUser?.username}</h4> */}
            <Chip
              avatar={
                <Avatar className={classes.avatar}
                  alt={<Avatar >HH</Avatar>}
                  src={showUser?.image?.url}
                />
              }
              label={showUser?.username}
              variant="outlined"
              className={classes.chip}
            />
            <div className={styles["icon"]} onClick={toggleNotifi}>
              {calcCounter(showUser) > 0 ? (
                <Badge
                  color="secondary"
                  badgeContent={calcCounter(showUser)}
                  max={99}
                  // variant="dot"
                >
                  <NotificationsRoundedIcon className={styles.notifyIcon} />
                </Badge>
              ) : (
                <NotificationsNoneRoundedIcon />
              )}

              {/* {calcCounter(showUser) > 0 ? (
                <span>{calcCounter(showUser)}</span>
              ) : (
                ""
              )} */}
            </div>
            <div className={styles["notifi-box"]} id="box">
              <h2>
                <span>{calcCounter(showUser)}</span> Notification
              </h2>
              {showUser?.notification?.map((notifi, k) => (
                <div
                  key={k}
                  className={styles["notifi-item"]}
                  onClick={() => {
                    window.location = `/offer/${notifi.offerid}`;
                  }}
                >
                  <img
                    src={
                      showUser?.kind === "user"
                        ? notifi.companyimg
                        : showUser?.kind === "company"
                        ? notifi.applierimg
                        : ""
                    }
                  />
                  <div
                    className={notifi.new === true ? styles.text1 : styles.text}
                  >
                    <p>{notifi.msg}</p>
                  </div>
                </div>
              ))}
            </div>{" "}
          </div>
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
            <>
              {/* <Button className={classes.loginButton}>Logout</Button> */}
              <TextButton
                onClick={() => {
                  setislogin(false);
                  window.location = "/login";
                }}
              >
                logout
              </TextButton>
            </>
          )}
        </div>
      </nav>

      {/* <h3>{scrollPos}</h3> */}
    </div>
  );
};

export default Navbar;
