"use client";

import Link from "next/link";

export default function InventoryGrid({ inventory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {inventory.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 shadow-md flex flex-col items-center"
        >
          <img
            src={item.imagelink}
            alt={item.name}
            className="w-32 h-32 object-cover mb-4"
          />
          <Link href={`/dynamic/${item.id}`}>
            <h2 className="text-lg font-bold text-blue-500 hover:underline">
              {item.name}
            </h2>
          </Link>
          <p className="text-gray-700">${Number(item.price).toFixed(2)}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => alert("Purchase functionality coming soon!")}
          >
            Purchase
          </button>
        </div>
      ))}
    </div>
  );
}