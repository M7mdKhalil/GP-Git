import { useState } from "react";
import useFetch from "use-http";
import { useSessionStorage } from "react-use-storage";
import Container from "../Container";
import PageNotFound from "../error/PageNotFound";
import classes from "./offerStyleSheets/OfferDetails.module.css";
import Input from "../Input";
import Button from "../Button";

const AddOffer = (props) => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const submitHandler = async (event) => {
    event.preventDefault();
    const author = userid;
    const offerdata = await post("/offer", {
      title,
      description,
      location,
      author,
      islogin,
    });
    if (offerdata.ok) {
      window.location = "/";
    }
  };
  return (
    <div>
      {!islogin || kind !== "company" ? (
        <PageNotFound />
      ) : (
        <form className="main-content">
          <Container>
            <div className={classes.main}>
              <Input
                label="Title"
                type="text"
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <Input
                label="Location"
                type="text"
                id="location"
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
              />
              <Input
                label="Description"
                id="description"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value)
                }}
              />
            </div>
            <div className={classes.footer}>
              <Button type="submit" onClick={submitHandler}>
                Add Offer
              </Button>
            </div>
          </Container>
        </form>
      )}
    </div>
  );
};

export default AddOffer;
