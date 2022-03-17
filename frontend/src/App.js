import React, { useState } from "react";
import Login from "./pages/Login";
import QnA from "./pages/QnA";
import * as Server from "./server";

export default function App() {
  const [loginError, setLoginError] = useState("");
  const [userAuthToken, setUserAuthToken] = useState("");

  const handleLogin = async (username, password) => {
    const LOGIN_FAILURE_MSG = "Login Failed. Invalid Username / Password";
    const token = await Server.login(username, password);
    token ? setUserAuthToken(token) : setLoginError(LOGIN_FAILURE_MSG);
  };

  if (userAuthToken == "")
    return (
      <Login
        handleLogin={handleLogin}
        loginError={loginError}
        setLoginError={setLoginError}
      />
    );

  return <QnA userAuthToken={userAuthToken} />;
}
