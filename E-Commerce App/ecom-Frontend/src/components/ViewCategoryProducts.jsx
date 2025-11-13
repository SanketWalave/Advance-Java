import React, { useEffect, useState } from "react";
import { getProductsByCatagoryId } from "../services/CatagoryServices";
import { updateProduct, deleteProductByID, addProduct } from "../services/ProductServices";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewCategoryProducts = () => {
  const { id } = useParams(); // categoryId from route
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand: "",
    quantity: "",
    price: "",
    discount: "",
    image: null,
    catagoryId: id, // ✅ set by default
  });

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const res = await getProductsByCatagoryId(id);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (productId) => {
    if (window.confirm("🗑️ Delete this product?")) {
      try {
        await deleteProductByID(productId);
        alert("Deleted successfully!");
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ✅ Edit Handlers
  const handleEdit = (product) => {
    setEditingProduct(product);
    setPreviewImage(`http://localhost:8081${product.imagePath}`);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleEditImage = (e) => {
    const file = e.target.files[0];
    setEditingProduct({ ...editingProduct, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        "productDto",
        new Blob([JSON.stringify(editingProduct)], { type: "application/json" })
      );
      if (editingProduct.image) formData.append("multipartFile", editingProduct.image);

      await updateProduct(editingProduct.productId, formData);
      alert("✅ Updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // ✅ Add Product Handlers
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleNewProductImage = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(
        "productDto",
        new Blob([JSON.stringify(newProduct)], { type: "application/json" })
      );
      if (newProduct.image) formData.append("multipartFile", newProduct.image);

      await addProduct(formData);
      alert("✅ Product added successfully!");
      setShowAddModal(false);
      setNewProduct({
        name: "",
        description: "",
        brand: "",
        quantity: "",
        price: "",
        discount: "",
        image: null,
        catagoryId: id,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="container mt-4">
      {/* 🔙 Back and Add Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h3 className="fw-bold text-center flex-grow-1">📦 Products of Category #{id}</h3>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          ➕ Add Product
        </button>
      </div>

      {/* 🧱 Product Cards */}
      <div className="row">
        {products.map((p) => (
          <div key={p.productId} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={`http://localhost:8081${p.imagePath}`}
                alt={p.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <div className="card-body">
                <h5 className="fw-bold">{p.name}</h5>
                <p className="text-muted">{p.brand}</p>
                <p>
                  <strong>Price:</strong> ₹{p.price}{" "}
                  {p.discount > 0 && (
                    <span className="text-success small ms-1">
                      ({p.discount}% off)
                    </span>
                  )}
                </p>
                <p>
                  <strong>Quantity:</strong> {p.quantity}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {p.avalable ? (
                    <span className="badge bg-success">Available</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.productId)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center text-muted mt-4">No products found.</p>
        )}
      </div>

      {/* ✏️ Edit Product Modal */}
      {editingProduct && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-header">
                  <h5>Edit Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingProduct(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        name="name"
                        value={editingProduct.name}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="Product Name"
                        required
                      />
                      <input
                        name="brand"
                        value={editingProduct.brand}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="Brand"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editingProduct.price}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="Price"
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={editingProduct.quantity}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="col-md-6 text-center">
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="img-fluid rounded mb-2"
                          style={{ height: "150px", objectFit: "cover" }}
                        />
                      )}
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleEditImage}
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <textarea
                        name="description"
                        value={editingProduct.description}
                        onChange={handleEditChange}
                        className="form-control"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    💾 Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingProduct(null)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Add Product Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleAddProduct}>
                <div className="modal-header">
                  <h5>Add Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        name="name"
                        value={newProduct.name}
                        onChange={handleNewProductChange}
                        className="form-control mb-2"
                        placeholder="Product Name"
                        required
                      />
                      <input
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleNewProductChange}
                        className="form-control mb-2"
                        placeholder="Brand"
                      />
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleNewProductChange}
                        className="form-control mb-2"
                        placeholder="Price"
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={newProduct.quantity}
                        onChange={handleNewProductChange}
                        className="form-control mb-2"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="file"
                        className="form-control mb-2"
                        onChange={handleNewProductImage}
                        accept="image/*"
                      />
                      <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleNewProductChange}
                        className="form-control"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    ➕ Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCategoryProducts;
