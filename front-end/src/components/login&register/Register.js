import '../../stylesheets/login&register.css'
import Container from '../Container';

const Register = (props)=>{
    return <div className='main-content'>
    <Container>
   <div className="screen">
       <div className="screen__content">
           <form className="login">
               <div className="login__field">
                   <i className="login__icon fas fa-user"></i>
                   <input type="text" className="login__input" placeholder="User name"/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-user"></i>
                   <input type='email' className="login__input" placeholder="email"/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type="password" className="login__input" placeholder="Password"/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type="password" className="login__input" placeholder="confirm Password"/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <textarea className="login__input" placeholder="inter your cv"/>
               </div>
               <div className="login__field">
                   <i className="login__icon fas fa-lock"></i>
                   <input type='file' className="login__input" placeholder="uploade image"/>
               </div>
               <button className="button login__submit">
                   <span className="button__text">Log In Now</span>
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

export default Register;