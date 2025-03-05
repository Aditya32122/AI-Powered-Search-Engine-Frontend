import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) return;

    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/register/", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Sign Up</h2>

      <div className="flex flex-col w-full max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>

      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-purple-300 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
