import React, { useState } from "react";
import AddHomeWorkRoundedIcon from "@mui/icons-material/AddHomeWorkRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddOffer from "../offer/AddOffer";

const AdminSideBar = (props) => {
  const [showAddOffer, setShowAddOffer] = useState(false);

  return (
    <div className="app-sidebar" style={props.style}>
      <a href className={`app-sidebar-link ${props.active == "dashboard"? "active" : ""}`}>
        <GridViewRoundedIcon
          onClick={() => {
            window.location = "/dashboard";
          }}
        />
      </a>
      <a href className={`app-sidebar-link ${props.active == "createCompany"? "active" : ""}`}>
        <AddHomeWorkRoundedIcon
          onClick={() => {
            window.location = "/company";
          }}
        />
      </a>
      <a href className="app-sidebar-link">
        <PersonAddAltRoundedIcon
          onClick={() => {
            window.location = "/register";
          }}
        />
      </a>
      <a href className="app-sidebar-link">
        <PostAddRoundedIcon
          onClick={() => {
            setShowAddOffer(true);
          }}
        />
        {showAddOffer && (
          <AddOffer
            onClose={() => {
              setShowAddOffer(false);
            }}
          />
        )}
      </a>
    </div>
  );
};

export default AdminSideBar;
