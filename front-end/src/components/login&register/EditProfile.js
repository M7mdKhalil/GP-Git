import { useEffect, useState } from "react";
import "../../stylesheets/login&register.css";
import Container from "../Container";
import { useFetch } from "use-http";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Badge,
    InputAdornment,
    OutlinedInput,
    TextareaAutosize,
    TextField,
} from "@mui/material";
import HorizontalLinearStepper from "../UI/Stepper";
import { PrimaryButton, TextButton } from "../UI/CustomButton";
import InputArea from "../UI/InputArea";
import AutoCompleteInput from "../UI/AutoCompleteInput";
import AddChip from "../UI/AddChip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DoneAllRoundedIcon from "@mui/icons-material/DoneRounded";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";


const EditProfile = (props) => {
    const params = useParams();
    const { get, post, response, loading, error } = useFetch(
        "http://localhost:5000"
    );
    const navigate = useNavigate();
    const [islogin, setislogin, removeislogin] = useSessionStorage(
        "islogin",
        false
    );
    const [stateMsg, setstateMsg] = useState("");
    const [handleError, setHandleError] = useState(false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setemail] = useState("");
    const [cv, setcv] = useState({
        collage: collages[0],
        department: undefined,
        country: undefined,
        skill: [],
    });
    const [errors, setErrors] = useState([{}]);
    const [imageDone, setimageDone] = useState(false);
    const [phonenumber, setphonenumber] = useState("");
    const [location, setlocation] = useState("");
    const [image, setimage] = useState("");
    const [bio, SetBio] = useState("");
    const [kind, setkind] = useState("");
    const [cvFile, setCvFile] = useState("");
    const [stepNow, setStepNow] = useState(-1);
    const [userdetails, setUserDetails] = useState({});

    const imageHandler = (e) => {
        e.preventDefault();
        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dar969tda",
                uploadPreset: "test-w",
                folder: "HireHup",
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    setimage({ url: result.info.url, public_id: result.info.public_id });
                    setimageDone(true);
                }
            }
        );
        myWidget.open();
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const resolveAfter3Sec = new Promise((resolve) =>
            setTimeout(resolve, 3000)
        );
        toast.promise(resolveAfter3Sec, {
            pending: "Edit account",
        });
        const userData = await post("/editprofile", {
            id: params.id,
            username,
            email,
            bio,
            cv,
            password,
            image,
            phonenumber,
            location,
            kind
        });
        setstateMsg(userData.msg);
            navigate(`/profile/${params.id}`);
    };

    const currentStepHandler = (step) => {
        setStepNow(step);
    };

    useEffect(() => {
        const fetchdata = async () => {
            const user = await get(`/user/${params.id}`)
            console.log(user);
            if (user) {
                setUserDetails(user)
                SetBio(user.bio)
                setemail(user.email)
                setusername(user.username)
                setphonenumber(user.phonenumber)
                setcv(user.cv)
                setlocation(user.location);

            }
        }
        fetchdata();
    }, [params.id])

    useEffect(() => {
        setstateMsg("");
    }, [stepNow]);

    useEffect(() => {
        setHandleError(false);
    }, [username]);

    const validate = () => {
        setErrors([]);
        if (username.length < 7 || username.length > 20) { setErrors(oldArray => [...oldArray, { name: 'username', text: 'Must be between 7 and 20 character' }]) }
        if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email))) { setErrors(oldArray => [...oldArray, { name: 'email', text: 'Not valid Email' }]) }
        if (!(/[a-zA-Z]/g.test(password))) { setErrors(oldArray => [...oldArray, { name: 'password', text: 'Must contain at least one letter' }]) }
        if (password.length < 8) { setErrors(oldArray => [...oldArray, { name: 'password', text: 'Must be more than 7 character' }]) }
        if (password !== confirmPassword) { setErrors(oldArray => [...oldArray, { name: 'confirmPassword', text: 'Not equals to password' }]) }
    }

    const checkErrors = (name) => {
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].name === name) {
                return errors[i].text;
            }
        }
    }
    console.log(userdetails?.cv?.collage?.label);
    const arr = [];
    userdetails?.cv?.skill?.map(s => { arr.push(s); });
    console.log(arr);

    return (
        <div className='marg'>
            {!islogin ? (
                (window.location = "/login")
            ) : (
                <div className="cusContain">
                    <form className="register">
                        
                            <div className="info">
                                    <div>
                                        {handleError ? (
                                            <TextField
                                                error
                                                helperText="username is already exist!"
                                                label="username"
                                                value={username}
                                                sx={{ width: 800 }}
                                                onChange={(e) => {
                                                    setusername(e.target.value);
                                                }}
                                            ></TextField>
                                        ) : (<>
                                                <p>_____________________________user account information_____________________________</p>
                                            <TextField
                                                value={username}
                                                hel
                                                label="username"
                                                error={checkErrors('username') ? true : false}
                                                helperText={checkErrors('username')}
                                                sx={{ width: 800 }}
                                                onChange={(e) => {
                                                    setusername(e.target.value);
                                                }}
                                                ></TextField></>
                                        )}

                                    <TextField
                                        value={email}
                                            label="Email"
                                            type="email"
                                            error={checkErrors('email') ? true : false}
                                            helperText={checkErrors('email')}
                                            sx={{ width: 800 }}
                                            onChange={(e) => {
                                                setemail(e.target.value);
                                            }}
                                        ></TextField>

                                    </div>
                                
                                    <div>
                                        <p>_____________________________CV information_____________________________</p>
                                    <AutoCompleteInput
                                        value={{ label: cv?.collage?.label }}
                                                label="Univarsity / Collage"
                                        options={collages}
                                        
                                                onChange={(e, newOption) => {
                                                    setcv({ ...cv, collage: newOption });
                                                }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Controllable"  />
                                                )}
                                            ></AutoCompleteInput>
                                    <AutoCompleteInput

                                        value={{ label: cv?.department?.label }}
                                                label="Department"
                                                options={departments}
                                        onChange={(e, newOption) => {
                                            setcv({ ...cv, department: newOption }); console.log(cv?.department)
                                        }}
                                            ></AutoCompleteInput>
                                            <TextField
                                                label="Phone number"
                                        sx={{ width: 400 }}
                                        value={phonenumber}
                                                onChange={(e) => setphonenumber(e.target.value)}
                                            ></TextField>
                                    <AutoCompleteInput
                                        label="City"
                                        options={countries}
                                        value={{label: cv?.country?.label}}
                                                onChange={(e, newOption) => {
                                                    setcv({ ...cv, country: newOption });
                                                }}
                                            ></AutoCompleteInput>
                                    <AddChip
                                        sx={{ width: 500 }}
                                        defaultSkills={arr}
                                        
                                                label="Skills"
                                                skills={(allSkills) => {
                                                    setcv({ ...cv, skill: [...allSkills] });
                                                }}
                                            ></AddChip>

                                            {/* <InputArea
                          onChange={(e) => {
                            setcv(e.target.value);
                          }}
                        /> */}
                                        </div>
                                    
                                     
                                    <div>
                                        <p>____________________________________________Other Details_________________________________________</p>
                                            <Badge
                                                className="imageBadge"
                                                color="secondary"
                                                overlap="circular"
                                                badgeContent={<AddIcon />}
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                }}
                                                onClick={imageHandler}
                                            >
                                                <Avatar
                                            sx={{ width: 120, height: 120 }}
                                            src={imageDone ? image.url : userdetails?.image?.url||"/broken-image.jpg"}
                                                />
                                            </Badge>
                                        </div>
                                    {
                                        imageDone && (
                                            <p className="successMessage">Uploaded Successfully</p>
                                        )}
                                    
                                            <InputArea
                                    placeholder="BIO"
                                    value={bio}
                                                sx={{ width: 900 }}
                                                onChange={(e,v) => {
                                                    SetBio(v);
                                                }}
                                            ></InputArea>
                            

                                        <TextButton
                                            sx={{ display: "flex", marginTop: 10, zIndex: "9" }}
                                        >
                                            <input
                                                multiple
                                                type="file"
                                                style={{ zIndex: "20" }}
                                                hidden
                                                onChange={(file) => {
                                                    setCvFile(file);
                                                }}
                                            />
                                            Upload your cv file
                                        </TextButton>
                                    
                            </div>
                            {stateMsg && (
                                <h1 style={{ color: "red" }}>
                                    {username} {stateMsg}
                                </h1>
                            )}

                            <PrimaryButton
                                        onClick={(e) => {
                                            validate()
                                            if (errors.length === 0) {
                                                submitHandler(e)
                                            }
                                        }}
                                        endIcon={<DoneAllRoundedIcon />}
                                    >
                                finish & SignUp
                            </PrimaryButton>
                    </form>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};


const collages = [
    { label: "Palestine Technical University khadoori" },
    { label: "An-Najah National University" },
    { label: "Birzeit University" },
    { label: "Hebron University" },
    { label: "Palestine Polytechnic University" },
    { label: "Arab American University" },
    { label: "Bethlehem University" },
    { label: "Al-Quds Open University" },
    { label: "Modern University Collage" },
    { label: "al zaytona University" },
];
const departments = [
    { label: "" },
    { label: "Computer Systems Engineering" },
    { label: " Electrical Engineering " },
    { label: "Mechanical Engineering " },
    { label: " Electrical Eng-Industrial Automation" },
    { label: "Communications Engineering Technology" },
    { label: "Building Engineering" },
    { label: "Automative Engineering" },
    { label: "Physiscs" },
    { label: " Computer Science" },
    { label: "Information System" },
];
const countries = [
    { label: "" },
    { label: "Jerusalem" },
    { label: "Hebron" },
    { label: "Bethlehem" },
    { label: "Nablus" },
    { label: "Jericho" },
    { label: "Tulkarm" },
    { label: "Ramallah" },
    { label: "Jenin" },
    { label: "selfit" },
    { label: "Tubas" },
    { label: "Qalqilya" },
];


export default EditProfile;