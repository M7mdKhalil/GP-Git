import React from "react";
import classes from "../stylesheets/Card.module.css";

const Card = (props) => {
  return <div className={classes.container} onClick={props.onClick}>
    <div className={classes.cardHeader}>
    </div>
    <div className={classes.cardBody}>
      <h4 className={classes.title}>{props.title}</h4>
      <h4 className={classes.location}>{props.location}</h4>
      <h4 className={classes.author}>{props.author}</h4>
      <p className={classes.date}>{props.date}</p>
    </div>
  </div>;
};

export default Card;
