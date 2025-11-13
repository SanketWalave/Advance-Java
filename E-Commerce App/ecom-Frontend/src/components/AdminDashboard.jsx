import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h4 className="fw-bold text-primary mb-0">
            <i className="bi bi-shop me-2"></i>E-Commerce Admin
          </h4>

          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle d-flex align-items-center"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={`http://localhost:8081${user?.imagePath}`}
                alt="Profile"
                className="rounded-circle me-2"
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
              <span className="fw-semibold">{user?.userName}</span>
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown"
            >
              <li>
                <button className="dropdown-item">
                  <i className="bi bi-person-circle me-2"></i>Edit Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                  <i className="bi bi-key me-2"></i>Change Password
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Cards */}
      <div className="container py-4">
        <h3 className="fw-bold text-primary mb-4">
          <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
        </h3>

        <div className="row g-4">
          {/* Product Card */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center position-relative">
                <div className="dropdown position-absolute top-0 end-0 m-2">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/add-product")}
                      >
                        ➕ Add Product
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/view-products")}
                      >
                        👁️ View Products
                      </button>
                    </li>
                  </ul>
                </div>

                <i className="bi bi-bag-check text-primary display-5"></i>
                <h5 className="fw-bold mt-3">Products</h5>
                <p className="text-muted">
                  Manage, view, or add new products to your store.
                </p>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center position-relative">
                <div className="dropdown position-absolute top-0 end-0 m-2">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/view-orders")}
                      >
                        👁️ View Orders
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/manage-orders")}
                      >
                        📦 Manage Orders
                      </button>
                    </li>
                  </ul>
                </div>

                <i className="bi bi-cart-check text-success display-5"></i>
                <h5 className="fw-bold mt-3">Orders</h5>
                <p className="text-muted">
                  Track and manage all customer orders efficiently.
                </p>
              </div>
            </div>
          </div>
          {/* Category Card */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center position-relative">
                <div className="dropdown position-absolute top-0 end-0 m-2">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/catagory-manager")}
                      >
                        Catagory Manager
                      </button>
                    </li>
                    {/* <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/view-categories")}
                      >
                        👁️ View Categories
                      </button>
                    </li> */}
                  </ul>
                </div>

                <i className="bi bi-tags text-info display-5"></i>
                <h5 className="fw-bold mt-3">Categories</h5>
                <p className="text-muted">
                  Manage and organize product categories for your store.
                </p>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center position-relative">
                <div className="dropdown position-absolute top-0 end-0 m-2">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/view-users")}
                      >
                        👁️ View Users
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin/add-user")}
                      >
                        ➕ Add User
                      </button>
                    </li>
                  </ul>
                </div>

                <i className="bi bi-people text-warning display-5"></i>
                <h5 className="fw-bold mt-3">Users</h5>
                <p className="text-muted">
                  View and manage registered customers and admins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
