import React from "react";
import classes from "../stylesheets/Input.module.css";

const Input = (props) => {
    return <input className={classes.textInput} type={props.type} value={props.value} onChange={props.onChange}/>
}

export default Input;