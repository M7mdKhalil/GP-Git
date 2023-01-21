import { useEffect, useState } from "react";
import "../../stylesheets/login&register.css";
import Container from "../Container";
import { useFetch } from "use-http";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  InputAdornment,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import HorizontalLinearStepper from "../UI/Stepper";
import { PrimaryButton } from "../UI/CustomButton";
import InputArea from "../UI/InputArea";
import AutoCompleteInput from "../UI/AutoCompleteInput";
import AddChip from "../UI/AddChip";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DoneAllRoundedIcon from "@mui/icons-material/DoneRounded";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import AdminSideBar from "../Admin/AdminSidBar";

const CreateCompany = (props) => {
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
  const [imageDone, setimageDone] = useState(false);
  const [phonenumber, setphonenumber] = useState("");
  const [location, setlocation] = useState("");
  const [image, setimage] = useState("");
  const [bio, SetBio] = useState("");
  const [kind, setkind] = useState("");
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
    event.preventDefault();
    const userData = await post("/user/company", {
      username,
      email,
      bio,
      password,
      image,
      phonenumber,
      location: location.label,
      kind,
    });
    setstateMsg(userData?.msg);
    if (userData.ok) {
      //   setislogin(true);
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

  return (
    <>
      <div className="cusContain">
        <AdminSideBar active="createCompany" style={{marginTop: "200px"}}/>
        <form className="register">
          <HorizontalLinearStepper
            currentStep={currentStepHandler}
            SubmitButton={
              <PrimaryButton
                onClick={submitHandler}
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
                      label="username"
                      value={username}
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
                    sx={{ width: 800 }}
                    placeholder="example@gmail.com"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  ></TextField>

                  <TextField
                    label="Password"
                    type="password"
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
                    sx={{ width: 800 }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></TextField>
                  <AutoCompleteInput
                    label="City"
                    options={countries}
                    defaultValue="Nablus"
                    onChange={(e, newOption) => {
                      setlocation(newOption);
                    }}
                  ></AutoCompleteInput>
                </div>
              ) : (
                ""
              )}

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
                      onChange={(e) => {
                        SetBio(e.target.value);
                      }}
                    ></InputArea>
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
    </>
  );
};

export default CreateCompany;
