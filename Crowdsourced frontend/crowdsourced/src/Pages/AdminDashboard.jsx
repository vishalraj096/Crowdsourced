import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import AdminReviewList from "../Components/AdminReviewList";
import AdminBusinessList from "../Components/AdminBusinessList";
import api from "../Components/api";

const AdminDashboard = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/admin/reviews/pending"),
      api.get("/businesses")
    ])
      .then(([reviewsRes, bizRes]) => {
        setPendingReviews(reviewsRes.data);
        setBusinesses(bizRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load admin data");
        setLoading(false);
      });
  }, []);

  const handleApprove = async (reviewId) => {
    await api.put(`/admin/reviews/${reviewId}/approve`);
    setPendingReviews(pendingReviews.filter(r => r._id !== reviewId));
  };

  const handleReject = async (reviewId) => {
    await api.put(`/admin/reviews/${reviewId}/reject`);
    setPendingReviews(pendingReviews.filter(r => r._id !== reviewId));
  };

  // You can add business management handlers here

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8 mt-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Admin Dashboard</h1>
        {loading && <div className="text-gray-500">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AdminReviewList reviews={pendingReviews} onApprove={handleApprove} onReject={handleReject} />
            <AdminBusinessList businesses={businesses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;