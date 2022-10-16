import Card from "./Card";
import Container from "./Container";
import SideBar from "./SideBar";
import { useFetch } from "use-http";
import { useEffect, useState } from "react";

const Home = () => {

  const [searchValue, setSearchValue] = useState("");

  const getSearchRes = (v)=>{
    setSearchValue(v);
    console.log(searchValue)
  }

  const { get, post, put, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [offers, setOffers] = useState([]);
  const [res, setRes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const offer = await get("/offer");
      setOffers(offer);
      return offer;
    };

    fetchData();
  }, [get]);

  useEffect(() => {
    const func = () => {
      console.log(offers);
      const newOffers = offers.filter((of) => of.title.includes(searchValue));
      setRes(newOffers);
      console.log(newOffers);
    };
    offers && func();
  }, [offers]);



  return (
    <div className="main-content">
      <SideBar sValue={getSearchRes} />
      <Container>
        {offers? res.map((offer) => (
          <Card
            key={offer._id}
            title={offer.title}
            location={offer.location}
            author={offer.author}
            date={offer.date}
            onClick={() => {
              window.location = `/offer/${offer._id}`;
            }}
          />
        )) : <p>Loading...</p>}
        {/* {offers ? (
          offers.map((offer) => (
            <Card
              key={offer._id}
              title={offer.title}
              location={offer.location}
              author={offer.author}
              date={offer.date}
              onClick={() => {
                window.location = `/offer/${offer._id}`;
              }}
            />
          ))
        ) : (
          <p>loading...</p>
        )} */}
      </Container>
      {/* <p>{!data ? "Loading..." : data}</p> */}
    </div>
  );
};

export default Home;
