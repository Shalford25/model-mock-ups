"use client";

export default function DynamicItem({ item }) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <img
        src={item.imagelink}
        alt={item.name}
        className="vw-100 vh-100 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-700 mb-4">${Number(item.price).toFixed(2)}</p>
      <p className="text-gray-600">{item.description}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => alert("Purchase functionality coming soon!")}
      >
        Purchase
      </button>
    </div>
  );
}