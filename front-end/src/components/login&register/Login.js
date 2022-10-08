import Container from "../Container";
import SideBar from "../SideBar";
import classes from "../../stylesheets/Input.module.css";

const Login = (props)=>{
    return <div className="main-content">
    <SideBar/>
    <Container>
    <form>
        <label htmlFor="name">Name</label>
        <input className={`${classes.textInput}`} id='name' type='text' minLength={10}/>
        <label htmlFor="email">Email</label>
        <input  className={`${classes.textInput}`} type='text' id='email' />
        <label htmlFor="password">Password</label>
        <input className={`${classes.textInput}`} type='password' id='password' minLength={10}/>
         <button>Login</button>
        
    </form></Container></div>
}

export default Login;