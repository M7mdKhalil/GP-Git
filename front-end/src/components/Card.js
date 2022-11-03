import React, { useState } from "react";
import classes from "../stylesheets/Card.module.css";
import { useSessionStorage } from "react-use-storage";
import NumOfAppliers from "./offer/NumOfAppliers";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Card = (props) => {
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const numOfAppliers = props.length;
  const id = props._id;

  return (
    <div className={classes.container}>
      <div className={classes.cardHeader}></div>
      <div className={classes.cardBody}>
        <div className={classes.deleteIcon}>
          <MdOutlineDeleteOutline />
        </div>
        {islogin && userid === props.author._id && (
          <button
            onClick={() => {
              window.location = `/editoffer/${id}`;
            }}
          >
            {/* <img src="icons8-edit.gif" /> */}
            <ion-icon name="pencil-outline"></ion-icon>
          </button>
        )}
        <div onClick={props.onClick}>
          <h4 className={classes.title}>{props.title}</h4>
          <h4 className={classes.location}>{props.location}</h4>
          <h4 className={classes.author}>{props.author.username}</h4>
          <p className={classes.footer}>
            {props.date}
            <NumOfAppliers numOfAppliers={numOfAppliers} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
