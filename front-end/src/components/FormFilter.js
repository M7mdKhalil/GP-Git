import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { filteredActions } from "../store/filteredSlice";

const FormFilter = (props) => {
  const { get, post } = useFetch("http://localhost:5000");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [offers, setOffers] = useState([]);
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
      const newOffers = await offers?.reverse().filter(
        (offer) =>
          offer.title.toLowerCase().includes(title) &&
          offer.location.toLowerCase().includes(location) &&
          offer.author?.username.toLowerCase().includes(author) &&
          offer.date.includes(date)
      )
      dispatch(filteredActions.addfilteredoffer(newOffers));
    }
    func();
  }, [title, offers, location, author, date]);

  return (
    <form className={props.className}>
      <h3>Filter</h3>

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
    </form>
  );
};

export default FormFilter;
