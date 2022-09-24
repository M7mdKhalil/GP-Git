import React from "react";
import classes from "../stylesheets/Card.module.css";

const Card = () => {
  return <div className={classes.container}>
    <div className={classes.cardHeader}>
        <h3></h3>
    </div>
    <div className={classes.cardBody}>
      <div className={classes.title}>QA Engineer</div>
    </div>
  </div>;
};

export default Card;
