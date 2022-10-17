import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "use-http";
import Card from "../Card";
import Container from "../Container";

const OfferDetails = (props) => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [offerdetails, setofferdetails] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const offerdetail = await get(`/offer/${params.id}`);
      setofferdetails(offerdetail);
      console.log(offerdetail);
      return offerdetail;
    };
    fetchData();
  }, [get, params.id]);

  return (
    <div className="main-content">
      <Container>
        <div>{offerdetails?.title}</div>
        <div>{offerdetails?.description}</div>
        <div>{offerdetails?.location}</div>
      </Container>
    </div>
  );
};

export default OfferDetails;
