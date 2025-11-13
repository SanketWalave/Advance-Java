import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AdminServices";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [user, setUser] = useState({ userEmail: "", userPassword: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      console.log("📤 Sending login request:", user);
      const response = await loginUser(user); // ✅ API call
      const loggedUser = response.data;
      console.log("✅ Login successful:", loggedUser);

      // ✅ Save user to localStorage (use the SAME key used in App.jsx)
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setSuccessMsg("✅ Login Successful!");

      // 🧭 Redirect based on user role
      if (loggedUser.userType === "Admin") {
        alert("Welcome Admin! Redirecting to Admin Dashboard.");
        navigate("/admin");
      } else {
        alert("Welcome User! Redirecting to User Dashboard.");
        navigate("/user");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
      if (error.response?.status === 401) {
        setErrorMsg("Invalid email or password ❌");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        className="card shadow"
        style={{
          maxWidth: "420px",
          margin: "100px auto",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center text-primary fw-bold mb-4">🔐 User Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="userEmail"
              value={user.userEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="userPassword"
              value={user.userPassword}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
        {successMsg && (
          <p className="text-success mt-3 text-center">{successMsg}</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
