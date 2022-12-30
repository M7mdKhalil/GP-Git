import { useState } from "react";
import useFetch from "use-http";
import { useSessionStorage } from "react-use-storage";
import Container from "../Container";
import PageNotFound from "../error/PageNotFound";
import classes from "./offerStyleSheets/AddOffer.module.css";
import Input from "../Input";
import Button from "../Button";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import InputArea from "../UI/InputArea";
import { TextButton, PrimaryButton } from "../UI/CustomButton";

const AddOffer = (props) => {
  const showUser = useSelector((state) => state.user.userDetails);
  const { post } = useFetch("http://localhost:5000");
  const navigate = useNavigate();
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    const author = showUser._id;
    const offerdata = await post("/offer", {
      title,
      description,
      location,
      author,
      islogin,
    });
    console.log("offer added", offerdata);
    if (offerdata.ok) {
      window.location = "/";
    }
  };
  return (
    <div className={classes.main}>
      {!islogin || showUser.kind !== "company" ? (
        <PageNotFound />
      ) : (
        <Modal onClose={props.onClose}>
          <h3 className={classes.title}>Add Offer</h3>
          <form>
            <div className={classes.dataForm}>
              <TextField
                label="Title"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <TextField
                label="Location"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
              />
              {/* <hr></hr> */}
              <label
                style={{
                  fontSize: "14px",
                  margin: "20px 0 0 10px",
                  color: "gray",
                }}
              >
                Description
              </label>
              <InputArea
                label="Description"
                sx={{ width: "100%" }}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </div>
            <div className={classes.footer}>
              <TextButton onClick={props.onClose}>Cancle</TextButton>
              <PrimaryButton type="submit" onClick={submitHandler}>
                Add Offer
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddOffer;
