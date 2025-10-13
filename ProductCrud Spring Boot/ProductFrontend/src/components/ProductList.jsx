import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteById } from "../services/ProductServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteById(id);
      alert("🗑️ Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  // Navigate to update page
  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💍 Product List</h1>

      {/* Add Product Button */}
      <button style={styles.addBtn} onClick={() => navigate("/save")}>
        ➕ Add New Product
      </button>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* Product Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price (₹)</th>
            <th style={styles.th}>Delete</th>
            <th style={styles.th}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.price}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.updateBtn}
                    onClick={() => handleUpdate(product.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.noData}>
                No products found 😔
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles remain the same (you can reuse your existing styles)
const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  title: { textAlign: "center", fontSize: "2rem", color: "#333", marginBottom: "20px" },
  addBtn: {
    display: "block",
    margin: "0 auto 20px auto",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  search: { display: "block", margin: "0 auto 25px auto", padding: "10px", width: "300px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" },
  table: { width: "80%", margin: "0 auto", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  th: { backgroundColor: "#007bff", color: "#fff", padding: "12px", textAlign: "left", fontSize: "16px" },
  td: { padding: "10px 15px", fontSize: "15px", borderBottom: "1px solid #ddd", color: "#333" },
  noData: { textAlign: "center", padding: "15px", color: "#555" },
  deleteBtn: { backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" },
  updateBtn: { backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" },
};

export default ProductList;
