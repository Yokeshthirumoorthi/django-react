import axios from "axios";

let login = async (username, password) => {
  const loginResponse = await axios
    .post("/api/token/", { username, password })
    .catch((err) => {
      console.log("Login Failed with error: ", err);
    });

  const isLoginSuccess = loginResponse.status == 200 && loginResponse.data;
  const userToken = isLoginSuccess ? loginResponse.data.access : "";
  return userToken;
};

let fetchAllQa = async (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  const fetchQAResponse = await axios
    .get("/api/qas/", { headers })
    .catch((err) => console.log(err));
  const isFetchSuccess = fetchQAResponse.status == 200 && fetchQAResponse.data;
  return isFetchSuccess ? fetchQAResponse.data : [];
};

let addNewQa = async (token, data) => {
  const headers = { Authorization: `Bearer ${token}` };
  const addQAResponse = await axios
    .post("/api/qas/", data, { headers })
    .catch((err) => console.log(err));
  return addQAResponse.status == 201;
};

// let updateQa = async (token) => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   const item = {
//     id: "3",
//     question: "New Quest",
//     answer: "new ans",
//   };
//   return await axios
//     .put(`/api/qas/${item.id}/`, item, { headers })
//     .then((res) => {
//       console.log(res);
//       fetchAllQa(token);
//     })
//     .catch((err) => console.log(err));
// };

// let deleteQa = async (token) => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   const item = {
//     id: "3",
//     question: "New Quest",
//     answer: "new ans",
//   };
//   return await axios
//     .delete(`/api/qas/${item.id}/`, { headers })
//     .then((res) => {
//       console.log(res);
//       fetchAllQa(token);
//     })
//     .catch((err) => console.log(err));
// };

export { login, fetchAllQa, addNewQa };
