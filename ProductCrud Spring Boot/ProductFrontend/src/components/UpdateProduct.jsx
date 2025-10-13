import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../services/ProductServices";

const UpdateProduct = () => {
  const { id } = useParams(); // ✅ Get productId from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts(); // Fetch all products
        const prod = response.data.find((p) => p.id === parseInt(id));
        if (prod) setProduct(prod);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Handle form changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product);
      alert("✅ Product updated successfully!");
      navigate("/"); // Go back to product list
    } catch (error) {
      console.error("❌ Error updating product:", error);
      alert("❌ Update failed! Check console.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading product...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✏️ Update Product</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter product price"
          style={styles.input}
          required
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button type="submit" style={styles.saveBtn}>💾 Save</button>
          <button type="button" style={styles.cancelBtn} onClick={() => navigate("/")}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
};

// ✅ Styling (reusable from ProductList)
const styles = {
  container: { padding: "40px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" },
  title: { textAlign: "center", fontSize: "2rem", color: "#333", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "0 auto", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" },
  input: { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" },
  saveBtn: { backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer" },
  cancelBtn: { backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", padding: "10px 20px", cursor: "pointer" },
};

export default UpdateProduct;
