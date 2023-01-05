import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { filteredActions } from "../store/filteredSlice";
import { TextField, ToggleButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

const FormFilter = (props) => {
  const { get, post } = useFetch("http://localhost:5000");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [offers, setOffers] = useState([]);

  const [showForm, setShowForm] = useState(false);

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
        .filter(
          (offer) =>
            offer.title.toLowerCase().includes(title) &&
            offer.location.toLowerCase().includes(location) &&
            offer.author?.username.toLowerCase().includes(author) &&
            offer.date.includes(date)
        );
      dispatch(filteredActions.addfilteredoffer(newOffers));
    };
    func();
  }, [title, offers, location, author, date]);

  return (
    <form className={props.className}>
      <ToggleButton
        value="check"
        selected={showForm}
        onChange={() => {
          setShowForm(!showForm);
        }}
      >
        <SearchIcon></SearchIcon>
        <h3>search & Filter</h3>
      </ToggleButton>
      {!showForm && <KeyboardArrowDownRoundedIcon />}
      {showForm && <KeyboardArrowUpRoundedIcon />}
      {showForm && (
        <div className="filter">
          {/* <TextField label="Title"></TextField> */}
          <Input
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            label="Company"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
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
