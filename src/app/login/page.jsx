"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`/api/login`, { email, password });
      Cookies.set("token", data?.token);
      window.location = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border outline-0 rounded-xl"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-xl hover:opacity-90 transition"
          >
            Submit
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have account?
            <Link
              href="/registration"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
