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
import { Avatar, IconButton, SpeedDialIcon, ToggleButton } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HowToRegRounded from "@mui/icons-material/HowToRegRounded";
import NumOfAppliers from "./offer/NumOfAppliers";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";

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

  // toggle button handleing
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [showAppliers, setShowAppliers] = useState(false);
  const length = props.offerdetails?.skills?.length;
  const acceptHandler = async (applierid) => {
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

  const strcalc = (applier) => {
    let calc = 0;
    applier?.cv?.skill?.map((skill) => {
      calc += props.offerdetails?.skills?.some(
        (ele) => ele.label === skill?.label
      )
        ? 1
        : 0;
    });
    calc = (calc / length) * 100;
    return calc;
  };

  return (
    <div className={classes.container}>
      {usel.pathname === "/" && (
        <FormFilter
          className={classes.myForm}
          value={props.value}
          sValue={props.sValue}
        />
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
                window.location = "/company"
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
            }}
          >
            <h4 className={classes.applierHeader}>Appliers</h4>
            <NumOfAppliers numOfAppliers={numOfAppliers} />
          </ToggleButton>
          {!showAppliers && <KeyboardArrowDownRoundedIcon />}
          {showAppliers && <KeyboardArrowUpRoundedIcon />}

          {appliers && showAppliers
            ? appliers
                .sort((a, b) => {
                  return strcalc(b) - strcalc(a);
                })
                .map((applier) => (
                  <div key={applier._id} className={classes.applierCard}>
                    <Avatar src={applier.image?.url}></Avatar>
                    <p>{applier.username}</p>
                    <p>{strcalc(applier)}%</p>
                    {props.offerdetails.acceptedAppliers.some(
                      (ele) => ele._id === applier._id
                    ) ? (
                      <p className={classes.disecion}>accepted</p>
                    ) : props.offerdetails.regectedAppliers.some(
                        (ele) => ele._id === applier._id
                      ) ? (
                      <p className={classes.disecion}>regected</p>
                    ) : (
                      <div className={classes.disecion}>
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
                      </div>
                    )}
                  </div>
                ))
            : ""}
          {numOfAppliers == 0 && showAppliers ? (
            <div>
              <b style={{ color: "red" }}>There is no appliers yet</b>
            </div>
          ) : (
            ""
          )}
          {acceptState && <h3>{acceptState}</h3> && setAcceptState("")}
        </div>
      )}
    </div>
  );
};

export default SideBar;
