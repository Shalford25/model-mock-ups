"use client";

import { useContext } from "react";
import { MyContext } from "../components/MyContext";
import { updateInventoryQuantity } from "../service/InventoryRoutes";

export default function CartPage() {
  const { cart, updateCartQuantity, clearCart } = useContext(MyContext);

  const handlePurchase = async () => {
    try {
      for (const item of cart) {
        if (item.quantity > item.availableQuantity) {
          alert(`Cannot purchase more than available quantity for ${item.name}`);
          return;
        }
        await updateInventoryQuantity(item.id, -item.quantity); // Subtract the quantity
      }
      alert("Purchase successful!");
      clearCart(); // Clear the cart after purchase
    } catch (error) {
      console.error("Failed to complete purchase:", error);
      alert("Failed to complete purchase.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="mb-4">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>Price: ${Number(item.price).toFixed(2)}</p>
              <p>Available: {item.availableQuantity}</p>
              <label>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max={item.availableQuantity} // Prevent exceeding available quantity
                  onChange={(e) =>
                    updateCartQuantity(item.id, Number(e.target.value))
                  }
                  className="ml-2 border rounded px-2 py-1"
                />
              </label>
            </div>
          ))}
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handlePurchase}
          >
            Purchase
          </button>
        </div>
      )}
    </div>
  );
}