import React from "react";

const AdminReviewList = ({ reviews = [], onApprove, onReject }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Pending Reviews</h2>
      {reviews.length === 0 && <div className="text-gray-500">No pending reviews.</div>}
      {reviews.map((review) => (
        <div key={review._id || review.id} className="flex justify-between items-center mb-3 p-3 bg-gray-50 rounded-lg">
          <div>
            <span className="font-semibold text-gray-800">{review.username || review.user?.username || "User"}</span>: {review.text} ({review.rating}★)
          </div>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition" onClick={() => onApprove && onApprove(review._id || review.id)}>Approve</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => onReject && onReject(review._id || review.id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminReviewList;