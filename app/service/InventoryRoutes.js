"use server";
import pool from "./PoolConnection"; // Import your PostgreSQL connection pool

export async function getAllInventory() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT id, name, description, imagelink, CAST(price AS FLOAT) AS price, quantity FROM Inventory"
    );
    return result.rows; // Return all inventory items
  } finally {
    client.release();
  }
}

export async function getInventoryById(id) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT id, name, description, imagelink, CAST(price AS FLOAT) AS price, quantity FROM Inventory WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("Item not found");
    }
    return result.rows[0]; // Return the specific inventory item
  } finally {
    client.release();
  }
}

// Add a new inventory item
export async function addInventoryItem(name, description, imagelink, price, quantity) {
  const client = await pool.connect();

  try {
    await client.query(
      "INSERT INTO Inventory (name, description, imagelink, price, quantity) VALUES ($1, $2, $3, $4, $5)",
      [name, description, imagelink, price, quantity]
    );
    return { message: "Item added successfully" };
  } finally {
    client.release();
  }
}

// Remove an inventory item by ID
export async function removeInventoryItem(id) {
  const client = await pool.connect();

  try {
    await client.query("DELETE FROM Inventory WHERE id = $1", [id]);
    return { message: "Item removed successfully" };
  } finally {
    client.release();
  }
}

// Update an inventory item by ID
export async function updateInventoryItem(id, name, description, imagelink, price, quantity) {
  const client = await pool.connect();

  try {
    await client.query(
      "UPDATE Inventory SET name = $1, description = $2, imagelink = $3, price = $4, quantity = $5 WHERE id = $6",
      [name, description, imagelink, price, quantity, id]
    );
    return { message: "Item updated successfully" };
  } finally {
    client.release();
  }
}

export async function updateInventoryQuantity(id, quantityChange) {
  const client = await pool.connect();

  try {
    // Update only the quantity column by adding the quantityChange
    await client.query(
      `UPDATE Inventory SET quantity = quantity + $1 WHERE id = $2`,[quantityChange, id]
    );
    return { message: "Quantity updated successfully" };
  } finally {
    client.release();
  }
}