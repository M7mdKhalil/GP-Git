import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Card from "./Card";
import Input from "./Input";

const FormFilter = (props) => {
  const { get, post, put, response, loading, error } = useFetch(
    "http://localhost:5000"
  );

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [result, setResult] = useState("");

  const search = (e)=> {
    setTitle(e.target.value);
    props.sValue(title)
  }

  return (
    <form className={props.className}>
      
      <h3>Filter</h3>
      <Input
        type="text"
        value={title}
        onChange={search}
      />
      <p>{title}</p>
      <Input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button type="submit">submit</button>
    </form>
  );
};

export default FormFilter;
