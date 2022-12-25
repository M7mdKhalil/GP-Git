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
              <Input
                label="Title"
                type="text"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <Input
                label="Location"
                type="text"
                id="location"
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
              />
              <Input
                className={classes.desc}
                label="Description"
                id="description"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </div>
            <div className={classes.footer}>
              <Button onClick={props.onClose}>Cancle</Button>
              <Button type="submit" onClick={submitHandler}>
                Add Offer
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddOffer;
