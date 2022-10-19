import { useState } from 'react';
import '../../stylesheets/login&register.css'
import Container from '../Container';
import { useFetch } from 'use-http';

const Register = (props)=>{
    const {get,post,response,loading,error}=useFetch('http://localhost:5000');
    const [stateMsg,setstateMsg]=useState('')
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [email,setemail]=useState('');
    const [cv,setcv]=useState('');
    const [phonenumber,setphonenumber]=useState('');
    const [location,setlocation]=useState('');
    const [image,setimage]=useState('');
    const [kind,setkind]=useState('');
const submitHandler =async (event)=>{
    event.preventDefault();
const userData = await post('/user',{username,email,cv,password,image,phonenumber,location,kind});
setstateMsg(userData.msg);
if(userData.ok){
    window.location= '/login';
}
}    
    return <div className='main-content'>
    <Container>
        {stateMsg && <h1>{stateMsg}</h1>}
   <div className="screen">
       <div className="screen__content">
           <form className="login">
               <div className="login__field">
                   <i className="login__icon fas fa-user"></i>
                   <input type="text" className="login__input" placeholder="User name" onChange={e=>{setusername(e.target.value)}}/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-user"></i>
                   <input type='email' className="login__input" placeholder="email" onChange={e=>{setemail(e.target.value)}}/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type="password" className="login__input" placeholder="Password" onChange={e=>{setpassword(e.target.value)}}/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type="password" className="login__input" placeholder="confirm Password"/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <textarea className="login__input" placeholder="inter your cv" onChange={e=>{setcv(e.target.value)}}/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type='file' className="login__input" placeholder="uploade image" onChange={e=>{setimage(e.target.value)}}/>
               </div>
               <button className="button login__submit" onClick={submitHandler}>
                   <span className="button__text">Register Now</span>
                   <i className="button__icon fas fa-chevron-right"></i>
               </button>				
           </form>
           <div className="social-login">
           </div>
       </div>
       <div className="screen__background">
           <span className="screen__background__shape screen__background__shape4"></span>
           <span className="screen__background__shape screen__background__shape3"></span>		
           <span className="screen__background__shape screen__background__shape2"></span>
           <span className="screen__background__shape screen__background__shape1"></span>
       
   </div></div>
</Container>
</div>
}

export default Register;