import "../../stylesheets/login&register.css";
import Container from "../Container";
import { useFetch } from "use-http";
import { useState } from "react";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import {useNavigate } from 'react-router-dom'
const Login = (props) => {
  let dispatch = useDispatch();
  const { post} = useFetch(
    "http://localhost:5000"
    );
    const navigate = useNavigate();
  const [stateMsg, setstateMsg] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
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
    
  const submitHandler = async (e) => {
      e.preventDefault();
      const controller = new AbortController();
      const signal = controller.signal;
      const userData = await post("/user/login", { username, password }, { signal })
    setstateMsg(userData?.msg);
    if (userData.ok) {
      setislogin(true);
      setuserid(userData._id);
      setUsername(userData.username);
        setkind(userData.kind);
        navigate('/');
        setstateMsg("");
      }
      return controller.abort();
    };
  return (
    <>
          {islogin ? (
             navigate('/')
      ) : (
        <div className="cusContain">
            <form className="login">
              <Input
                label="Username"
                type="text"
                placeholder="User name"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <Input
                label="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
			  {stateMsg && <p className="errorMsg">{stateMsg}</p>}
              <div className="myButton">
                <Button onClick={submitHandler}>Login</Button>
              </div>
            </form>
        </div>
      )}
    </>
  );
};

export default Login;
