import Card from "./Card";
import Container from "./Container";
import SideBar from "./SideBar";
import { useFetch } from "use-http";
import { useEffect, useState } from "react";

const Home = () => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const offer = await get("/offers");
      setOffers(offer);
      return offer;
    };

    fetchData();
    console.log(offers);
  }, [get]);

  return (
    <div className="main-content">
      <SideBar />
      <Container>
        {offers?.map((offer) => (
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
        ))}
      </Container>
      {/* <p>{!data ? "Loading..." : data}</p> */}
    </div>
  );
};

export default Home;
