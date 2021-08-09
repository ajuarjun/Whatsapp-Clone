import React from "react";
import "./Login.css";
import {Button} from "@material-ui/core";
import { auth, provider } from "../../firebase";
import {useStateValue} from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login(){
  const [{},dispatch] = useStateValue();
  const signIn = ()=>{
    auth
    .signInWithPopup(provider)
    .then((result) => dispatch({
      type: actionTypes.SET_USER,
      user: result.user,
      })
    )
    .catch((error) => alert(error.message));
  };
  return(
    <div className="login">
      <div className="login-container">
        <img
          src="https://th.bing.com/th/id/OIP.3dT8Z-l0xj3nntgZJHrKsQHaHa?w=150&h=180&c=7&o=5&dpr=1.25&pid=1.7"
          alt=""
        />
        <div className="login-text">
          <h1>Sign in to Chat</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
