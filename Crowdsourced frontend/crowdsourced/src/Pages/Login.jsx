import React from "react";
import Navbar from "../Components/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Login</h1>
        <form className="bg-white flex flex-col gap-4">
          <input type="text" placeholder="Username" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="password" placeholder="Password" className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">Login</button>
        </form>
        <p className="mt-4 text-center">Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a></p>
      </div>
    </div>
  );
};

export default Login;