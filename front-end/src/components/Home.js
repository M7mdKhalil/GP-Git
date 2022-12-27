import Card from "./Card";
import Container from "./Container";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useSessionStorage } from "react-use-storage";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Modal from "./UI/Modal";
import Button from "./Button";

import { useNavigate } from "react-router-dom";

import logo from "../logo.svg";
import { DialogButtonToggle } from "./UI/DialogButtonToggle";
import { Avatar } from "@mui/material";
const Home = () => {
  const showfiltered = useSelector((state) => state.filtered.filteredOffers);
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  let navigate = useNavigate();

  return (
    <Container>
      <SideBar list={null} />
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
                image={offer.author.image?.url}
            onClick={() => navigate(`/offer/${offer._id}`)}
          />
        ))
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Home;
