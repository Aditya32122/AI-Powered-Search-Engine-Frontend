import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";  // ✅ Corrected path

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("https://ai-powered-search-engine-production.up.railway.app/login/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      login(); // Update the AuthContext state
      navigate("/");
    } catch (error) {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  const handleTestCredentials = () => {
    setUsername("testuser");
    setPassword("testpassword");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Login</h2>

      <div className="flex flex-col w-full max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          onClick={handleLogin}
          disabled={loading}
          className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          onClick={handleTestCredentials}
          className="px-5 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg font-semibold transition"
        >
          Use Test Credentials
        </button>
      </div>

      <p className="mt-4 text-gray-400">
        Don't have an account?{" "}
        <a href="/signup" className="text-purple-300 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;