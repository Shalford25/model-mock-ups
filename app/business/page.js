"use client";

import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from "react";
import {
  getAllInventory,
  addInventoryItem,
  removeInventoryItem,
  updateInventoryItem,
} from "../service/InventoryRoutes";

export default function BusinessPage() {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    imagelink: "",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch inventory on page load
  useEffect(() => {
    async function fetchInventory() {
      try {
        const data = await getAllInventory();
        setInventory(data);
      } catch (err) {
        setError("Failed to fetch inventory");
      }
    }
    fetchInventory();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const { name, description, imagelink, price, quantity } = formData;
      await addInventoryItem(name, description, imagelink, parseFloat(price), parseInt(quantity));
      setSuccess("Item added successfully");
      setError("");
      setFormData({ id: "", name: "", description: "", imagelink: "", price: "", quantity: "" });
      const updatedInventory = await getAllInventory();
      setInventory(updatedInventory);
    } catch (err) {
      setError("Failed to add item");
      setSuccess("");
    }
  };

  // Remove an item
  const handleRemoveItem = async (id) => {
    try {
      await removeInventoryItem(id);
      setSuccess("Item removed successfully");
      setError("");
      const updatedInventory = await getAllInventory();
      setInventory(updatedInventory);
    } catch (err) {
      setError("Failed to remove item");
      setSuccess("");
    }
  };

  // Update an item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const { id, name, description, imagelink, price, quantity } = formData;
      await updateInventoryItem(id, name, description, imagelink, parseFloat(price), parseInt(quantity));
      setSuccess("Item updated successfully");
      setError("");
      setFormData({ id: "", name: "", description: "", imagelink: "", price: "", quantity: "" });
      const updatedInventory = await getAllInventory();
      setInventory(updatedInventory);
    } catch (err) {
      setError("Failed to update item");
      setSuccess("");
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Inventory Table */}
        <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={item.imagelink} alt={item.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border border-gray-300 px-4 py-2">${item.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() =>
                      setFormData({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        imagelink: item.imagelink,
                        price: item.price,
                        quantity: item.quantity,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add/Update Form */}
        <form onSubmit={formData.id ? handleUpdateItem : handleAddItem} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image Link:</label>
            <input
              type="text"
              name="imagelink"
              value={formData.imagelink}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {formData.id ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}