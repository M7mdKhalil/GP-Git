import React from "react";
import classes from "../stylesheets/Button.module.css";

const Button = (props) => {
  return (
    <a
      className={`${classes.button} ${props.className}`}
      href={props.href}
      onClick={props.onClick}
    >
      <ion-icon name={props.name}></ion-icon>
      {props.children}
    </a>
  );
};

export default Button;
