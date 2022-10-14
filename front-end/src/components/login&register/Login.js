import '../../stylesheets/login&register.css'
import Container from '../Container';
import { useFetch } from 'use-http';
import { useState } from 'react';
import {useSessionStorage} from 'react-use-storage'

const Login = (props)=>{
	const {get,post,response,loading,error}=useFetch('http://localhost:5000');
	const [stateMsg,setstateMsg]=useState('');
	const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
	const [islogin,setislogin,removeislogin]=useSessionStorage('islogin',false);
	const [userid,setuserid,removeuserid]=useSessionStorage('userid','');
	const [Username,setUsername,removeUsername]=useSessionStorage('Username','');
	const submitHandler = async(event)=>{
		event.preventDefault();
		const userData =await post('/user/login',{username,password});
		setstateMsg(userData.msg);
		if(userData.ok){
			setislogin(true);
			setuserid(userData._id);
			setUsername(userData.username);
			window.location= '/';
			setstateMsg('');
		}
		}    
    return <div className='main-content'>
		{stateMsg&&<h1>{stateMsg}</h1>}
     <Container>
	<div className="screen">
		<div className="screen__content">
			<form className="login">
			<div className="login__field">
                   <i className="login__icon fas fa-user"></i>
                   <input type="text" className="login__input" placeholder="User name" onChange={e=>{setusername(e.target.value)}}/>
               </div>
			   <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type="password" className="login__input" placeholder="Password" onChange={e=>{setpassword(e.target.value)}}/>
               </div>
				<button className="button login__submit"onClick={submitHandler} >
					<span className="button__text" >Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
            <div class="social-login">
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		
	</div></div>
</Container>
</div>
}

export default Login;