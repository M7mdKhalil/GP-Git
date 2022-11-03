import React, { useState } from "react";
import FormFilter from "./FormFilter";
import classes from "../stylesheets/SideBar.module.css";
import Input from "./Input";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import Gg from "./Gg";
import { TiUserDeleteOutline, TiUserAddOutline } from "react-icons/ti";
import NumOfAppliers from "./offer/NumOfAppliers";

const SideBar = (props) => {
  const usel = useLocation();
  console.log(usel.pathname === "/");
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );

  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const appliers = props.list;
  const numOfAppliers = props.nAppliers;

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
          <Button
            onClick={() => {
              window.location = "/addoffer";
            }}
          >
            Add Offer
          </Button>
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
                <div className={classes.applierCard}>
                  <p>{applier.username}</p>
                  <TiUserAddOutline className={classes.add} />
                  <TiUserDeleteOutline className={classes.remove} />
                </div>
              ))
            : ""}
          {numOfAppliers == 0 ? (
            <b style={{ color: "red" }}>There is no appliers yet</b>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;
