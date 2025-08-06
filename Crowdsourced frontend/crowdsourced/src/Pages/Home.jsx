import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
import BusinessCard from "../Components/Bussinesscard";
import api from "../Components/api";

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/businesses")
      .then(res => {
        setBusinesses(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load businesses");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <header className="bg-white shadow p-8 flex flex-col items-center rounded-b-3xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">Unlocking Possibilities</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Crowdsourced Review Platform</h2>
        <p className="text-gray-500 mt-2 max-w-xl text-center">
          Discover, review, and rate local businesses. Browse by category, submit your own reviews, and help others find the best places in town!
        </p>
      </header>
      <section className="flex justify-center mt-8">
        <SearchBar />
      </section>
      <section className="mt-10 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading && <div className="col-span-full text-center text-gray-500">Loading businesses...</div>}
        {error && <div className="col-span-full text-center text-red-500">{error}</div>}
        {!loading && !error && businesses.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No businesses found.</div>
        )}
        {!loading && !error && businesses.map((biz) => (
          <BusinessCard key={biz._id || biz.id} {...biz} />
        ))}
      </section>
    </div>
  );
};

export default Home;
