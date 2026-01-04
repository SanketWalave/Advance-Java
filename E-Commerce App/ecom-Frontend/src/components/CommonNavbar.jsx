import React from "react";
import { useNavigate } from "react-router-dom";

const CommonNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid d-flex justify-content-between">
        
        {/* Left title */}
        <h5 className="fw-bold text-primary mb-0">
          {user?.userType === "Admin" ? "Admin Panel" : "User Dashboard"}
        </h5>

        {/* Profile dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <span className="fw-semibold">{user?.userName || "User"}</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={() => navigate("/profile")}>
                👤 Edit Profile
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => navigate("/change-password")}>
                🔑 Change Password
              </button>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default CommonNavbar;
