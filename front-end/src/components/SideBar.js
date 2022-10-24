import React, { useState } from "react";
import FormFilter from "./FormFilter";
import classes from "../stylesheets/SideBar.module.css";
import Input from "./Input";
import { useSessionStorage } from "react-use-storage";
import Button from "./Button";

const SideBar = (props) => {
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [kind, setkind, removekind] = useSessionStorage("kind", false);

  return (
    <div className={classes.container}>
      <FormFilter
        className={classes.myForm}
        value={props.value}
        sValue={props.sValue}
      />
      {islogin && kind === "company" && (
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
    </div>
  );
};

export default SideBar;
