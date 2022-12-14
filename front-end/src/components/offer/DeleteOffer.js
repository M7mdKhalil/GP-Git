import React from "react";
import useFetch from "use-http";
import Button from "../Button";
import Modal from "../UI/Modal";
import classes from "./offerStyleSheets/DeleteOffer.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeleteOffer = (props) => {
  const { post } = useFetch("http://localhost:5000");
    const navigate = useNavigate();
    const showUser = useSelector((state) => state.user.userDetails);
    console.log(showUser.kind === 'admin');
    const DeleteOfferHandler = async () => {
        toast.warn('Deleted!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
      const _id = props.cardId;
      await post(`/offer/delete/${_id}`, { admin: showUser.kind === 'admin' });
    window.location = "/";
  };
    return (
    <Modal onClose={props.onClose}>
      <h4 className={classes.title}>Delete Offer</h4>
      <div className={classes.description}>
        <p>
          This offer will be removed from the offers page and from yours offer.
        </p>
        <br />
        <p>Are u sure?</p>
      </div>
      <div className={classes.actions}>
        <Button onClick={props.onClose}>Cancle</Button>
        <Button onClick={DeleteOfferHandler}>Delete</Button>
            </div>
            <ToastContainer />
    </Modal>
  );
};

export default DeleteOffer;
