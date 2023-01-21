import { useEffect, useState } from "react";
import "../../stylesheets/login&register.css";
import Container from "../Container";
import { useFetch } from "use-http";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
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
import { useSelector } from "react-redux";

const Register = (props) => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const showUser = useSelector((state) => state.user.userDetails);

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
    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Create New Account",
    });
    event.preventDefault();
    const userData = await post("/user", {
      username,
      email,
      bio,
      cv,
      password,
      image,
      phonenumber,
      location,
      kind,
    });
    setstateMsg(userData.msg);
    if (userData.ok) {
      navigate("/login");
    } else {
      setHandleError(true);
    }
  };

  const currentStepHandler = (step) => {
    setStepNow(step);
  };

  useEffect(() => {
    setstateMsg("");
  }, [stepNow]);

  useEffect(() => {
    setHandleError(false);
  }, [username]);

  const validate = () => {
    setErrors([]);
    if (username.length < 7 || username.length > 20) {
      setErrors((oldArray) => [
        ...oldArray,
        { name: "username", text: "Must be between 7 and 20 character" },
      ]);
    }
    if (
      !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)
    ) {
      setErrors((oldArray) => [
        ...oldArray,
        { name: "email", text: "Not valid Email" },
      ]);
    }
    if (!/[a-zA-Z]/g.test(password)) {
      setErrors((oldArray) => [
        ...oldArray,
        { name: "password", text: "Must contain at least one letter" },
      ]);
    }
    if (password.length < 8) {
      setErrors((oldArray) => [
        ...oldArray,
        { name: "password", text: "Must be more than 7 character" },
      ]);
    }
    if (password !== confirmPassword) {
      setErrors((oldArray) => [
        ...oldArray,
        { name: "confirmPassword", text: "Not equals to password" },
      ]);
    }
  };

  const checkErrors = (name) => {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].name === name) {
        return errors[i].text;
      }
    }
  };
  return (
    <>
      {showUser.kind !== "admin" && islogin  ? (
        (window.location = "/")
      ) : (
        <div className="cusContain">
          <form className="register">
            <HorizontalLinearStepper
              currentStep={currentStepHandler}
              SubmitButton={
                <PrimaryButton
                  onClick={(e) => {
                    validate();
                    if (errors.length === 0) {
                      submitHandler(e);
                    } else {
                      setStepNow(0);
                    }
                  }}
                  endIcon={<DoneAllRoundedIcon />}
                >
                  finish & SignUp
                </PrimaryButton>
              }
            >
              <div className="info">
                {stepNow == 0 || stepNow == -1 ? (
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
                    ) : (
                      <TextField
                        hel
                        label="username"
                        value={username}
                        error={checkErrors("username") ? true : false}
                        helperText={checkErrors("username")}
                        sx={{ width: 800 }}
                        placeholder="*choose unique username"
                        onChange={(e) => {
                          setusername(e.target.value);
                        }}
                      ></TextField>
                    )}

                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      error={checkErrors("email") ? true : false}
                      helperText={checkErrors("email")}
                      sx={{ width: 800 }}
                      placeholder="example@gmail.com"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    ></TextField>

                    <TextField
                      label="Password"
                      type="password"
                      error={checkErrors("password") ? true : false}
                      helperText={checkErrors("password")}
                      value={password}
                      sx={{ width: 800 }}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    ></TextField>

                    <TextField
                      label="Confirm password"
                      type="password"
                      value={confirmPassword}
                      error={checkErrors("confirmPassword") ? true : false}
                      helperText={checkErrors("confirmPassword")}
                      sx={{ width: 800 }}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></TextField>
                  </div>
                ) : (
                  ""
                )}
                {stepNow
                  ? stepNow == 1 && (
                      <div>
                        <AutoCompleteInput
                          label="Univarsity / Collage"
                          options={collages}
                          value={cv.collage}
                          onChange={(e, newOption) => {
                            setcv({ ...cv, collage: newOption });
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Controllable" />
                          )}
                        ></AutoCompleteInput>
                        <AutoCompleteInput
                          label="Department"
                          options={departments}
                          defaultValue={cv.department}
                          onChange={(e, newOption) => {
                            setcv({ ...cv, department: newOption });
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
                          defaultValue={cv.country}
                          onChange={(e, newOption) => {
                            setcv({ ...cv, country: newOption });
                          }}
                        ></AutoCompleteInput>
                        <AddChip
                          sx={{ width: 500 }}
                          defaultSkills={cv.skill}
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
                    )
                  : ""}

                {stepNow
                  ? stepNow == 2 && (
                      <div>
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
                            src={imageDone ? image.url : "/broken-image.jpg"}
                          />
                        </Badge>
                      </div>
                    )
                  : ""}
                {stepNow
                  ? stepNow == 2 &&
                    imageDone && (
                      <p className="successMessage">Uploaded Successfully</p>
                    )
                  : ""}
                {stepNow
                  ? stepNow == 2 && (
                      <InputArea
                        placeholder="BIO"
                        value={bio}
                        sx={{ width: 900 }}
                        onChange={(e) => {
                          SetBio(e.target.value);
                        }}
                      ></InputArea>
                    )
                  : ""}

                {stepNow
                  ? stepNow == 2 && (
                      <TextButton
                        sx={{ display: "flex", marginTop: 10, zIndex: "9" }}
                      >
                        {/* <input
                          multiple
                          type="file"
                          style={{ zIndex: "20" }}
                          hidden
                          onChange={(file) => {
                            setCvFile(file);
                          }}
                        /> */}
                        Upload your cv file
                      </TextButton>
                    )
                  : ""}
              </div>
              {stateMsg && (
                <h1 style={{ color: "red" }}>
                  {username} {stateMsg}
                </h1>
              )}
            </HorizontalLinearStepper>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
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
export default Register;
