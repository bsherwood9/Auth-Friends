import React, { useState, useContext } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { FriendContext } from "../contexts/FriendContext";

const LoginForm = props => {
  const { logState, setLogState } = useContext(FriendContext);
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const login = e => {
    e.preventDefault();
    !logState
      ? axiosWithAuth()
          .post("/login", creds)
          .then(res => {
            localStorage.setItem("token", res.data.payload);
            setLogState(true);
            props.history.push("/friends");
          })
          .catch(err => {
            localStorage.removeItem("token");
            console.log("invalid login: ", err);
          })
      : localStorage.removeItem("token");
    setLogState(false);
  };
  return (
    <>
      <form onSubmit={login}>
        {!logState ? (
          <>
            <h2>Username</h2>
            <input
              type="text"
              name="username"
              value={creds.username}
              onChange={handleChange}
            />
            <h2>Password</h2>
            <input
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
            />
            <button>Log in</button>
          </>
        ) : (
          <>
            <p>You are currently logged in...</p>
            <p>Please hit the button to log out.</p>
            <button>Logout</button>
          </>
        )}
      </form>
    </>
  );
};

export default LoginForm;
