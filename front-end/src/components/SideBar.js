import React from "react";
import classes from "../stylesheets/SideBar.module.css";
import Input from "./Input";

const SideBar = (props) => {
  return (
    <div className={classes.container}>
      <section>
        <h3>Filter</h3>
        <Input/>
        <Input/>
        <Input/>
      </section>
    </div>
  );
};

export default SideBar;
