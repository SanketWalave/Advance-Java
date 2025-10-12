import React, { useState } from "react";

const AddProductForm = () => {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8001/saveProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
        }),
      });

      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setFormData({ name: "", price: "" });
      } else {
        setMessage("❌ Failed to add product. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Network error occurred!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Save Product
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Styling
const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "20px",
    fontWeight: "bold",
  },
};

export default AddProductForm;
