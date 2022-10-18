import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { filteredActions } from "../store/filteredSlice";

const FormFilter = (props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [offers, setOffers] = useState([]);
  const dispatch = useDispatch();
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );

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
      const newOffers = await offers?.filter((offer) => offer.title.toLowerCase().includes(title.toLocaleLowerCase()) && offer.location.toLowerCase().includes(location.toLocaleLowerCase()) && offer.author.toLowerCase().includes(author.toLocaleLowerCase()));
      console.log(title)
      dispatch(filteredActions.addfilteredoffer(newOffers));
    };
    func();
  }, [title, offers, location, author]);



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
    </form>
  );
};

export default FormFilter;
