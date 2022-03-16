import React, { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import QnA from "./pages/QnA";

import { login } from "./server";

function App() {
  const [loginError, setLoginError] = useState(false);
  const [userAuthToken, setUserAuthToken] = useState("");

  const handleLogin = (username, password) => {
    login(username, password).then((token) =>
      token
        ? setUserAuthToken(token)
        : setLoginError("Login Failed. Invalid Username / Password")
    );
  };

  return (
    <div className="App">
      {userAuthToken != "" ? (
        <QnA userAuthToken={userAuthToken} />
      ) : (
        <Login
          handleLogin={handleLogin}
          loginError={loginError}
          setLoginError={setLoginError}
        />
      )}
    </div>
  );
}

export default App;
