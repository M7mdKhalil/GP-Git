import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "use-http";
import classes from "./offerStyleSheets/OfferDetails.module.css";
import Card from "../Card";
import Container from "../Container";
import { useSessionStorage } from "react-use-storage";
import styles from "../../stylesheets/SideBar.module.css";
import NumOfAppliers from "./NumOfAppliers";
import Button from "../Button";
import SideBar from "../SideBar";

const OfferDetails = () => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [offerdetails, setofferdetails] = useState({});
  const [visible, setVisible] = useState();
  const [numOfAppliers, setnumOfAppliers] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const offerdetail = await get(`/offer/${params.id}`);
      setofferdetails(offerdetail);
      await setnumOfAppliers(offerdetail?.appliers?.length);
      await setVisible(
        !offerdetail?.appliers?.some((ele) => ele._id === userid)
      );
    };
    fetchData();
  }, [get, params.id]);

  const applyHandler = async () => {
    const _id = params.id;
    const applydata = await post("/user/apply", { _id, userid });
    if (applydata.ok) {
      window.location = `/offer/${params.id}`;
    }
  };

  const unApplyHandler = async () => {
    const _id = params.id;
    const unapplydata = await post("/user/unapply", { _id, userid });
    if (unapplydata.ok) {
      window.location = `/offer/${params.id}`;
    }
  };


  return (
    <div className="main-content">
      <Container>
        {offerdetails && <SideBar list={offerdetails.appliers} nAppliers={numOfAppliers} />}
        <div className={classes.main}>
          <div className={classes.head}>
            <h3>{offerdetails?.title}</h3>
            <div>{offerdetails?.location}</div>
          </div>
          <div className={classes.description}>
            <label>Description</label>
            <p>{offerdetails?.description}</p>
          </div>

          <div className={classes.footer}>
            <NumOfAppliers numOfAppliers={numOfAppliers} />
            {islogin && kind === "user" ? (
              visible ? (
                <Button onClick={applyHandler}>apply</Button>
              ) : (
                <Button onClick={unApplyHandler}>unapply</Button>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OfferDetails;
