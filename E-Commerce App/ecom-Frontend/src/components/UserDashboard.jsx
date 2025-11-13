import React, { useEffect, useState } from "react";
import { getAllCategories, getAllProducts } from "../services/ProductServices";
import { addToCart } from "../services/UserServices";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // ✅ Load user from localStorage once
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        console.log("👤 Logged-in user:", parsed);
      } else {
        console.warn("⚠️ No user found in localStorage — redirecting to login");
        navigate("/login");
      }
    } catch (error) {
      console.error("❌ Failed to parse user:", error);
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Load categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
        ]);

        console.log("📦 Categories:", catRes.data);
        console.log("🛍️ Products:", prodRes.data);

        setCategories(catRes.data || []);
        setProducts(prodRes.data || []);
        setFilteredProducts(prodRes.data || []);
      } catch (err) {
        console.error("❌ Data fetch failed:", err);
      }
    };

    fetchData();
  }, []);

  // 🔍 Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProducts(
      products.filter((p) => p.name?.toLowerCase().includes(value))
    );
  };

  // 🏷️ Category Filter
  const handleCategoryClick = (categoryId) => {
    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      const selectedCategory = categories.find((c) => c.id === categoryId);
      if (selectedCategory && selectedCategory.productList) {
        setFilteredProducts(selectedCategory.productList);
      } else {
        setFilteredProducts([]);
      }
    }
  };

  // 🛒 Add to Cart
  const handleAddToCart = async (product) => {
    if (!user || !user.userId) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const cartDto = {
      cartId: 0,
      userId: user.userId,
      productId: product.productId,
      quantity: 1,
      cartInteractionDate: new Date().toISOString(),
    };

    console.log("🛒 Adding to cart:", cartDto);

    try {
      await addToCart(cartDto, user.userId);
      alert(`${product.name} added to cart`);
      setCartCount((prev) => prev + 1);
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
      alert("Failed to add to cart");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🛒 Go to Cart
  const goToCart = () => {
    if (user && user.userId) {
      navigate(`/cart?userId=${user.userId}`);
    } else {
      alert("Please login first.");
      navigate("/login");
    }
  };

  // 🧩 Helper function for images
  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150";
    return path.startsWith("http")
      ? path
      : `http://localhost:8081/${path}`;
  };

  // ⏳ Prevent render until user loaded
  if (!user) {
    return (
      <h3 className="text-center text-danger mt-5">Loading user data...</h3>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* 🧭 NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        {/* Left: Profile */}
        <div className="d-flex align-items-center">
          <img
            src={getImageUrl(user.imagePath)}
            alt="User"
            className="rounded-circle me-2"
            width="45"
            height="45"
          />
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              {user.name || "User"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item">Edit Password</button>
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Center: Search */}
        <div className="mx-auto w-50">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Right: Cart */}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-light position-relative"
            onClick={goToCart}
          >
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 🏷️ CATEGORY ROW */}
      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="text-center"
                style={{ width: "90px", cursor: "pointer" }}
              >
                <img
                  src={getImageUrl(cat.imagePath)}
                  alt={cat.name}
                  width="70"
                  height="70"
                  className="rounded-circle border mb-1"
                />
                <p className="small fw-semibold">{cat.name}</p>
              </div>
            ))}
        </div>

        {/* 🛍️ PRODUCT GRID */}
        <div className="row mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.productId} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={getImageUrl(product.imagePath)}
                    className="card-img-top"
                    alt={product.name}
                    height="160"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="text-muted small">{product.brand}</p>
                    <p className="fw-bold mb-2">₹{product.price}</p>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center mt-5">No products found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
