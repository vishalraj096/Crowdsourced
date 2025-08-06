import React from "react";
import Navbar from "../Components/Navbar";
import ReviewCard from "../Components/ReviewCard";
import ReviewForm from "../Components/ReviewForm";

const mockBusiness = {
  name: "Pizza Place",
  category: "Restaurant",
  location: "Downtown",
  rating: 4.5,
};

const mockReviews = [
  { id: 1, username: "Alice", rating: 5, text: "Amazing pizza!" },
  { id: 2, username: "Bob", rating: 4, text: "Good, but a bit pricey." },
];

const BusinessDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 mt-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">{mockBusiness.name}</h1>
        <p className="text-gray-600 mb-1">{mockBusiness.category} • {mockBusiness.location}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-2xl">★</span>
          <span className="ml-2 text-gray-700 text-lg font-semibold">{mockBusiness.rating}</span>
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Reviews</h2>
        {mockReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
        <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Add Your Review</h2>
        <ReviewForm />
      </div>
    </div>
  );
};

export default BusinessDetails;