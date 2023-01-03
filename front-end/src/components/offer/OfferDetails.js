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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OfferDetails = () => {
    const showUser = useSelector((state) => state.user.userDetails);
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const navigate = useNavigate();
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [offerdetails, setofferdetails] = useState({});
  const [visible, setVisible] = useState();
  const [numOfAppliers, setnumOfAppliers] = useState();
    const params = useParams();
    const [acceptstate, setacceptstate] = useState('');

    const acceptstatef=() => {

        for (let i = 0; i < showUser?.acceptedOffers?.length; i++) {

            if (showUser.acceptedOffers[i]._id === params.id) {
                return setacceptstate('Accepted');
            }
        }
        for (let i = 0; i < showUser?.regectedOffers?.length; i++) {
            if (showUser.regectedOffers[i]._id === params.id) {
                return setacceptstate('Regected');
            }
        }
    };


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
      acceptstatef();
  }, [get, params.id, showUser]);

    
    

  const applyHandler = async () => {
    const _id = params.id;
    const applydata = await post("/user/apply", { _id, userid });
    const applystate = await post("/user/applystate", {
      applierid: userid,
      offerid: _id,
      companyid: offerdetails.author._id,
    });
    console.log(applydata.ok);
    if (applydata.ok && applystate) {
      window.location = `/offer/${params.id}`;
    }
  };

  const unApplyHandler = async () => {
    const _id = params.id;
    const unapplydata = await post("/user/unapply", { _id, userid });
    console.log(unapplydata.ok);
    if (unapplydata.ok) {
      window.location = `/offer/${params.id}`;
    }
  };

  return (
    <div className="main-content">
      <Container>
        {offerdetails && (
          <SideBar
            list={offerdetails.appliers}
            offerdetails={offerdetails}
            nAppliers={numOfAppliers}
            offerid={offerdetails?._id}
            companyid={offerdetails?.author?._id}
          />
        )}
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
                      {islogin && kind === "user" ? (acceptstate === 'Accepted' || acceptstate === 'Regected' ?
                          <h1>{acceptstate}</h1> :
                          (
                              visible ? (
                                  <Button onClick={applyHandler}>apply</Button>
                              ) : (
                                  <Button onClick={unApplyHandler}>unapply</Button>
                              )
                          ) ): (
                              ""
                          )}
            <NumOfAppliers numOfAppliers={numOfAppliers} />
          </div>
        </div>
      </Container>
    </div>
  )
};

export default OfferDetails;
