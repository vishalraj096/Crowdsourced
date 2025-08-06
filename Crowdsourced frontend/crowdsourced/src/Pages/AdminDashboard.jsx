import React from "react";
import Navbar from "../Components/Navbar";
import AdminReviewList from "../Components/AdminReviewList";
import AdminBusinessList from "../Components/AdminBusinessList";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8 mt-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AdminReviewList />
          <AdminBusinessList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;