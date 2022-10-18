import Card from "./Card";
import Container from "./Container";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import {useSessionStorage} from 'react-use-storage'
import { useEffect, useState } from "react";



const Home = () => {
  const showfiltered = useSelector(state=>state.filtered.filteredOffers)
  const [kind,setkind,removekind]=useSessionStorage('kind',false);
  const [islogin,setislogin,removeislogin]=useSessionStorage('islogin',false);
  const [isCompany,setIsCompany]=useState(false)
  
  useEffect(()=>{
  if(kind==='company') setIsCompany(true)
  },[])
  


  return (
    <div className="main-content">
      <SideBar/>
      <Container>
      {isCompany&&islogin&&<button onClick={()=>{window.location='/addoffer'}}>Add Offer</button>}
        {showfiltered? showfiltered.map((offer) => (
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
