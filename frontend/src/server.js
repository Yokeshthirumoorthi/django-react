import axios from "axios";

let fetchAllQa = async () => {
  return await axios
    .get("/api/qas/")
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

export { fetchAllQa, addNewQa, updateQa, deleteQa };
