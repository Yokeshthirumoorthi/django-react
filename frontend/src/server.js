import axios from "axios";

let fetchAllQa = async () => {
  return await axios
    .get("/api/qas/")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { fetchAllQa };
