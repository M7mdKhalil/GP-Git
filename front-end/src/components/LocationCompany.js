import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { filteredActions } from "../store/filteredSlice";
import { TextField, ToggleButton } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
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

const LocationCompany = () => {
    const { post } = useFetch("http://localhost:5000");
    const [showForm, setShowForm] = useState(false);
    const showUser = useSelector((state) => state.user.userDetails);
    const [comps, setComps] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const comp = await post('/user/companylocation', { location: showUser?.location ? showUser?.location:' ' })
            console.log(comp?.com)
            setComps(comp?.com);
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
                <LocationCityIcon></LocationCityIcon>
                <h3>Companies in your location</h3>
            </ToggleButton>
            {!showForm && <KeyboardArrowDownRoundedIcon />}
            {showForm && <KeyboardArrowUpRoundedIcon />}
            {showForm && (
                <div className={classes.items}>
                    {comps?.map((comp) => (<div><img src={comp.image.url} /><h1>{comp.username}</h1></div>))}
                </div>
            )}
        </div>
        )
}

export default LocationCompany;