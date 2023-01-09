import "../../stylesheets/login&register.css";
import { useFetch } from "use-http";
import { useState } from "react";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/userSlice";
import emailjs from "emailjs-com";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { PrimaryButton, TextButton } from "../UI/CustomButton";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let functionCalled = false;

const Login = (props) => {
  let dispatch = useDispatch();
  const { post, get } = useFetch("http://localhost:5000");
  const navigate = useNavigate();
  const [stateMsg, setstateMsg] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [click, setclick] = useState(false);
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [user, setuser] = useState({});
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const [Username, setUsername, removeUsername] = useSessionStorage(
    "Username",
    ""
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const submitHandler = async (e) => {
        e.preventDefault();
        functionCalled = false;
    const controller = new AbortController();
    const signal = controller.signal;
    const userData = await post("/user/login", { username, password });
    setstateMsg(userData?.msg);
        if (userData?.ok) {
      setislogin(true);
      setuserid(userData._id);
      setUsername(userData.username);
      setkind(userData.kind);
      dispatch(fetchUser({ userid: userData._id }));
      navigate("/");
      setstateMsg("");
    }
    return controller.abort();
  };

    const passwordHandler = async (e) => {
        e.preventDefault();
    const userData = await post("/user/login", { username, password });
        setclick(true);
        if (!userData.userfound) {
            toast.error(`${username} not found`, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.info('we sent a massege to your email', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }); }
    emailjs
      .send(
        "service_6vqix66",
        "template_jgbews8",
        {
          from_name: "Hire-Hub",
          message: "insert new password",
          email: userData.userfound.email,
        },
        "8wFgurEdp8xp-8mQa"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    };
    const msgHandler = () =>
    {
        if (!functionCalled) {
            toast.error(stateMsg, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            functionCalled = true;
        }
    }
  return (
    <>
      {islogin ? (
        navigate("/")
      ) : (
        <div className="cusContain">
          <form className="login">
            <h3 className="formHeader">Login</h3>
            <TextField
              label="Username"
              sx={{ width: "100%" }}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            ></TextField>
            {/* <TextField
              label="Password"
              sx={{ width: "100%" }}
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></TextField> */}
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <TextButton
                type="button"
                onClick={passwordHandler}
                sx={{ fontSize: 10 }}
              >
                Forget Password? reset now
              </TextButton>
            </FormControl>

            {stateMsg && msgHandler()}
            <div className="myButton">
              <PrimaryButton onClick={submitHandler}>Login</PrimaryButton>
            </div>
          </form>
        </div>
          )}
          <ToastContainer />
    </>
  );
};

export default Login;
