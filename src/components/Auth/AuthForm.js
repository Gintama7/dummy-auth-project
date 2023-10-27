import { useState, useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp,setIsSignUp] = useState(true);

  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
   
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsSignUp(true);
    if(isLogin){
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7Juq0B1seuPsQE0EpCfQm7DB3vTIDEoU',{
        method:'POST',
        body: JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken: true
        }),headers:{
          'Content-Type':'application/json'
        }
      }).then((res) =>{
        // setIsSignUp(false);
        if(res.ok){
            return res.json().then((data)=>{
              authCtx.login(data.idToken);
              history.replace('/');
            })
            
        }else{
          return res.json().then((data)=>{
            const errorMessage = data.error.message;
            alert(errorMessage);
          })
        }
      })

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7Juq0B1seuPsQE0EpCfQm7DB3vTIDEoU',{
        method:'POST',
        body: JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken: true
        }),headers:{
          'Content-Type':'application/json'
        }
      }).then((res) =>{
        setIsSignUp(false);
        if(res.ok){
          return res.json().then((data)=>{
            authCtx.login(data.idToken);
            history.replace('/');
          })
        }else{
          return res.json().then((data)=>{
            const errorMessage = data.error.message;
            alert(errorMessage);
          })
        }
      })
    }
  };



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button onClick={signUpHandler}>
            {/* {isSignUp ? 'Sign Up' : 'Sending Request....'} */}
          { !isLogin ? 'Sign Up': 'LogIn'}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
