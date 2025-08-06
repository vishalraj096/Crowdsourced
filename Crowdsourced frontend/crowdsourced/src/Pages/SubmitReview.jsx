import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import ReviewForm from "../Components/ReviewForm";
import api from "../Components/api";

const SubmitReview = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post("/reviews", formData);
      setSuccess("Review submitted and pending approval.");
    } catch (err) {
      setError("Failed to submit review");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-xl mx-auto p-8 mt-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Submit a Review</h1>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <ReviewForm onSubmit={handleSubmit} />
        {loading && <div className="text-gray-500 mt-2">Submitting...</div>}
      </div>
    </div>
  );
};

export default SubmitReview;