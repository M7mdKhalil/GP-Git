import React, { useContext, useState } from "react";
import "./UI/intro.css";
import Vector1 from "./img/Vector1.png";
import Vector2 from "./img/Vector2.png";
import boy from "./img/boy.png";
import glassesimoji from "./img/glassesimoji.png";
import thumbup from "./img/thumbup.png";
import crown from "./img/crown.png";
import FloatinDiv from "./UI/FloatingDiv/FloatingDiv";
import Github from "./img/github.png";
import LinkedIn from "./img/linkedin.png";
import Instagram from "./img/instagram.png";
import { themeContext } from "./UI/context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { PrimaryButton, TextButton } from "./UI/CustomButton";
import { useFetch } from "use-http";
import Card from "./Card";
import { useSessionStorage } from "react-use-storage";
import Container from "./Container";
import Spinner from "./Spinner";
const Intro = () => {
  const showUser = useSelector((state) => state.user.userDetails);

  const params = useParams();
  let navigate = useNavigate();
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");

  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );

  const [userdetails, setuserdetails] = useState({});
  const [myOffers, setMyOffers] = useState([]);
  const [userOffer, setUserOffer] = useState([]);

  const { get, put, response, loading, error } = useFetch(
    "http://localhost:5000"
  );

  useEffect(() => {
    const fetchData = async () => {
      const userdetail = await axios
        .get(`http://localhost:5000/user/${params.id}`)
        .then(function (response) {
          // handle success
            setuserdetails(response.data);
        });
      const companyoffers = await get(`/offer/${params.id}/offers`);
      console.log(companyoffers);
      setMyOffers(companyoffers?.offers);

      const userOffers = await get(`/offer/${params.id}/userOffers`);
      setUserOffer(userOffers?.offers);
    };
    fetchData();
  }, [params, get]);

  // Transition
  const transition = { duration: 2, type: "spring" };

  // context
  const theme = useContext(themeContext);
  const darkMode = theme?.state?.darkMode;

  const profHandler = () => {
    window.location = `/profile/${params.id}`;
  };

  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          {/* <span style={{ color: darkMode ? "white" : "" }}>Hy! I Am</span> */}
          <span>{userdetails?.username}</span>
          <span>{userdetails?.bio}</span>
        </div>
        <Link to="contact" className="button i-button" smooth={true} spy={true}>
          {userdetails?.kind == "user" && (<>
                      <PrimaryButton onClick={profHandler}>Show CV</PrimaryButton>
                  </>)}
                 
        </Link>
        {/* social icons */}
        <div className="i-icons">
          <img src={Github} alt="" />
          <img src={LinkedIn} alt="" />
          <img src={Instagram} alt="" />
        </div>
      </div>
      {/* right image side */}
          <div className="i-right">
        <>
        <img src={Vector1} alt="" />
                  <img src={Vector2} alt="" /></>

        <img
          src={userdetails?.image?.url}
          className="item"
          height="100"
          width="300"
          alt=""
        />
        {/* animation */}
        <motion.img
          initial={{ left: "-36%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
          // src={glassesimoji}
          alt=""
        />

        {userdetails?.kind == "user" && (
          <motion.div
            initial={{ top: "-4%", left: "74%" }}
            whileInView={{ left: "68%" }}
            transition={transition}
            className="floating-div"
          >
            <FloatinDiv
              img={crown}
              text1={userdetails?.cv?.department?.label}
            />
          </motion.div>
        )}
        {userdetails?.kind == "user" && (
          <motion.div
            initial={{ top: "20%", left: "74%" }}
            whileInView={{ left: "68%" }}
            transition={transition}
            className="floating-div"
          >
            <FloatinDiv img={crown} text1={userdetails?.cv?.country?.label} />
          </motion.div>
        )}

        {/* animation */}
        {userdetails?.kind == "user" && (
          <motion.div
            initial={{ left: "9rem", top: "5rem" }}
            whileInView={{ left: "0rem" }}
            transition={transition}
            className="floating-div"
          >
            {/* floatinDiv mein change hy dark mode ka */}
            <FloatinDiv img={thumbup} text1={userdetails?.cv?.collage?.label} />
          </motion.div>
        )}
        {userdetails?.kind == "user" && (
          <motion.div
            initial={{ left: "9rem", top: "18rem" }}
            whileInView={{ left: "0rem" }}
            transition={transition}
            className="floating-div"
          >
            {/* floatinDiv mein change hy dark mode ka */}
            <FloatinDiv img={thumbup} text1={userdetails?.email} />
          </motion.div>
        )}

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>

      <div className="offers" id="myoffers">
        {userdetails?.kind == "company" && (
          <Container>
            {myOffers ? (
              myOffers.map((offer) => (
                <Card
                  key={offer._id}
                  _id={offer._id}
                  title={offer.title}
                  location={offer.location}
                  author={offer.author}
                  date={offer.date.substring(0, 10)}
                  // visible={!offer.appliers.includes(userid)}
                  cardImage={false}
                  length={offer.appliers.length}
                  image={offer.author.image?.url}
                  available={offer.available}
                  onClick={() => navigate(`/offer/${offer._id}`)}
                />
              ))
            ) : (
              <Spinner />
            )}
          </Container>
        )}

        {userdetails?.kind == "user" &&
          userdetails?._id === showUser?._id &&
          islogin && (
            <Container>
                      <h1>Offers</h1>
                      {userdetails?.offers?.map((offer) => (
                          <Card
                              _id={offer._id}
                              title={offer.title}
                              location={offer.location}
                              author={offer.author}
                              date={offer.date.substring(0, 10)}
                              // visible={!offer.appliers.includes(userid)}
                              length={offer.appliers.length}
                              image={offer.author.image?.url}
                              available={offer.available}
                              onClick={() => navigate(`/offer/${offer._id}`)}
                          />
                      ))}

                      {userdetails?.kind === 'user' && (
                          <>
                              <h1>accepted offers</h1>
                              {userdetails?.acceptedOffers?.map(offer => (
                                  <Card
                                      key={offer._id}
                                      _id={offer._id}
                                      title={offer.title}
                                      location={offer.location}
                                      author={offer.author}
                                      date={offer.date.substring(0, 10)}
                                      // visible={!offer.appliers.includes(userid)}
                                      length={offer.appliers.length}
                                      image={offer.author.image?.url}
                                      available={offer.available}
                                      onClick={() => navigate(`/offer/${offer._id}`)}
                                  />
                              ))}
                              <h1>regected offers</h1>
                              {userdetails?.regectedOffers?.map(offer => (
                                  <Card
                                      key={offer._id}
                                      _id={offer._id}
                                      title={offer.title}
                                      location={offer.location}
                                      author={offer.author}
                                      date={offer.date.substring(0, 10)}
                                      // visible={!offer.appliers.includes(userid)}
                                      length={offer.appliers.length}
                                      image={offer.author.image?.url}
                                      available={offer.available}
                                      onClick={() => navigate(`/offer/${offer._id}`)}
                                  />
                              ))}
                          </>
                      )
                      }
            </Container>
          )}
      </div>
    </div>
  );
};

export default Intro;
