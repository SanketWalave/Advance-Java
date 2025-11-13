import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/",
});

export const getAllCategories = () => {
  return api.get("/getAllCatagory");
};
export const saveCatagory = (formData) => {
  console.log("📤 Sending formData to backend...");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }

  return api.post("/saveCatagory", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteCategoryByID = (id) => {
  console.log("🗑️ Deleting category:", id);
  return api.delete(`/deleteCatagoryById/${id}`);
}

export const updateCategory = (id, formData) => {
  console.log("📝 Updating category:", id);
  return api.put(`/updateCatagory/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getProductsByCatagoryId = (id) => {
  return api.get(`/getProductsByCatagoryId/${id}`);
};
