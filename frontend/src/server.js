import axios from "axios";

let login = async () => {
  return await axios
    .post("/api/token/", {
      username: "pg",
      password: "pg",
    })
    // .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

let fetchAllQa = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios
    .get("/api/qas/", { headers })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

let addNewQa = async () => {
  const item = {
    question: "New Question",
    answer: "new answer",
  };
  return await axios
    .post("/api/qas/", item)
    .then((res) => {
      console.log(res);
      fetchAllQa();
    })
    .catch((err) => console.log(err));
};

let updateQa = async () => {
  const item = {
    id: "3",
    question: "New Quest",
    answer: "new ans",
  };
  return await axios
    .put(`/api/qas/${item.id}/`, item)
    .then((res) => {
      console.log(res);
      fetchAllQa();
    })
    .catch((err) => console.log(err));
};

let deleteQa = async () => {
  const item = {
    id: "3",
    question: "New Quest",
    answer: "new ans",
  };
  return await axios
    .delete(`/api/qas/${item.id}/`)
    .then((res) => {
      console.log(res);
      fetchAllQa();
    })
    .catch((err) => console.log(err));
};

export { login, fetchAllQa, addNewQa, updateQa, deleteQa };
