import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h4 className="fw-bold text-primary mb-0">
          <i className="bi bi-shop me-2"></i>E-Commerce Admin
        </h4>

        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle d-flex align-items-center"
            data-bs-toggle="dropdown"
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

          <ul className="dropdown-menu dropdown-menu-end">
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
            <li><hr className="dropdown-divider" /></li>
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
  );
};

export default AdminHeader;
