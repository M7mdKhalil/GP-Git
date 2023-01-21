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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [endDateValue, setEndDateValue] = useState(new Date());

    const submitHandler = async (event) => {
        await toast.success('Adding Offer', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    event.preventDefault();

    const author = showUser._id;
    const offerdata = await post("/offer", {
      title,
      description,
      location,
      endDate: endDateValue,
      author,
      islogin,
      requirmentSkills: requirmentSkills.allSkills,
    });
    console.log("offer added", offerdata);
    if (offerdata.ok) {
      window.location = "/";
    }
  };
  return (
    <div className={classes.main}>
      {!islogin || (showUser.kind !== "company" && showUser.kind !== "admin") ? (
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Closing Date"
                  value={endDateValue}
                  onChange={(newValue) => {
                    setEndDateValue(newValue);
                  }}
                  minDateTime={dayjs(new Date())}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.footer}>
              <TextButton onClick={props.onClose}>Cancle</TextButton>
              <PrimaryButton type="submit" onClick={submitHandler}>
                Add Offer
              </PrimaryButton>
            </div>
                      </form>
                      <ToastContainer />
        </Modal>
          )}
    </div>
  );
};

export default AddOffer;
