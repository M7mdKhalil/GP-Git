import React, { useState } from "react";
import FormFilter from "./FormFilter";
import classes from "../stylesheets/SideBar.module.css";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { TiUserDeleteOutline, TiUserAddOutline } from "react-icons/ti";
import AddOffer from "./offer/AddOffer";
import { useFetch } from "use-http";
import { PrimaryButton } from "./UI/CustomButton";
import { DialogButtonToggle } from "./UI/DialogButtonToggle";
import CreateIcon from "@mui/icons-material/Create";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  SpeedDialIcon,
  ToggleButton,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HowToRegRounded from "@mui/icons-material/HowToRegRounded";
import NumOfAppliers from "./offer/NumOfAppliers";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchCompany from "./SearchCompany";

const SideBar = (props) => {
  const { post } = useFetch("http://localhost:5000");
  const usel = useLocation();
  const navigate = useNavigate();

  const [acceptState, setAcceptState] = useState("");
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );

  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const appliers = props.list;
  const numOfAppliers = props.nAppliers;
  const acceptedAppliers = props.acceptedAppliers;
  const rejectedAppliers = props.rejectedAppliers;
  const nAcceptedAppliers = acceptedAppliers?.length;
  const nRejectedAppliers = rejectedAppliers?.length;

  // toggle button handleing
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showAppliers, setShowAppliers] = useState(true);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  const length = props.offerdetails?.skills?.length;
  const acceptHandler = async (applierid) => {
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Accept Loading",
      success: "Accept successfully",
    });
    const userstate = await post("/user/acceptstate", {
      applierid,
      offerid: props.offerid,
      companyid: props.companyid,
      state: "accept",
    });
    if (userstate.ok) {
      console.log("hallooooo");
      setAcceptState("accepted succisfully");
      window.location = `/offer/${props.offerid}`;
    } else {
      setAcceptState("something went wrong");
    }
  };

  const regectHandler = async (applierid) => {
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Regect Loading",
      success: "Regect successfully",
    });
    const userstate = await post("/user/acceptstate", {
      applierid,
      offerid: props.offerid,
      companyid: props.companyid,
      state: "regect",
    });
    if (userstate.ok) {
      setAcceptState("regected succisfully");
      window.location = `/offer/${props.offerid}`;
    } else {
      setAcceptState("something went wrong");
    }
  };

  const canceledHandler = async (applierid, state) => {
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Canceled loading",
      success: "Canceled successfully",
    });
    const userstate = await post("/user/acceptstate", {
      applierid,
      offerid: props.offerid,
      companyid: props.companyid,
      state,
      cancle: "c",
    });
    if (userstate.ok) {
      setAcceptState("canceled succisfully");
      window.location = `/offer/${props.offerid}`;
    } else {
      setAcceptState("something went wrong");
    }
  };

  const strcalc = (applier) => {
    let calc = 0;
    applier?.cv?.skill?.map((skill) => {
      calc += props.offerdetails?.skills?.some(
        (ele) => ele.label === skill?.label
      )
        ? 1
        : 0;
    });
    calc = (calc / length) * 100.0;

    return parseInt(calc);
  };

  return (
    <div className={classes.container}>
          {usel.pathname === "/" && (
              <div >
        <FormFilter
className={classes.myForm}
          value={props.value}
          sValue={props.sValue}
              />
                  <SearchCompany  /></div>
      )}
      {usel.pathname === "/" && islogin && kind === "company" && (
        <div className={classes.list}>
          {/* <Button
            onClick={() => {
              setShowAddOffer(true);
            }}
          >
            Add Offer
          </Button> */}

          {showAddOffer && (
            <AddOffer
              onClose={() => {
                setShowAddOffer(false);
              }}
            />
          )}
          <PrimaryButton
            className={classes.cornerButton}
            startIcon={<SpeedDialIcon />}
            onClick={() => {
              setShowAddOffer(true);
            }}
          >
            <p>add offer</p>
          </PrimaryButton>
        </div>
      )}
      {usel.pathname === "/" && islogin && kind === "admin" && (
        <DialogButtonToggle
          icons={
            <AppRegistrationRoundedIcon
              onClick={() => {
                window.location = "/company";
              }}
            />
          }
        />
      )}
      {islogin && kind === "company" && appliers && (
        <div className={classes.myForm}>
          <ToggleButton
            value="check"
            selected={showAppliers}
            onChange={() => {
              setShowAppliers(!showAppliers);
              if (!showAppliers) {
                setShowAccepted(false);
                setShowRejected(false);
              }
            }}
            className={classes.applierHeader}
          >
            <h4>Appliers</h4>
            <NumOfAppliers numOfAppliers={numOfAppliers} />
          </ToggleButton>
          {!showAppliers && <KeyboardArrowDownRoundedIcon />}
          {showAppliers && <KeyboardArrowUpRoundedIcon />}

          <List className={classes.appliersList}>
            {appliers && showAppliers
              ? appliers
                  .sort((a, b) => {
                    return strcalc(b) - strcalc(a);
                  })
                  .map((applier) => (
                    <ListItem
                      className={classes.items}
                      sx={{ borderRaduis: "10px" }}
                      secondaryAction={
                        props.offerdetails.acceptedAppliers.some(
                          (ele) => ele._id === applier._id
                        ) ? (
                          <ListItemText className={classes.disecion}>
                            accepted
                          </ListItemText>
                        ) : props.offerdetails.regectedAppliers.some(
                            (ele) => ele._id === applier._id
                          ) ? (
                          <ListItemText className={classes.disecion}>
                            regected
                          </ListItemText>
                        ) : (
                          <section className={classes.disecion}>
                            <IconButton
                              className={classes.add}
                              onClick={() => acceptHandler(applier._id)}
                            >
                              <HowToRegRounded></HowToRegRounded>
                            </IconButton>
                            <IconButton
                              className={classes.remove}
                              onClick={() => regectHandler(applier._id)}
                            >
                              <ClearRoundedIcon></ClearRoundedIcon>
                            </IconButton>
                            {/* <TiUserAddOutline />
                    <TiUserDeleteOutline />{" "} */}
                          </section>
                        )
                      }
                      disablePadding
                    >
                      <ListItemButton
                        key={applier._id}
                        className={classes.applierCard}
                        onClick={() => {
                          navigate(`/profile/${applier._id}`);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={applier.image?.url}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>{applier.username}</ListItemText>
                        <ListItemText>
                          {strcalc(applier) === NaN && `${strcalc(applier)}%`}
                        </ListItemText>
                      </ListItemButton>
                      {strcalc(applier) <= 10 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="error"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 10 && strcalc(applier) <= 50 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="warning"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 50 && strcalc(applier) <= 75 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="primary"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 75 && strcalc(applier) <= 100 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="success"
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  ))
              : ""}
          </List>
          {numOfAppliers == 0 && showAppliers ? (
            <div>
              <b style={{ color: "red", fontSize: "14px" }}>
                Appliers list is empty
              </b>
            </div>
          ) : (
            ""
          )}
          {acceptState && <h3>{acceptState}</h3> && setAcceptState("")}
        </div>
      )}

      {/* // accepted appliers---------------------------------------------------------------------------------- */}
      {islogin && kind === "company" && acceptedAppliers && (
        <div className={classes.myForm}>
          <ToggleButton
            value="check"
            selected={showAccepted}
            onChange={() => {
              setShowAccepted(!showAccepted);
              if (!showAccepted) {
                setShowAppliers(false);
                setShowRejected(false);
              }
            }}
            className={classes.applierHeader}
          >
            <h4>Accepted Appliers</h4>
            <NumOfAppliers numOfAppliers={nAcceptedAppliers} />
          </ToggleButton>
          {!showAccepted && <KeyboardArrowDownRoundedIcon />}
          {showAccepted && <KeyboardArrowUpRoundedIcon />}

          <List className={classes.appliersList}>
            {acceptedAppliers && showAccepted
              ? acceptedAppliers
                  .sort((a, b) => {
                    return strcalc(b) - strcalc(a);
                  })
                  .map((applier) => (
                    <ListItem
                      className={classes.items}
                      sx={{ borderRaduis: "10px" }}
                      secondaryAction={
                        <section className={classes.disecion}>
                          <IconButton
                            className={classes.remove}
                            onClick={() =>
                              canceledHandler(applier._id, "accept")
                            }
                            color="error"
                            sx={{ marginTop: "-10px" }}
                          >
                            <ClearRoundedIcon></ClearRoundedIcon>
                          </IconButton>
                          {/* <TiUserAddOutline />
                    <TiUserDeleteOutline />{" "} */}
                        </section>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        key={applier._id}
                        className={classes.applierCard}
                        onClick={() => {
                          navigate(`/profile/${applier._id}`);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={applier.image?.url}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>{applier.username}</ListItemText>
                        <ListItemText>
                          {strcalc(applier) === NaN && `${strcalc(applier)}%`}
                        </ListItemText>
                      </ListItemButton>
                      {strcalc(applier) <= 10 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="error"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 10 && strcalc(applier) <= 50 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="warning"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 50 && strcalc(applier) <= 75 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="primary"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 75 && strcalc(applier) <= 100 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="success"
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  ))
              : ""}
          </List>
          {nAcceptedAppliers == 0 && showAccepted ? (
            <div>
              <b style={{ color: "red", fontSize: "14px" }}>
                Accepted appliers is empty
              </b>
            </div>
          ) : (
            ""
          )}
          {acceptState && <h3>{acceptState}</h3> && setAcceptState("")}
        </div>
      )}

      {/* // rejected appliers---------------------------------------------------------------------------------- */}
      {islogin && kind === "company" && rejectedAppliers && (
        <div className={classes.myForm}>
          <ToggleButton
            value="check"
            selected={showRejected}
            onChange={() => {
              setShowRejected(!showRejected);
              if (!showRejected) {
                setShowAccepted(false);
                setShowAppliers(false);
              }
            }}
            className={classes.applierHeader}
          >
            <h4>Rejected Appliers</h4>
            <NumOfAppliers numOfAppliers={nRejectedAppliers} />
          </ToggleButton>
          {!showRejected && <KeyboardArrowDownRoundedIcon />}
          {showRejected && <KeyboardArrowUpRoundedIcon />}
          <List className={classes.appliersList}>
            {rejectedAppliers && showRejected
              ? rejectedAppliers
                  .sort((a, b) => {
                    return strcalc(b) - strcalc(a);
                  })
                  .map((applier) => (
                    <ListItem
                      className={classes.items}
                      sx={{ borderRaduis: "10px" }}
                      secondaryAction={
                        <IconButton
                          onClick={() => canceledHandler(applier._id, "regect")}
                          color="error"
                          sx={{ marginTop: "-10px" }}
                        >
                          <ClearRoundedIcon></ClearRoundedIcon>
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        key={applier._id}
                        className={classes.applierCard}
                        onClick={() => {
                          navigate(`/profile/${applier._id}`);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={applier.image?.url}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>{applier.username}</ListItemText>
                        <ListItemText>
                          {strcalc(applier) === NaN && `${strcalc(applier)}%`}
                        </ListItemText>
                      </ListItemButton>
                      {strcalc(applier) <= 10 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="error"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 10 && strcalc(applier) <= 50 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="warning"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 50 && strcalc(applier) <= 75 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="primary"
                        />
                      ) : (
                        ""
                      )}
                      {strcalc(applier) > 75 && strcalc(applier) <= 100 ? (
                        <LinearProgress
                          className={classes.linearProgress}
                          variant="determinate"
                          value={strcalc(applier)}
                          color="success"
                        />
                      ) : (
                        ""
                      )}
                    </ListItem>
                  ))
              : ""}
          </List>
          {nRejectedAppliers == 0 && showRejected ? (
            <div>
              <b style={{ color: "red", fontSize: "14px" }}>
                Rejected appliers is empty
              </b>
            </div>
          ) : (
            ""
          )}
          {acceptState && <h3>{acceptState}</h3> && setAcceptState("")}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SideBar;
