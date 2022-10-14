import React from "react";
import classes from "../stylesheets/Card.module.css";

const Card = (props) => {
  return <div className={classes.container} onClick={props.onClick}>
    <div className={classes.cardHeader}>
        <h3>{props.title}</h3>
    </div>
    <div className={classes.cardBody}>
      <div className={classes.title}>{}{props.title}</div>
    </div>
  </div>;
};

export default Card;
