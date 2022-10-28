import { useSessionStorage } from "react-use-storage";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { useParams } from "react-router-dom";
import Container from "../Container";
import PageNotFound from "../error/PageNotFound";
import classes from "./offerStyleSheets/OfferDetails.module.css";
import Input from "../Input";
import Spinner from "../Spinner";
import Button from "../Button";

const EditOffer = (props) => {
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const params = useParams();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const { get, put, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [offer, setoffer] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const offerdetail = await get(`/offer/${params.id}`);
      setoffer(offerdetail);
      return offerdetail;
    };
    fetchData();
  }, [get, params._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const _id = offer._id;
    const offerdata = await put("/offer", {
      title,
      description,
      location,
      _id,
      userid,
    });
    if (offerdata.ok) {
      window.location = "/";
    }
  };


  return (
    <>
      {!islogin || kind !== "company" ? (
        <PageNotFound />
      ) : (
        <form className="main-content">
          <Container>
            {offer ? (
              <div className={classes.main}>
                <div className={classes.head}>
                  <Input
                    type="text"
                    value={offer?.title}
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                  />

                  <Input
                    type="text"
                    placeholder={offer?.location}
                    onChange={(e) => {
                      setlocation(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.description}>
                  <Input
                    label="Description"
                    placeholder={offer?.description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.footer}>
                  <Button type="submit" onClick={submitHandler}>
                    Edit Offer
                  </Button>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </Container>
        </form>
      )}
    </>
  );
};

export default EditOffer;
