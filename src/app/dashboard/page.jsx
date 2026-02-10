"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const addItem = () => {
    if (name.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: name,
    };

    setList([...list, newItem]);
    setName("");
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const saved = localStorage.getItem("data");
    if (saved) {
      setList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addItem}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:opacity-90 transition"
          >
            Add
          </button>
        </div>

        <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No data
                </td>
              </tr>
            ) : (
              list.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{item.name}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:opacity-90"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
