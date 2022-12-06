import Card from "./Card";
import Container from "./Container";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useSessionStorage } from "react-use-storage";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Modal from "./UI/Modal";
import Button from "./Button";
import logo from "../logo.svg"
const Home = () => {
  const showfiltered = useSelector((state) => state.filtered.filteredOffers);
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  
  return (
    <Container>
      <SideBar list={null} />
      {/* <Button onClick={toggleShow}>Add problem</Button>
              <Gg
                basicModal={basicModal}
                toggleShow={toggleShow}
                setBasicModal={setBasicModal}
              /> */}
      {showfiltered ? (
        showfiltered.map((offer) => (
          <Card
            key={offer._id}
            _id={offer._id}
            title={offer.title}
            location={offer.location}
            author={offer.author}
            date={offer.date}
            visible={!offer.appliers.includes(userid)}
            length={offer.appliers.length}
            image={offer.author.image.url}
            onClick={() => {
              window.location = `/offer/${offer._id}`;
            }}
          />
        ))
      ) : (
        <Spinner />
      )}
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
      {/* <p>{!data ? "Loading..." : data}</p> */}
    </Container>
  );
};

export default Home;
