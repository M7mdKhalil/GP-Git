import Container from "../Container";
import classes from "../../stylesheets/Input.module.css";
import SideBar from "../SideBar";
import styles from '../../stylesheets/Button.module.css'

const Register = (props)=>{
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
        <label htmlFor="confirm-password">confirm-password</label>
        <input className={`${classes.textInput}`} type='password' id='confirm-password'minLength={10}/>
        <label htmlFor="cv">CV</label>
        <input className={`${classes.textInput}`} id='cv' type='text'/>
        <label htmlFor="image">Image</label>
        <input className={`${classes.textInput}`} id='image' type='file'/>
         <button className={styles.submit}>submit</button>
        
    </form></Container></div>
}

export default Register;