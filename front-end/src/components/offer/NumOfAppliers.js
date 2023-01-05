import { Chip } from "@mui/material";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import classes from "./offerStyleSheets/NumOfAppliers.module.css";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";

const NumOfAppliers = (props) => {
  return (
    <Chip
      icon={<PeopleOutlineRoundedIcon />}
      label={props.numOfAppliers}
      variant="outlined"
      size="small"
      sx={{padding: "5px", color: "gray"}}
    />
  );
};

export default NumOfAppliers;
