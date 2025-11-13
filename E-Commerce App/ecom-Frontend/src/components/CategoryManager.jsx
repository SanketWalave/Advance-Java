import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  saveCatagory,
  deleteCategoryByID,
  updateCategory,
} from "../services/CatagoryServices";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", image: null });
  const [editingCategory, setEditingCategory] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 🟢 Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        // ✅ Ensure data is always an array
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Expected array, got:", res.data);
          setCategories([]);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  // 🟢 Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const categoryDto = { name: newCategory.name };
    formData.append(
      "catagoryDto",
      new Blob([JSON.stringify(categoryDto)], { type: "application/json" })
    );
    if (newCategory.image) formData.append("multipartFile", newCategory.image);

    saveCatagory(formData)
      .then(() => {
        setMessage("✅ Category added successfully!");
        fetchCategories();
        setNewCategory({ name: "", image: null });
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error adding category"));
  };

  // ✏️ Update Category
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const categoryDto = { name: editingCategory.name };
    formData.append(
      "catagoryDto",
      new Blob([JSON.stringify(categoryDto)], { type: "application/json" })
    );
    if (editingCategory.image)
      formData.append("multipartFile", editingCategory.image);

    updateCategory(editingCategory.id, formData)
      .then(() => {
        setMessage("✏️ Category updated successfully!");
        fetchCategories();
        setEditingCategory(null);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error updating category"));
  };

  // 🗑️ Delete Category
  const handleDeleteCategory = (id) => {
    if (!window.confirm("⚠️ Delete this category?")) return;
    deleteCategoryByID(id)
      .then(() => {
        setMessage("🗑️ Category deleted!");
        setCategories(categories.filter((c) => c.id !== id));
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => setMessage("❌ Error deleting category"));
  };

  // 🔍 Search filter
  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ⬅️ Back
        </button>
        <h2 className="text-center flex-grow-1">📦 Category Management</h2>
      </div>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔎 Search Category..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ➕ Add Category Form */}
      <form onSubmit={handleAddCategory} className="card shadow-sm p-3 mb-4 border-0">
        <h5>Add New Category</h5>
        <div className="row align-items-center g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-5">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.files[0] })}
              accept="image/*"
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">➕ Add</button>
          </div>
        </div>
      </form>

      {/* 🖼️ Category Cards */}
      <div className="row">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100 position-relative">
                <div className="dropdown position-absolute top-0 end-0 m-2">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={() => setEditingCategory(cat)}>
                        ✏️ Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDeleteCategory(cat.id)}
                      >
                        🗑️ Delete
                      </button>
                    </li>
                  </ul>
                </div>

                <img
                  src={
                    cat.imagePath
                      ? `http://localhost:8081${cat.imagePath}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={cat.name}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{cat.name}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">No categories found.</p>
        )}
      </div>

      {/* ✏️ Edit Modal */}
      {editingCategory && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleUpdateCategory}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingCategory(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    required
                  />
                  {editingCategory.imagePath && (
                    <div className="text-center mb-3">
                      <img
                        src={`http://localhost:8081${editingCategory.imagePath}`}
                        alt="Old Category"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <p className="text-muted small mt-1">Current Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, image: e.target.files[0] })
                    }
                    accept="image/*"
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    💾 Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingCategory(null)}
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

export default CategoryManager;
