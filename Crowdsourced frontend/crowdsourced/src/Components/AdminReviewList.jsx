import React from "react";

const mockReviews = [
  { id: 1, username: "User1", text: "Great service!", rating: 5 },
  { id: 2, username: "User2", text: "Not bad.", rating: 3 },
];

const AdminReviewList = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Pending Reviews</h2>
      {mockReviews.map((review) => (
        <div key={review.id} className="flex justify-between items-center mb-3 p-3 bg-gray-50 rounded-lg">
          <div>
            <span className="font-semibold text-gray-800">{review.username}</span>: {review.text} ({review.rating}★)
          </div>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Approve</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminReviewList;