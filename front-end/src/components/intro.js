import React, { useContext, useState } from "react";
import "./UI/intro.css";
import "./UI/tabs.css";
import { themeContext } from "./UI/context";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { PrimaryButton, TextButton } from "./UI/CustomButton";
import { useFetch } from "use-http";
import { useSessionStorage } from "react-use-storage";
import Container from "./Container";
import Card from './Card'
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
    <div >
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              <div id="container">

                  <div class="product-details">

                  <h1>{userdetails?.username}</h1>
                      <span class="hint-star star">
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star-o" aria-hidden="true"></i>
                      </span>

                  <p class="information">{userdetails?.bio}</p>
                  {userdetails?.kind==='user'&&(
                  <div className='control'>
                      <button className='btn' onClick={() => {
                          window.location = `/profile/${userdetails?._id}`
                      } }><span class="buy">Show CV</span></button>
                      </div>)}

                  </div>

                  <div class="product-image">

                  <img src={userdetails?.image?.url} alt="" />


                          <div class="info">
                              <h2> Description</h2>
                      <ul>
                          <li><strong>Location : </strong>{userdetails?.kind === 'user' ? userdetails?.cv?.country?.label : userdetails?.location}</li>
                          <li><strong>PhoneNumber : </strong>{userdetails?.phonenumber}</li>
                          <li><strong>email</strong>{userdetails?.email}</li>
                              </ul>
                  </div>
                  </div>

          </div>

          <div class="tabset">
              {(userdetails?._id === showUser?._id || userdetails?.kind ==='company') &&
              islogin && (<>
              <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked/>
                  <label for="tab1">Offers</label></>)}
              {userdetails?.kind === 'user' && (
                  <>
                  <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier"/>
                      <label for="tab2">Accepted Offers</label>
                      <input type="radio" name="tabset" id="tab3" aria-controls="dunkles"/>
                      <label for="tab3">Regected Offers</label> </>
              )}
              <div class="tab-panels">
                  <section id="marzen" class="tab-panel">
                                  <h2>Offers</h2>
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
                              </section>
                              <section id="rauchbier" class="tab-panel">
                      <h2>Accipted Offers</h2>
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
                              </section>
                              <section id="dunkles" class="tab-panel">
                      <h2>Regected Offers</h2>
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
                  </section>
                  
                          </div>
                      </div>
          
      </div>
    
  );
};

export default Intro;
