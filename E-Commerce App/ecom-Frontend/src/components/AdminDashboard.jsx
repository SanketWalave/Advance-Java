import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const Card = ({ icon, title, desc, color, primary, secondary }) => (
    <div className="col-md-4">
      <div
        className="card border-0 shadow-sm h-100 dashboard-card"
        onClick={() => navigate(primary.link)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body text-center p-4">
          <div
            className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
            style={{
              width: 70,
              height: 70,
              backgroundColor: `${color}15`,
            }}
          >
            <i className={`${icon} ${color} fs-2`}></i>
          </div>

          <h5 className="fw-bold">{title}</h5>
          <p className="text-muted small">{desc}</p>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(primary.link);
              }}
            >
              {primary.label}
            </button>

            {secondary && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(secondary.link);
                }}
              >
                {secondary.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-primary mb-4">
        <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
      </h3>

      <div className="row g-4">

        <Card
          icon="bi bi-bag-check"
          title="Products"
          desc="Add, view and manage products"
          color="text-primary"
          primary={{ label: "Add Product", link: "/admin/add-product" }}
          secondary={{ label: "View Products", link: "/admin/view-products" }}
        />

        <Card
          icon="bi bi-cart-check"
          title="Orders"
          desc="Track and manage customer orders"
          color="text-success"
          primary={{ label: "View Orders", link: "/admin/view-orders" }}
        />

        <Card
          icon="bi bi-tags"
          title="Categories"
          desc="Organize product categories"
          color="text-info"
          primary={{ label: "Manage Categories", link: "/admin/category-manager" }}
        />

        <Card
          icon="bi bi-people"
          title="Users"
          desc="Manage users and admins"
          color="text-warning"
          primary={{ label: "View Users", link: "/admin/view-users" }}
          secondary={{ label: "Add User", link: "/admin/add-user" }}
        />

      </div>

      {/* Hover effect */}
      <style>{`
        .dashboard-card {
          transition: all 0.25s ease;
        }
        .dashboard-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
