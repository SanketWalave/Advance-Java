import React, { useEffect, useState } from "react";
import ProductServices from "../services/ProductServices"; // Optional: Axios service

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Using fetch
      const res = await fetch("http://localhost:8001/");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setProducts(data);

      // OR using Axios
      // const { data } = await ProductServices.getAllProducts();
      // setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💍 Product Collection</h1>

      {/* Search Input */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Product Grid */}
      <div style={styles.grid}>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div key={product.id} style={styles.card}>
              <img
                src={`https://via.placeholder.com/200x150?text=${encodeURIComponent(
                  product.name
                )}`}
                alt={product.name}
                style={styles.image}
              />
              <h2 style={styles.name}>{product.name}</h2>
              <p style={styles.price}>₹{product.price.toLocaleString()}</p>
              <button style={styles.button}>🛒 Add to Cart</button>
            </div>
          ))
        ) : (
          <p style={styles.noProducts}>No products found 😔</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  searchContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  searchInput: {
    padding: "10px 15px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#222",
    margin: "10px 0",
  },
  price: {
    fontSize: "1.1rem",
    color: "#28a745",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  noProducts: {
    textAlign: "center",
    gridColumn: "1 / -1",
    fontSize: "18px",
    color: "#555",
  },
};

// Hover effect using inline JS
styles.card["&:hover"] = {
  transform: "translateY(-5px)",
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
};

export default ProductList;
