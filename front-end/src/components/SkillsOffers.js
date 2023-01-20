import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { filteredActions } from "../store/filteredSlice";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  ToggleButton,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import classes from "../stylesheets/SideBar.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextButton } from "./UI/CustomButton";
import ClearIcon from "@mui/icons-material/Clear";
import "../stylesheets/image.css";
import { List } from "@mui/material";

const SkillsOffers = (props) => {
  const { post } = useFetch("http://localhost:5000");
  const [showForm, setShowForm] = useState(false);
  const showUser = useSelector((state) => state.user.userDetails);
  const [offs, setOffs] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log(showUser?.cv?.skill);
      const offer = await post("/user/offerskills", {
        skills: showUser?.cv?.skill ? showUser?.cv?.skill : [],
      });
      setOffs(offer?.off);
    };
    fetchData();
  }, [showForm]);
  return (
    <div className={classes.myForm}>
      <ToggleButton
        value="check"
        selected={props.selected}
        onChange={props.onChange}
        className={classes.formHeader}
      >
        <AssignmentIcon></AssignmentIcon>
        <h3>Offers suits your Skills</h3>
      </ToggleButton>
      {!props.selected && <KeyboardArrowDownRoundedIcon />}
      {props.selected && <KeyboardArrowUpRoundedIcon />}
      {props.selected && (
        <div>
          <List className={classes.appliersList}>
            {offs?.map((off) => (
              <ListItem
                style={{padding: "0"}}
                sx={{ borderRaduis: "10px" }}
                key={off._id}
              >
                <ListItemButton
                  onClick={() => {
                    window.location = `/offer/${off._id}`;
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={off?.author?.image?.url}></Avatar>
                  </ListItemAvatar>
                  <ListItemText>{off.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default SkillsOffers;
