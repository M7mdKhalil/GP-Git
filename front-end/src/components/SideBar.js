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
import { ToggleButton } from "@mui/material";

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

  const [showAddOffer, setShowAddOffer] = useState(false);

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
          
          <h4>
            Appliers
            {/* <NumOfAppliers numOfAppliers={numOfAppliers} /> */}
          </h4>

          {appliers
            ? appliers.map((applier) => (
                <div key={applier._id} className={classes.applierCard}>
                  <p>{applier.username}</p>
                  {props.offerdetails.acceptedAppliers.some(
                    (ele) => ele._id === applier._id
                  ) ? (
                    <p>accepted</p>
                  ) : props.offerdetails.regectedAppliers.some(
                      (ele) => ele._id === applier._id
                    ) ? (
                    <p>regected</p>
                  ) : (
                    <>
                      <TiUserAddOutline
                        className={classes.add}
                        onClick={() => acceptHandler(applier._id)}
                      />
                      <TiUserDeleteOutline
                        className={classes.remove}
                        onClick={() => regectHandler(applier._id)}
                      />{" "}
                    </>
                  )}
                </div>
              ))
            : ""}
          {numOfAppliers == 0 ? (
            <b style={{ color: "red" }}>There is no appliers yet</b>
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
