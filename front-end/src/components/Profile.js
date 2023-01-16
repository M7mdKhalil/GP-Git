import React, { useEffect } from "react";
import CV from "react-cv";
import { useSelector } from "react-redux";
import classes from "../stylesheets/Profile.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Badge } from "@mui/material";
import { PrimaryButton, TextButton } from "./UI/CustomButton";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import NavTabs from "./UI/NavTabs";
import { useFetch } from "use-http";
import { useParams } from "react-router";
import { useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { useSessionStorage } from "react-use-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let fc = false;

const Profile = () => {
  const showUser = useSelector((state) => state.user.userDetails);
  const params = useParams();
  const [userdetails, setuserdetails] = useState({});
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      const userdetails = await axios
        .get(`http://localhost:5000/user/${params.id}`)
        .then(function (response) {
          // handle success
          setuserdetails(response.data);
        });
      if (fc === false) {
        const resolveAfter3Sec = new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );
        toast.promise(resolveAfter3Sec, {
          pending: "Loading profile",
        });
      }
      fc = true;
    };
    fetchData();
  }, [params]);

  return (
    <div className={classes.container}>
      {/* <div className={classes.info}>
        <Badge
          className={classes.imageBadge}
          color="secondary"
          overlap="circular"
          badgeContent={<AddIcon />}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Avatar
            sx={{ width: 120, height: 120 }}
            src={
              userdetails?.image ? userdetails.image.url : "/broken-image.jpg"
            }
          />
        </Badge>
        <div className={classes.data}>
          <h2>{userdetails.username}</h2>
          <p>{userdetails.bio}</p>
        </div>
        {userdetails?._id === showUser?._id && islogin && (
          <PrimaryButton
            sx={{ width: 500 }}
            startIcon={<ModeEditOutlineRoundedIcon />}
          >
            Edit
          </PrimaryButton>
        )}
      </div> */}
      <div className={classes.cvCard}>
        {userdetails.kind === "user" ? (
          <CV
                      personalData={{
                          name: userdetails.username,
                          title: userdetails.cv?.department?.label,
                          image: userdetails.image?.url,
              contacts: [
                { type: "email", value: userdetails.email },
                { type: "phone", value: userdetails.phonenumber },
                { type: "location", value: userdetails.cv?.country?.label },
                { type: "website", value: "example.com" },
                { type: "linkedin", value: "linkedin.com/in/notexists" },
                { type: "github", value: "github.com/404" },
              ],
            }}
            
            sections={[
              {
                type: "text",
                title:
                  userdetails.kind === "company" ? "Bio" : "Career Profile",
                    content: userdetails.bio ? userdetails.bio:'No Career Profile',
                icon: "usertie",
              },
              {
                type: "common-list",
                title: "Education",
                icon: "graduation",
                items: [
                  {
                        title: userdetails.cv?.department?.label ? userdetails.cv?.department?.label: 'No Department',
                        authority: userdetails.cv?.collage?.label ? userdetails.cv?.collage?.label:'No college',
                  },
                ],
              },
              {
                type: "tag-list",
                title: "Skills Proficiency",
                icon: "rocket",
                items: userdetails.cv?.skill?.map((s) => {
                  return s.label;
                }),
              },
              {
                type: "common-list",
                title: "Languages",
                icon: "language",
                items: [
                  {
                    authority: "English",
                    authorityMeta: "Professional",
                  },
                  {
                    authority: "Spanish",
                    authorityMeta: "Beginner",
                  },
                ],
              },
            ]}
            branding={false}
          />
        ) : (
          <CV
            personalData={{
              title: `${userdetails.username} Company`,
              contacts: [
                { type: "email", value: userdetails.email },
                { type: "phone", value: userdetails.phonenumber },
                { type: "location", value: userdetails.cv?.country?.label },
                { type: "website", value: "example.com" },
                { type: "linkedin", value: "linkedin.com/in/notexists" },
                { type: "github", value: "github.com/404" },
              ],
            }}
            sections={[
              {
                type: "text",
                title:
                  userdetails.kind === "company" ? "Bio" : "Career Profile",
                content: userdetails.bio,
                icon: "usertie",
              },
            ]}
            branding={false}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
