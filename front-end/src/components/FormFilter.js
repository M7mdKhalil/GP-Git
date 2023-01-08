import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { filteredActions } from "../store/filteredSlice";
import { TextField, ToggleButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import classes from "../stylesheets/SideBar.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextButton } from "./UI/CustomButton";
import ClearIcon from "@mui/icons-material/Clear";

const FormFilter = (props) => {
  const { get, post } = useFetch("http://localhost:5000");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [offers, setOffers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [offerStatus, setOfferStatus] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const offer = await get("/offer");
      setOffers(offer);
      return offer;
    };

    fetchData();
  }, [get]);

  useEffect(() => {
    const func = async () => {
      const newOffers = await offers
        ?.reverse()
        .filter((offer) =>
          offer.title.toLowerCase().includes(title) &&
          offer.location.toLowerCase().includes(location) &&
          offer.author?.username.toLowerCase().includes(author) &&
          offer.date.includes(date) &&
          offerStatus !== undefined
            ? offerStatus == "open"
              ? offer.available == true
              : offer.available == false
            : offer.available == true || offer.available == false
        );
      dispatch(filteredActions.addfilteredoffer(newOffers));
    };
    func();
  }, [title, offers, location, author, date, offerStatus]);

  return (
    <form className={props.className}>
      <ToggleButton
        value="check"
        selected={showForm}
        onChange={() => {
          setShowForm(!showForm);
        }}
        className={classes.formHeader}
      >
        <SearchIcon></SearchIcon>
        <h3>search & Filter</h3>
      </ToggleButton>
      {!showForm && <KeyboardArrowDownRoundedIcon />}
      {showForm && <KeyboardArrowUpRoundedIcon />}
      {showForm && (
        <div className={classes.items}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: "100%" }}
          ></TextField>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ width: "100%" }}
          ></TextField>
          <TextField
            label="Company"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ width: "100%" }}
          ></TextField>
          <FormControl className={classes.radioGroup}>
            <FormLabel>Offer status</FormLabel>
            <RadioGroup
              row
              value={offerStatus}
              onChange={(event) => {
                setOfferStatus(event.target.value);
              }}
            >
              <FormControlLabel
                value="open"
                control={<Radio />}
                label="Open"
                onChange={(event) => {
                  setOfferStatus(event.target.value);
                }}
              />
              <FormControlLabel
                value="closed"
                control={<Radio />}
                label="Closed"
                onChange={(event) => {
                  setOfferStatus(event.target.value);
                }}
              />
              <TextButton
                type="button"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setOfferStatus(undefined);
                }}
              >
                Clear
              </TextButton>
            </RadioGroup>
          </FormControl>
          {/* <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
      /> */}
        </div>
      )}
    </form>
  );
};

export default FormFilter;
