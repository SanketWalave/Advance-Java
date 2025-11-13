import React, { useEffect, useState } from "react";
import { getCartByUserId } from "../services/UserServices";
import "bootstrap/dist/css/bootstrap.min.css";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchCart(parsedUser.userId);
    } else {
      alert("Please login first!");
      window.location.href = "/login";
    }
  }, []);

  // Fetch cart items from backend
  const fetchCart = async (userId) => {
    try {
      const res = await getCartByUserId(userId);
      console.log("🛒 Cart Data:", res.data);
      setCartItems(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      alert("Error loading cart data!");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/120";
    return path.startsWith("http") ? path : `http://localhost:8081/${path}`;
  };

  if (loading) {
    return <h4 className="text-center mt-5 text-primary">Loading your cart...</h4>;
  }

  if (cartItems.length === 0) {
    return <h4 className="text-center mt-5 text-secondary">Your cart is empty 🛒</h4>;
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 text-primary">🛍️ Your Shopping Cart</h3>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.productId} className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <img
                src={getImageUrl(item.imagePath)}
                alt={item.name}
                className="card-img-top"
                height="180"
                style={{ objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{item.name}</h6>
                <p className="text-muted small">{item.brand}</p>
                <p className="fw-bold mb-1">₹{item.price}</p>
                <p className="text-secondary">Qty: {item.quantity || 1}</p>
                <button className="btn btn-danger btn-sm">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCart;
