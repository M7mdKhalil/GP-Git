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
import { LoadButton, PrimaryButton, TextButton } from "../UI/CustomButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Chip } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [acceptstate, setacceptstate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [appling, setAppling] = useState(undefined);

  const acceptstatef = () => {
    setIsLoading(false);
    for (let i = 0; i < showUser?.acceptedOffers?.length; i++) {
      if (showUser.acceptedOffers[i]._id === params.id) {
        return setacceptstate("Accepted");
      }
    }
    for (let i = 0; i < showUser?.regectedOffers?.length; i++) {
      if (showUser.regectedOffers[i]._id === params.id) {
        return setacceptstate("Regected");
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
      await setAppling(offerdetail?.available);
    };
    fetchData();
    acceptstatef();
  }, [get, params.id, showUser]);

    const applyHandler = async () => {
        await toast.success('Applied loading', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        const _id = params.id;
    const applydata = await post("/user/apply", { _id, userid });
    const applystate = await post("/user/applystate", {
      applierid: userid,
      offerid: _id,
      companyid: offerdetails.author._id,
    });
    console.log(applystate);
    if (applydata.ok && applystate) {
      window.location = `/offer/${params.id}`;
    }
  };

    const unApplyHandler = async () => {
        await toast.success('UnApplied loading', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
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
            {islogin && kind == "user" ? (
              !isLoading ? (
                appling === true ? (
                  visible ? (
                    <PrimaryButton
                      onClick={applyHandler}
                      endIcon={<SendRoundedIcon />}
                    >
                      apply now
                    </PrimaryButton>
                  ) : acceptstate === "Accepted" ||
                    acceptstate === "Regected" ? (
                    <Chip
                      label={acceptstate}
                      sx={{
                        color: `${acceptstate == "Accepted" ? "green" : "red"}`,
                        borderColor: `${
                          acceptstate == "Accepted" ? "green" : "red"
                        }`,
                        textTransform: "uppercase",
                      }}
                      variant="outlined"
                    />
                  ) : (
                    <TextButton
                      onClick={unApplyHandler}
                      startIcon={<ClearRoundedIcon />}
                    >
                      unapply
                    </TextButton>
                  )
                ) : appling !== undefined && appling === false ? (
                  <Chip
                    label="This offer has been CLOSED"
                    sx={{ color: "red", borderColor: "red" }}
                    variant="outlined"
                  />
                ) : (
                  <LoadButton>Loading...</LoadButton>
                )
              ) : (
                <LoadButton></LoadButton>
              )
            ) : (
              ""
            )}

            {islogin &&
              ((userid === showUser._id && showUser?.kind === "company") || showUser?.kind === "admin") && (
                <PrimaryButton
                  onClick={() => {
                    navigate(`/editoffer/${params.id}`);
                  }}
                  startIcon={<BorderColorRoundedIcon />}
                >
                  Edit
                </PrimaryButton>
              )}

            <p>Closing date | {offerdetails?.endDate?.substring(0, 10)}</p>
            {/* <NumOfAppliers numOfAppliers={numOfAppliers} /> */}
          </div>
              </div>
          </Container>
          <ToastContainer />
    </div>
  );
};

export default OfferDetails;
