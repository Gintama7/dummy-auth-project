import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {

  const authCtx = useContext(AuthContext);

  const passwordRef = useRef();
  const history = useHistory();


  const passwordChangeHandler=(e)=>{
    e.preventDefault();
    const enteredPassword = passwordRef.current.value;
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA7Juq0B1seuPsQE0EpCfQm7DB3vTIDEoU',{
    method:'POST',
    body:JSON.stringify({
      idToken:authCtx.token,
      password:enteredPassword,
      reuturnSecureToken:true
    }),headers:{
      'Content-Type':'application/json'
    }
     }).then((res)=>{
      if(res.ok)
      {
        return res.json().then((data)=>{
          authCtx.login(data.idToken);
          history.replace('/')
        })
      }else{
        return res.json().then((data)=>{
          const errorMessage = data.error.message;
          alert(errorMessage);
        })
      }
     })
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={passwordChangeHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
