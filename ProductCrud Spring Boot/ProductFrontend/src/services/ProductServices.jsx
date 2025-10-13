import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/",
});

// ✅ Fixed spelling to match backend
export const getProducts = () => {
  return api.get("/getProducts");
};

export const deleteById = (id) => {
  // alert(id);
  return api.post(`/deleteById/${id}`);
};

export const updateProduct = (product) => {
  console.log("Updating product:", product); // ✅ Debug
  return api.post(`/updateProduct`, product); // Use POST to match your backend
};