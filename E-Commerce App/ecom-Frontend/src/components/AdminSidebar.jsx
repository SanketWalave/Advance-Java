import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "240px" }}>
      <h5 className="mb-4 text-center">Admin Panel</h5>

      <ul className="nav flex-column gap-2">

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin">
            🏠 Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin/add-product">
            ➕ Add Product
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin/view-products">
            👁 View Products
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin/category-manager">
            🗂 Categories
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/admin/users">
            👥 Users
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default AdminSidebar;
