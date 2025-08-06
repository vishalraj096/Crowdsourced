import React from "react";
import Navbar from "../Components/Navbar";
import ReviewForm from "../Components/ReviewForm";

const SubmitReview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-xl mx-auto p-8 mt-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Submit a Review</h1>
        <ReviewForm />
      </div>
    </div>
  );
};

export default SubmitReview;