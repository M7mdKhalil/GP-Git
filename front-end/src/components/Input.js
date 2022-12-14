import React, { useState } from "react";
import classes from "../stylesheets/Input.module.css";

const Input = (props) => {


  return (
    <>
      <label className={classes.inputLabel}>{props.label}</label>
      <input
        className={classes.textInput}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
      />
    </>
  );
};

export default Input;
