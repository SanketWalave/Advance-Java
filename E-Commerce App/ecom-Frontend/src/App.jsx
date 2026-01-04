// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Home } from "./components/Home";
// import { Navbar } from "./components/Navbar";
// import { AddProduct } from "./components/AddProduct";
// import ViewProducts from "./components/ViewProducts";
// import LoginForm from "./components/LoginForm";
// import AdminDashboard from "./components/AdminDashboard";
// // Import Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// // ✅ Import Bootstrap JS (required for dropdowns, modals, etc.)
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import CategoryManager from "./components/CategoryManager";
// import ViewCategoryProducts from "./components/ViewCategoryProducts";
// import UserDashboard from "./components/UserDashboard";
// import UserCart from "./components/UserCart";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <Router>
//       {/* <Navbar /> fixed on all pages */}
//       <Routes>
//         {/* <Route path="/login" element={<Home />} /> */}
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/admin/add-product" element={<AddProduct></AddProduct>} />
//         <Route path="/admin" element={<AdminDashboard></AdminDashboard>} />
//         <Route path="/user" element={<UserDashboard></UserDashboard>} />
//         <Route path="/cart" element={<UserCart></UserCart>} />
//         <Route path="/admin/view-products" element={<ViewProducts></ViewProducts>} />
//         <Route path="/admin/catagory-manager" element={<CategoryManager></CategoryManager>} />
//         <Route path="/category/:id/products" element={<ViewCategoryProducts />} />
//         <Route path="/contact" element={<h1>Contact Page</h1>} />
//         <Route path="*" element={<h1>404 Page Not Found</h1>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import UserCart from "./components/UserCart";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AddProduct from "./components/AddProduct";
import ViewProducts from "./components/ViewProducts";
import CategoryManager from "./components/CategoryManager";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Admin layout routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="category-manager" element={<CategoryManager />} />
{/* //         <Route path="/admin/catagory-manager" element={<CategoryManager></CategoryManager>} /> */}
        </Route>

        {/* User */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/cart" element={<UserCart />} />

        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

