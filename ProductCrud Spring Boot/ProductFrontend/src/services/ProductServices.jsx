import React, { useEffect, useState } from "react";
import ProductServices from "./ProductServices";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await ProductServices.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💍 Product List</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      {/* Product Rows */}
      <div style={styles.rowsContainer}>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div key={product.id} style={styles.row}>
              <span style={styles.id}>{product.id}.</span>
              <span style={styles.name}>{product.name}</span>
              <span style={styles.price}>₹{product.price.toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p style={styles.noData}>No products found 😔</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  rowsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 15px",
    borderRadius: "6px",
    backgroundColor: "#f0f0f0",
    fontSize: "16px",
  },
  id: {
    width: "30px",
    fontWeight: "bold",
  },
  name: {
    flex: 1,
  },
  price: {
    fontWeight: "bold",
    color: "#28a745",
  },
  noData: {
    textAlign: "center",
    color: "#555",
    marginTop: "20px",
  },
};

export default ProductList;
