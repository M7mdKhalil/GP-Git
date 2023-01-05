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
import AddChip from "../UI/AddChip";

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
  const [requirmentSkills, setRequirmentSkills] = useState([]);
  const [date, setDate] = useState("");


  const submitHandler = async (event) => {
      event.preventDefault();

    const author = showUser._id;
    const offerdata = await post("/offer", {
      title,
      description,
      location,
      date,
      author,
        islogin,
        requirmentSkills: requirmentSkills.allSkills
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
              <div className={classes.section}>
                <TextField
                  label="Title"
                  sx={{ width: "100%" }}
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
                <TextField
                  label="Location"
                  sx={{ width: "100%" }}
                  value={location}
                  onChange={(e) => {
                    setlocation(e.target.value);
                  }}
                />
              </div>

              {/* <hr></hr> */}
              <div>
                <InputArea
                  placeholder="Description"
                  sx={{ width: 900 }}
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
                <AddChip
                  sx={{ width: 200 }}
                  defaultSkills={requirmentSkills}
                  label="Required Skills"
                  skills={(allSkills) => {
                      setRequirmentSkills({ ...requirmentSkills, allSkills });
                  }}
                ></AddChip>
              </div>
              <label
                style={{
                  fontSize: "14px",
                  margin: "20px 0 0 10px",
                  color: "gray",
                }}
              >
                End Date
              </label>
              <input
                type="date"
                on
                onChange={(e) => {
                  setDate(e.target.value);
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
