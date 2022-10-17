import React, { useState } from "react";
import FormFilter from "./FormFilter";
import classes from "../stylesheets/SideBar.module.css";
import Input from "./Input";

const SideBar = (props) => {
  return (
    <div className={classes.container}>
      <FormFilter className={classes.myForm} value={props.value} sValue={props.sValue} />
    </div>
  );
};

export default SideBar;
