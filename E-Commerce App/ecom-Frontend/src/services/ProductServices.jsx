import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/",
});

// ✅ Home route (optional)
export const home = () => {
  return api.get(`/`);
};

// ✅ Add new product
export const addProduct = (formData) => {
  console.log("📤 Sending formData to backend...");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }

  return api.post("/addProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Get all categories
export const getAllCategories = () => {
  return api.get("/getAllCatagory");
};

// ✅ Get all products
export const getAllProducts = () => {
  return api.get("/getAllProducts");
};

// ✅ Update product by ID
export const updateProduct = (id, formData) => {
  console.log("📝 Updating product:", id);
  return api.put(`/updateProduct/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Delete product by ID
export const deleteProductByID = (id) => {
  console.log("🗑️ Deleting product:", id);
  return api.delete(`/deleteProductByID/${id}`); // ✅ matches your backend @DeleteMapping("/deleteProduct/{id}")
};
