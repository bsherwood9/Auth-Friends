import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { FriendContext } from "./contexts/FriendContext";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Friends from "./components/Friends";
import "./App.css";

function App() {
  const [friendList, setFriendList] = useState([]);
  const [logState, setLogState] = useState(false);
  return (
    <FriendContext.Provider
      value={{ friendList, setFriendList, logState, setLogState }}
    >
      <div className="App">
        <ul>
          <div>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <li>
            <Link to="/login">{logState ? "Logout" : "Login"}</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <ProtectedRoute path="/friends" component={Friends} />
        </Switch>
      </div>
    </FriendContext.Provider>
  );
}

export default App;
