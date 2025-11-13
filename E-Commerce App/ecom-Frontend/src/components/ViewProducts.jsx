import React, { useState, useEffect } from "react";
import {
  getAllProducts,
  deleteProductByID,
  updateProduct,
} from "../services/ProductServices";
import "bootstrap/dist/css/bootstrap.min.css";

export const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // ✅ Fetch all products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductByID(id);
        alert("🗑️ Product deleted successfully!");
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // ✅ Open edit form
  const handleEdit = (product) => {
    setEditingProduct(product);
    setPreviewImage(`data:image/jpeg;base64,${product.imageData}`);
  };

  // ✅ Handle update form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  // ✅ Handle image change in form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditingProduct({ ...editingProduct, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // ✅ Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productDto", new Blob([JSON.stringify(editingProduct)], { type: "application/json" }));
      if (editingProduct.image) {
        formData.append("multipartFile", editingProduct.image);
      }

      await updateProduct(editingProduct.productId, formData);
      alert("✅ Product updated successfully!");
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ✅ Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* 🔍 Search and Top Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-secondary" onClick={() => window.history.back()}>
          ⬅ Back
        </button>

        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <a href="/add-product" className="btn btn-primary">
          ➕ Add Product
        </a>
      </div>

      {/* 🖋 Edit Form */}
      {editingProduct && (
        <div className="card p-4 mb-4 shadow-sm">
          <h4 className="mb-3">✏️ Update Product</h4>
          <form onSubmit={handleUpdateSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Name</label>
                <input
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Brand</label>
                <input
                  name="brand"
                  value={editingProduct.brand}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editingProduct.quantity}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleChange}
                  className="form-control"
                ></textarea>
              </div>

              <div className="col-md-6 mb-3">
                <label>Change Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 text-center">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="img-fluid rounded"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-success me-2">
              💾 Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditingProduct(null)}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      )}

      {/* 🧱 Product Cards */}
      <div className="row">
  {filteredProducts.map((product) => (
    <div className="col-md-4 mb-4" key={product.productId}>
      <div className="card h-100 shadow-sm border-0">
        <img
          src={`http://localhost:8081${product.imagePath}`}
          className="card-img-top"
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        <div className="card-body">
          <h5 className="card-title fw-semibold">{product.name}</h5>
          <p className="text-muted mb-1">
            <i className="bi bi-tag"></i> {product.brand}
          </p>
          <p className="mb-1">
            <strong>Price:</strong> ₹{product.price}{" "}
            {product.discount > 0 && (
              <span className="text-success small ms-1">
                ({product.discount}% off)
              </span>
            )}
          </p>
          <p className="mb-1">
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p className="mb-1">
            <strong>Category ID:</strong> {product.catagoryId}
          </p>
          <p className="mb-1">
            <strong>Status:</strong>{" "}
            {product.isAvalable ? (
              <span className="badge bg-success">Available</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </p>

          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleEdit(product)}
            >
              ✏️ Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(product.productId)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}

  {filteredProducts.length === 0 && (
    <p className="text-center text-muted mt-4">No products found.</p>
  )}
</div>
    </div>
  );
};

export default ViewProducts;
