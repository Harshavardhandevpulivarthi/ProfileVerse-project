import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-green-500 mb-4">About Our Profiles</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          A profile is a personalized showcase of your skills, experience, and achievements.
          It serves as a digital resume or an online presence that highlights your best work in a professional way.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          Search for the best profiles that suit clients' needs and expectations.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          Explore our platform to discover top-tier professionals and services that drive success in the digital space.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/home")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
