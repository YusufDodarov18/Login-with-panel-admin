"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("data");
    if (saved) setList(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-10">Products </h1>

        {list.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center text-gray-500 text-lg">
            No data yet
          </div>
        ) : (
          <div className="grid gap-4">
            {list.map((item, index) => (
              <div
                key={item.id}
                className="bg-white px-6 py-4 rounded-2xl shadow-md flex items-center justify-between hover:shadow-xl transition"
              >
                <span className="text-lg font-semibold text-gray-700">
                  {index + 1}. {item.name}
                </span>
                <span className="text-sm text-gray-400">ID: {item.id}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
