import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/",
});

export const getAllCategories = () => {
  return api.get("/getAllCatagory");
};
export const getallProducts = () => {
  return api.get("/getAllProducts");
};
export const addUser = (formData) => {
  console.log("📤 Sending formData to backend...") ;
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
    }

  return api.post("/addUser", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getUserById = (id) => {
  return api.get(`/getUserById/${id}`);
};
export const updateUser = (id, formData) => {
  console.log("📝 Updating user:", id);
  return api.put(`/updateUser/${id}`, formData, {   
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const addToCart = (formdata, userId) => {
  return api.post(`/addToCart/${userId}`, formdata);
};
export const getCartByUserId = (userId) => {
  return api.get(`/getCartByUserId/${userId}`);
};