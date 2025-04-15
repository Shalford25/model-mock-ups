"use server";
import express from "express";
import pool from "./PoolConnection"; // Import your PostgreSQL connection pool

const accountRouter = express.Router();

// Verify user credentials
export async function verifyUser(username, password) {
  const client = await pool.connect();

  try {
    // Query the database for the user
    const result = await client.query(
      "SELECT * FROM Accounts WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = result.rows[0];

    // Verify the password (assuming passwords are hashed)
    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user; // Return user data if valid
  } finally {
    client.release();
  }
}

// Login route
accountRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await verifyUser(username, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ message: error.message || "Login failed" });
  }
});

export default accountRouter;