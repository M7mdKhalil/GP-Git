import "../../stylesheets/login&register.css";
import Container from "../Container";
import { useFetch } from "use-http";
import { useState } from "react";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";

const Login = (props) => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [stateMsg, setstateMsg] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [kind, setkind, removekind] = useSessionStorage("kind", false);
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [userid, setuserid, removeuserid] = useSessionStorage("userid", "");
  const [Username, setUsername, removeUsername] = useSessionStorage(
    "Username",
    ""
  );
  const submitHandler = async (event) => {
    event.preventDefault();
    const userData = await post("/user/login", { username, password });
    setstateMsg(userData?.msg);
    if (userData.ok) {
      setislogin(true);
      setuserid(userData._id);
      setUsername(userData.username);
      setkind(userData.kind);
      window.location = "/";
      setstateMsg("");
    }
  };
  return (
    <>
      {islogin ? (
        (window.location = "/")
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
