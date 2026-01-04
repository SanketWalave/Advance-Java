import React, { useState, useEffect } from "react";
import { addProduct, getAllCategories } from "../services/ProductServices";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    quantity: "",
    price: "",
    discount: 0,
    productAddDate: "",
    isAvailable: true,
    image: null,
    catagoryId: "",
  });

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("❌ Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setProduct({
        ...product,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append(
        "productDto",
        new Blob(
          [
            JSON.stringify({
              name: product.name,
              description: product.description,
              brand: product.brand,
              quantity: product.quantity,
              price: product.price,
              discount: product.discount,
              productAddDate: product.productAddDate,
              isAvalable: product.isAvailable,
              imagePath: "",
              catagoryId: parseInt(product.catagoryId),
            }),
          ],
          { type: "application/json" }
        )
      );

      if (product.image) {
        formData.append("multipartFile", product.image);
      }

      await addProduct(formData);
      alert("✅ Product added successfully!");

      setProduct({
        name: "",
        description: "",
        brand: "",
        quantity: "",
        price: "",
        discount: 0,
        productAddDate: "",
        isAvailable: true,
        image: null,
        catagoryId: "",
      });
      setPreview(null);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Failed to add product: " + error.message);
    }
  };

  return (
    <div className="container py-4">
      {/* 🔹 Top Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ⬅️ Back
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/admin/view-products")}
        >
          👁️ View Products
        </button>
      </div>

      {/* 🔹 Split Form */}
      <div
        className="p-4 shadow-lg rounded bg-white"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">
          🛍️ Add New Product
        </h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            {/* 🟢 Left Side */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Brand name"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 🟢 Right Side */}
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    placeholder="Enter discount"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Add Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="productAddDate"
                    value={product.productAddDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="catagoryId"
                  value={product.catagoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-3 rounded shadow-sm"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                    }}
                  />
                )}
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isAvailable"
                  checked={product.isAvailable}
                  onChange={handleChange}
                />
                <label className="form-check-label">Available</label>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 fw-bold"
              style={{ borderRadius: "10px" }}
            >
              ➕ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;