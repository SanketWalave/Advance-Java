import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import CommonNavbar from "./CommonNavbar";

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="flex-grow-1">
        <CommonNavbar />   {/* ✅ shared navbar */}
        <div className="p-4 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
