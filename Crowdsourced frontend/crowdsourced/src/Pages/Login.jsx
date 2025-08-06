import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import api from "../Components/api";

const Login = () => {
  const [username, setUsername] = useState("");
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
      await api.post("/auth/login", { username, password });
      setSuccess("Login successful!");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Login</h1>
        <form className="bg-white flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
        <p className="mt-4 text-center">Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a></p>
      </div>
    </div>
  );
};

export default Login;