import React, { useState } from "react";
import classes from "../stylesheets/Card.module.css";
import { useSessionStorage } from "react-use-storage";
import NumOfAppliers from "./offer/NumOfAppliers";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useFetch } from "use-http";

const Card = (props) => {
  const {del} =useFetch(
    "http://localhost:5000"
  );
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const numOfAppliers = props.length;
  const id = props._id;

  const DeleteOfferHandler = async()=>{
    const _id = props._id;
  await del(`/offer/${_id}`);
  window.location='/';
  }

  return (
    <div className={classes.container}>
      <div className={classes.cardHeader}></div>
      <div className={classes.cardBody}>
        {islogin&&userid===props.author._id &&
        <div className={classes.deleteIcon} onClick={DeleteOfferHandler}>
          <MdOutlineDeleteOutline />
        </div>}
        
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
