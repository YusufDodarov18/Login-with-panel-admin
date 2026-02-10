"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      return;
    }

    try {
      const { data } = await axios.post("/api/registration", {
        username,
        email,
        password,
      });
      Cookies.set("token", data?.token);
      window.location = "/";
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-xl hover:opacity-90 transition"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have account?
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
