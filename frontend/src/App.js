import React, { useState } from "react";
import Login from "./pages/Login";
import QnA from "./pages/QnA";
import * as Server from "./server";

export default function App() {
  const [loginError, setLoginError] = useState("");
  const [userAuthToken, setUserAuthToken] = useState("");
  const [user, setUser] = useState({
    id: 0, // 0 is a non-realistic userid, used only for initialization
    is_superuser: false,
    group: "",
  });

  const handleLogin = async (username, password) => {
    const LOGIN_FAILURE_MSG = "Login Failed. Invalid Username / Password";
    const token = await Server.login(username, password);
    const user = await Server.fetchuser(token);
    token ? setUserAuthToken(token) : setLoginError(LOGIN_FAILURE_MSG);
    // TODO: Here the assumption is user belongs to only one group.
    // And if the user is a superuser, expect no groupId
    user && user.groups
      ? setUser({
          id: user.id,
          is_superuser: user.is_superuser,
          group: user.groups.length > 0 && user.groups[0],
        })
      : setLoginError(LOGIN_FAILURE_MSG);
  };

  if (userAuthToken == "" || user.id == 0)
    return (
      <Login
        handleLogin={handleLogin}
        loginError={loginError}
        setLoginError={setLoginError}
      />
    );

  return <QnA userAuthToken={userAuthToken} user={user} />;
}
