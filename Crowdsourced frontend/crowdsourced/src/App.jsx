import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BusinessDetails from "./Pages/BusinessDetails";
import SubmitReview from "./Pages/SubmitReview";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
