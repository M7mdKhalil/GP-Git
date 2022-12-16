import React from "react";
import useFetch from "use-http";
import Button from "../Button";
import Modal from "../UI/Modal";
import classes from "./offerStyleSheets/DeleteOffer.module.css";
import { useNavigate } from 'react-router-dom'
const DeleteOffer = (props) => {
  const { del } = useFetch("http://localhost:5000");
    const navigate = useNavigate();
  const DeleteOfferHandler = async () => {
    const _id = props.cardId;
    await del(`/offer/${_id}`);
    navigate("/");
  };

  return (
    <Modal onClose={props.onClose}>
      <h4 className={classes.title}>Delete Offer</h4>
      <div className={classes.description}>
        <p>
          This offer will be removed from the offers page and from yours offer.
        </p>
        <br/>
        <p>Are u sure?</p>
      </div>
      <div className={classes.actions}>
        <Button onClick={props.onClose}>Cancle</Button>
        <Button onClick={DeleteOfferHandler}>Delete</Button>
      </div>
    </Modal>
  );
};

export default DeleteOffer;
