"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../components/MyContext";
import { getInventoryBySearch } from "../service/InventoryRoutes";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { addToCart, account } = useContext(MyContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      if (query) {
        const data = await getInventoryBySearch(query);
        setResults(data);
      }
    }
    fetchResults();
  }, [query]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-md flex flex-col items-center"
            >
              <img
                src={item.imagelink}
                alt={item.name}
                className="w-32 h-32 object-cover mb-4"
              />
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-gray-700">${Number(item.price).toFixed(2)}</p>
              <p className="text-gray-600">
                {item.quantity > 0
                  ? `Available: ${item.quantity}`
                  : "Out of Stock"}
              </p>
              {item.quantity > 0 ? (
                account?.role === "user" ? (
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Login as a user to purchase
                  </p>
                )
              ) : (
                <p className="text-sm text-red-400 font-medium">Out of Stock</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}