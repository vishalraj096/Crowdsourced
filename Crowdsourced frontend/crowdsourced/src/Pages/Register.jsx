import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../Components/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post("/auth/register", { username, email, password });
      setSuccess("Registration successful! You can now log in.");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Register</h1>
        <form className="bg-white flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
        <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-600 underline">Login</a></p>
      </div>
    </div>
  );
};

export default Register;