import axios from "axios";

let login = async (username, password) => {
  return await axios
    .post("/api/token/", { username, password })
    .then((res) => {
      return res.status == 200 && res.data && res.data.access
        ? res.data.access
        : "";
    })
    .catch((err) => {
      console.log("Login Failed with error: ", err);
    });
};

let fetchAllQa = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios
    .get("/api/qas/", { headers })
    .then((res) => (res.status == 200 && res.data ? res.data : []))
    .catch((err) => console.log(err));
};

let addNewQa = async (token, data) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios
    .post("/api/qas/", data, { headers })
    .then((res) => res.status == 201)
    .catch((err) => console.log(err));
};

let updateQa = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const item = {
    id: "3",
    question: "New Quest",
    answer: "new ans",
  };
  return await axios
    .put(`/api/qas/${item.id}/`, item, { headers })
    .then((res) => {
      console.log(res);
      fetchAllQa(token);
    })
    .catch((err) => console.log(err));
};

let deleteQa = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const item = {
    id: "3",
    question: "New Quest",
    answer: "new ans",
  };
  return await axios
    .delete(`/api/qas/${item.id}/`, { headers })
    .then((res) => {
      console.log(res);
      fetchAllQa(token);
    })
    .catch((err) => console.log(err));
};

export { login, fetchAllQa, addNewQa, updateQa, deleteQa };
