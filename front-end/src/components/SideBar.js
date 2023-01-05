import React, { useState } from "react";
import FormFilter from "./FormFilter";
import classes from "../stylesheets/SideBar.module.css";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { TiUserDeleteOutline, TiUserAddOutline } from "react-icons/ti";
import AddOffer from "./offer/AddOffer";
import { useFetch } from "use-http";
import { PrimaryButton } from "./UI/CustomButton";
import { DialogButtonToggle } from "./UI/DialogButtonToggle";
import CreateIcon from "@mui/icons-material/Create";
import { Avatar, IconButton, ToggleButton } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HowToRegRounded from "@mui/icons-material/HowToRegRounded";
import NumOfAppliers from "./offer/NumOfAppliers";

const SideBar = (props) => {
  const { post } = useFetch("http://localhost:5000");
  const usel = useLocation();

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
          <DialogButtonToggle
            icons={
              <CreateIcon
                onClick={() => {
                  setShowAddOffer(true);
                }}
              />
            }
          />
        </div>
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
            <h4 className={classes.applierHeader}>
              Appliers
              <NumOfAppliers numOfAppliers={numOfAppliers} />
            </h4>
          </ToggleButton>
          {!showAppliers && <KeyboardArrowDownRoundedIcon />}
          {showAppliers && <KeyboardArrowUpRoundedIcon />}

          {appliers && showAppliers
            ? appliers.map((applier) => (
                <div key={applier._id} className={classes.applierCard}>
                  <Avatar src={applier.image?.url}></Avatar>
                  <p>{applier.username}</p>
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
