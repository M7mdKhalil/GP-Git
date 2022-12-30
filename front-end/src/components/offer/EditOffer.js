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
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputArea from "../UI/InputArea";
import { PrimaryButton, LoadButton } from "../UI/CustomButton";

const EditOffer = (props) => {
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const navigate = useNavigate();
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const params = useParams();
  const [offer, setoffer] = useState({});
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [load, setLoad] = useState(false);

  const { get, put, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  useEffect(() => {
    const fetchData = async () => {
      const offerdetail = await get(`/offer/${params.id}`);
      setoffer(offerdetail);
      settitle(offerdetail?.title);
      setdescription(offerdetail?.description);
      setlocation(offerdetail?.location);
      return offerdetail;
    };
    fetchData();
  }, [get, params._id]);

  const submitHandler = async (e) => {
    setLoad(true)
    e.preventDefault();
    const _id = offer._id;
    const offerdata = await put(`/offer`, {
      title,
      description,
      location,
      _id,
      userid,
    });
    // console.log(offerdata.ok);
    if (offerdata.ok) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  };

  return (
    <>
          {!islogin || (kind !== "company" && kind !== 'admin') ? (
        <PageNotFound />
      ) : (
        <form className="main-content">
          <Container>
            {offer ? (
              <div className={classes.main}>
                <div className={classes.head}>
                  {/* <Input
                    type="text"
                    value={title}
                    onChange={(e, newValue) => {
                      settitle(newValue);
                    }}
                  /> */}

                  <TextField
                    value={title}
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    sx={{ width: "40ch" }}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                  />

                  <TextField
                    value={location}
                    onChange={(e) => {
                      setlocation(e.target.value);
                    }}
                    sx={{ width: "40ch" }}
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                  />

                  {/* <Input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setlocation(e.target.value);
                    }}
                  /> */}
                </div>

                <div className={classes.description}>
                  {/* <Input
                    label="Description"
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  /> */}
                  <InputArea
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.footer}>
                  {!load ? (
                    <PrimaryButton type="submit" onClick={submitHandler}>
                      Edit Offer
                    </PrimaryButton>
                  ) : (
                    <LoadButton>Loading</LoadButton>
                  )}
                  {/* <Button type="submit" onClick={submitHandler}>
                    Edit Offer
                  </Button> */}
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
