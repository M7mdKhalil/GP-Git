import React from "react";
import CV from "react-cv";
import { useSelector } from "react-redux";
import classes from "../stylesheets/Profile.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Badge } from "@mui/material";
import { PrimaryButton, TextButton } from "./UI/CustomButton";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import NavTabs from "./UI/NavTabs";

const Profile = () => {
  const showUser = useSelector((state) => state.user.userDetails);
  console.log(showUser);
  return (
    <div className={classes.container}>
      <div className={classes.info}>
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
            src={showUser?.image ? showUser.image.url : "/broken-image.jpg"}
          />
        </Badge>
        <div className={classes.data}>
          <h2>{showUser?.username}</h2>
          <p>{showUser?.bio}</p>
        </div>
        <PrimaryButton
          sx={{ width: 500 }}
          startIcon={<ModeEditOutlineRoundedIcon />}
        >
          Edit
        </PrimaryButton>
      </div>
      <div className={classes.cvCard}>
        <CV
          personalData={{
            title: "Senior Software Developer",
            contacts: [
              { type: "email", value: showUser.email },
              { type: "phone", value: showUser.phonenumber },
              { type: "location", value: showUser?.cv?.country?.label },
              { type: "website", value: "example.com" },
              { type: "linkedin", value: "linkedin.com/in/notexists" },
              { type: "github", value: "github.com/404" },
            ],
          }}
          sections={[
            {
              type: "text",
              title: "Career Profile",
              content: showUser.bio,
              icon: "usertie",
            },
            {
              type: "common-list",
              title: "Education",
              icon: "graduation",
              items: [
                {
                  title: showUser?.cv?.department?.label,
                  authority: showUser?.cv?.collage?.label,
                },
              ],
            },
            {
              type: "tag-list",
              title: "Skills Proficiency",
              icon: "rocket",
              items: showUser?.cv?.skill?.map((s) => {
                return s.label;
              }),
            },
            {
              type: "experiences-list",
              title: "Experiences",
              description: "Optional",
              icon: "archive",
              items: [
                {
                  title: "Lead Software Developer",
                  company: "Some Company Example INC",
                  description: "I'm working as a lead developer yeeeey!",
                  companyMeta: "",
                  datesBetween: "2017.10 - Present",
                  descriptionTags: ["Javascript", "React"],
                },
                {
                  title: "Software Developer",
                  company: "Some Company Example INC",
                  description:
                    "I'm using ReactJS and working as a front-end developer",
                  companyMeta: "Little info about company",
                  datesBetween: "2016.8 - 2017.10",
                },
                {
                  title: "Intern",
                  company: "Some Software Example INC",
                  description: "I was warming up.",
                  companyMeta: "SF USA",
                  datesBetween: "2012.06 - 2012.10",
                },
              ],
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
      </div>
    </div>
  );
};

export default Profile;
