import React, { useEffect } from "react";
import "./App.css";

import { login, fetchAllQa, addNewQa, updateQa, deleteQa } from "./server";

import Login from "./pages/Login";

function App() {
  useEffect(() => {
    login().then((res) => fetchAllQa(res.data.access));
  }, []);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
