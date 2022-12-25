import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import classes from "./offerStyleSheets/NumOfAppliers.module.css"

const NumOfAppliers = (props) => {
  return (
    <span className={classes.badge}>
      <b>{props.numOfAppliers}</b>
      <BsPeopleFill />
    </span>
  );
};

export default NumOfAppliers;
