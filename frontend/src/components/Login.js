import React from "react";
import { auth, provider } from "../firebase";
import { useStateValue } from "../contextApi/userContext";
import { actionTypes } from "../contextApi/reducer";
const Login = () => {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <button onClick={signIn}>Login</button>
    </div>
  );
};

export default Login;
