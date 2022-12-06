import { useState } from "react";
import "../../stylesheets/login&register.css";
import Container from "../Container";
import { useFetch } from "use-http";
import { useSessionStorage } from "react-use-storage";
import Button from "../Button";
import Input from "../Input";

const Register = (props) => {
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:5000"
  );
  const [islogin, setislogin, removeislogin] = useSessionStorage(
    "islogin",
    false
  );
  const [stateMsg, setstateMsg] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [cv, setcv] = useState("");
  const [imageDone, setimageDone] = useState(false);
  const [phonenumber, setphonenumber] = useState("");
  const [location, setlocation] = useState("");
  const [image, setimage] = useState({});
  const [kind, setkind] = useState("");

  const imageHandler = (e)=>{
    e.preventDefault();
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dar969tda', 
      uploadPreset: 'test-w',
    folder:'HireHup'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          setimage({url:result.info.url,public_id:result.info.public_id})
          setimageDone(true)
        }
      }
    )
      myWidget.open();
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const userData = await post("/user", {
      username,
      email,
      cv,
      password,
      image,
      phonenumber,
      location,
      kind,
    });
    setstateMsg(userData.msg);
    if (userData.ok) {
      window.location = "/login";
    }
  };

  return (
    <>
      {islogin ? (
        (window.location = "/")
      ) : (
        <div className="cusContain">
          <form className="register">
            <div className="info">
              <div>
                <Input
                  type="text"
                  placeholder="User name"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />

                <Input
                  type="email"
                  placeholder="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />

                <Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />

                <Input type="password" placeholder="confirm Password" />
                <button
                  id="upload_widget" className="cloudinary-button"
                  onClick={imageHandler}
                >uploade image</button>
                {imageDone&&<p>done</p>}
              </div>
              <div>
                <textarea
                  placeholder="inter your cv"
                  onChange={(e) => {
                    setcv(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="myButton">
              <Button  onClick={submitHandler}>SignUp</Button>
            </div>
          </form>
          {stateMsg && <h1>{stateMsg}</h1>}
        </div>
      )}
    </>
  );
};

export default Register;
