import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { filteredActions } from "../store/filteredSlice";
import { TextField, ToggleButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
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

const LocationOffers = () => {
    const { post } = useFetch("http://localhost:5000");
    const [showForm, setShowForm] = useState(false);
    const showUser = useSelector((state) => state.user.userDetails);
    const [offs, setOffs] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const offer = await post('/user/offerlocation', { location: showUser?.location ? showUser?.location : ' ' })
            console.log(offer?.off)
            setOffs(offer?.off);
        }
        fetchData()
    }, [post])
    return (
        <div className={classes.myForm}>
            <ToggleButton
                value="check"
                selected={showForm}
                onChange={() => {
                    setShowForm(!showForm);
                }}
                className={classes.formHeader}
            >
                <AssignmentIcon></AssignmentIcon>
                <h3>Offers in your location</h3>
            </ToggleButton>
            {!showForm && <KeyboardArrowDownRoundedIcon />}
            {showForm && <KeyboardArrowUpRoundedIcon />}
            {showForm && (
                <div className={classes.items}>
                    {offs?.map((off) => (<div><img src={off.author.image.url} /><h1>{off.title}</h1></div>))}
                </div>
            )}
        </div>
    )
}

export default LocationOffers;