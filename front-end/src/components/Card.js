import React, { useState } from "react";
import classes from "../stylesheets/Card.module.css";
import { useSessionStorage } from "react-use-storage";
import NumOfAppliers from "./offer/NumOfAppliers";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useFetch } from "use-http";
import DeleteOffer from "./offer/DeleteOffer";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";
import { useSelector } from "react-redux";

const Card = (props) => {
  const showUser = useSelector((state) => state.user.userDetails);
  const { del } = useFetch("http://localhost:5000");
  const navigate = useNavigate();
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const numOfAppliers = props.length;
  const id = props._id;

  const [deleteOfferShow, setDeleteOfferShow] = useState(false);

  const DeleteOfferCloseHandler = () => {
    setDeleteOfferShow(false);
    };

  const DeleteOfferShowHandler = () => {
    setDeleteOfferShow(true);
  };

  const DeleteOfferHandler = async () => {
    const _id = props._id;
    const deleteoffer =await del(`/offer/delete/${_id}`);
    window.location="/";
  };
  // console.log(props.image)
  return (
    <div className={classes.container}>
          {props.image ? (
              <img 
                  className={classes.cardHeader}
                  src={props.image}
                  width="70"
                  height="70"
                  //onClick={window.location = `/intro/${props._id}`}
        ></img>
      ) : props.cardImage ? (
        <Avatar></Avatar>
      ) : (
        ""
      )}
      <div className={classes.cardBody}>
        <Chip
          size="small"
          label={props.available ? "open" : "closed"}
          sx={{
            color: `${props.available ? "green" : "red"}`,
            borderColor: `${props.available ? "green" : "red"}`,
            textTransform: "uppercase",
          }}
          variant="outlined"
          className={classes.available}
        />
        {islogin &&
          (userid === props.author._id || showUser?.kind === "admin") && (
            <div
              className={classes.deleteIcon}
                      onClick={DeleteOfferHandler}
            >
              <MdOutlineDeleteOutline />
            </div>
          )}
        {islogin &&
          (userid === props.author._id || showUser?.kind === "admin") && (
            <button
              onClick={() => {
                navigate(`/editoffer/${id}`);
              }}
            >
              {/* <img src="icons8-edit.gif" /> */}
              <ion-icon name="pencil-outline"></ion-icon>
            </button>
          )}
        <div className={classes.cardInfo} onClick={props.onClick}>
          <h4 className={classes.title}>{props.title}</h4>
          <h4 className={classes.location}>{props.location}</h4>
          <h4 className={classes.author}>{props.author.username}</h4>

          <div className={classes.footer}>
            <p>{props.date}</p>
            <NumOfAppliers numOfAppliers={numOfAppliers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
