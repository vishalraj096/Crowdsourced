import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { rating, text };
    if (photo) formData.photo = photo;
    if (onSubmit) await onSubmit(formData);
    setLoading(false);
    setText("");
    setPhoto(null);
    setRating(5);
  };

  return (
    <form className="bg-white p-8 rounded-xl shadow flex flex-col gap-4 border border-gray-100" onSubmit={handleSubmit}>
      <label className="font-semibold text-gray-700">Rating</label>
      <select className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={rating} onChange={e => setRating(Number(e.target.value))}>
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Good</option>
        <option value="3">3 - Average</option>
        <option value="2">2 - Poor</option>
        <option value="1">1 - Terrible</option>
      </select>
      <label className="font-semibold text-gray-700">Review</label>
      <textarea className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} placeholder="Write your review..." value={text} onChange={e => setText(e.target.value)} />
      <label className="font-semibold text-gray-700">Photo (optional)</label>
      <input type="file" className="p-2" onChange={e => setPhoto(e.target.files[0])} />
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold" disabled={loading}>{loading ? "Submitting..." : "Submit Review"}</button>
    </form>
  );
};

export default ReviewForm;