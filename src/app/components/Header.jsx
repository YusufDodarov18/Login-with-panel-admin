"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const token = Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href={`/`}>
          <h1 className="text-2xl font-bold">Home</h1>
        </Link>

        <nav>
          <ul className="flex gap-6 text-lg font-medium items-center">
            <li>About</li>

            <li>
              <Link
                href="/dashboard"
                className="hover:text-gray-500 transition"
              >
                Dashboard
              </Link>
            </li>

            <li>
              {token ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:opacity-90 transition"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
