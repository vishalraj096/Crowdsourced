import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ReviewCard from "../Components/ReviewCard";
import ReviewForm from "../Components/ReviewForm";
import api from "../Components/api";

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/businesses/${id}`),
      api.get(`/reviews/business/${id}`)
    ])
      .then(([bizRes, revRes]) => {
        setBusiness(bizRes.data);
        setReviews(revRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load business details");
        setLoading(false);
      });
  }, [id]);

  const handleReviewSubmit = async (formData) => {
    setReviewError(null);
    setReviewSuccess(null);
    try {
      await api.post("/reviews", { ...formData, business: id });
      setReviewSuccess("Review submitted and pending approval.");
      // Refresh reviews
      const revRes = await api.get(`/reviews/business/${id}`);
      setReviews(revRes.data);
    } catch (err) {
      setReviewError("Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 mt-8 bg-white rounded-2xl shadow-lg">
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && business && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-blue-700">{business.name}</h1>
            <p className="text-gray-600 mb-1">{business.category} • {business.location}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="ml-2 text-gray-700 text-lg font-semibold">{business.rating || "N/A"}</span>
            </div>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Reviews</h2>
            {reviews.length === 0 && <div className="text-gray-500 mb-4">No reviews yet.</div>}
            {reviews.map((review) => (
              <ReviewCard key={review._id || review.id} {...review} />
            ))}
            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Add Your Review</h2>
            {reviewError && <div className="text-red-500 mb-2">{reviewError}</div>}
            {reviewSuccess && <div className="text-green-600 mb-2">{reviewSuccess}</div>}
            <ReviewForm onSubmit={handleReviewSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessDetails;