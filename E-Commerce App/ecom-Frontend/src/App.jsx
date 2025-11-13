import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { AddProduct } from "./components/AddProduct";
import ViewProducts from "./components/ViewProducts";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Import Bootstrap JS (required for dropdowns, modals, etc.)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CategoryManager from "./components/CategoryManager";
import ViewCategoryProducts from "./components/ViewCategoryProducts";
import UserDashboard from "./components/UserDashboard";
import UserCart from "./components/UserCart";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* <Navbar /> fixed on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/add-product" element={<AddProduct></AddProduct>} />
        <Route path="/admin" element={<AdminDashboard></AdminDashboard>} />
        <Route path="/user" element={<UserDashboard></UserDashboard>} />
        <Route path="/cart" element={<UserCart></UserCart>} />
        <Route path="/admin/view-products" element={<ViewProducts></ViewProducts>} />
        <Route path="/admin/catagory-manager" element={<CategoryManager></CategoryManager>} />
        <Route path="/category/:id/products" element={<ViewCategoryProducts />} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
