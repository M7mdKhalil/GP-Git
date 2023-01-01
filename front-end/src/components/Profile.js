import React from "react";
import CV from "react-cv";
import { useSelector } from "react-redux";

const Profile = () => {
    const showUser = useSelector((state) => state.user.userDetails);
    console.log(showUser)
  return (
    <CV
      personalData={{
        name: showUser.username,
        title: "Senior Software Developer",
        image: showUser.image?.url,
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
          content:
              showUser.bio,
          icon: "usertie",
        },
        {
          type: "common-list",
          title: "Education",
          icon: "graduation",
          items: [
            {
              title: showUser?.cv?.department?.label,
                  authority: showUser?.cv?.collage?.label
            }],
        },
        {
          type: "tag-list",
          title: "Skills Proficiency",
          icon: "rocket",
            items:showUser?.cv?.skill?.map(s => {
                return s.label
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
  );
};

export default Profile;
