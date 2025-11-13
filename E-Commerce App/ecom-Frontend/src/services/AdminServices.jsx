import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/",
});

export const home = () => {
//   alert("in home");
  return api.get(`/`);
};

export const loginUser = (user) => {
  return api.post("/loginUser", user);
}