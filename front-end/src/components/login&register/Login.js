import "../../stylesheets/login&register.css";
import { useFetch } from "use-http";
import { useState } from "react";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/userSlice";
import emailjs from 'emailjs-com'
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { PrimaryButton } from "../UI/CustomButton";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = (props) => {
  let dispatch = useDispatch();
  const { post,get } = useFetch("http://localhost:5000");
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
    const controller = new AbortController();
    const signal = controller.signal;
    const userData = await post(
      "/user/login",
      { username, password }
    );
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

    const passwordHandler = async(e) => {
        e.preventDefault();
        const userData = await post(
            "/user/login",
            { username, password }
        );
        setclick(true);
        emailjs.send('service_6vqix66', 'template_jgbews8', {
            from_name: 'Hire-Hub',
            message: 'insert new password',
            email: userData.userfound.email

        }, '8wFgurEdp8xp-8mQa')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
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
            </FormControl>

            {stateMsg && <p className="errorMsg">{stateMsg}</p>}
            <div className="myButton">
              <PrimaryButton onClick={submitHandler}>Login</PrimaryButton>
                          </div>
                          <input type="button" value="Forget Password"
                              onClick={passwordHandler} />
                          {click && <p>send a massege updated to your email</p>}
                      </form>
                  </div>

      )}
    </>
  );
};

export default Login;
