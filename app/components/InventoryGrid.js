"use client";

import { useContext } from "react";
import { MyContext } from "./MyContext";
import Link from "next/link";

export default function InventoryGrid({ inventory }) {
  const { addToCart } = useContext(MyContext);

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
          <p className="text-gray-600">Available: {item.quantity}</p>
          {item.quantity > 0 ? (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          ) : (
            <p className="mt-4 text-red-500 font-bold">Out of Stock</p>
          )}
        </div>
      ))}
    </div>
  );
}