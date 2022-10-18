import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { filteredActions } from "../store/filteredSlice";

const FormFilter = (props) => {
  const { get} = useFetch(
    "http://localhost:5000"
  );
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [offers, setOffers] = useState([]);
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
=======
  
>>>>>>> 5180df5a8792ed91858aaeab85446a6fd182e3e6

  useEffect(() => {
    const fetchData = async () => {
      const offer = await get("/offer");
      setOffers(offer);
      return offer;
    };

    fetchData();
  }, [get]);

  useEffect(() => {
<<<<<<< HEAD
    const func = async () => {
      const newOffers = await offers?.filter((offer) => offer.title.toLowerCase().includes(title.toLocaleLowerCase()) && offer.location.toLowerCase().includes(location.toLocaleLowerCase()) && offer.author.toLowerCase().includes(author.toLocaleLowerCase()));
      console.log(title)
=======
    const func = async() => {
      const newOffers =await offers?.filter((offer) => offer.title.toLowerCase().includes(title)&&offer.location.toLowerCase().includes(location)&&offer.author.username.toLowerCase().includes(author));
      console.log(offers)
>>>>>>> 5180df5a8792ed91858aaeab85446a6fd182e3e6
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
