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

// Register a new user
export async function registerUser(username, password, email) {
  const client = await pool.connect();

  try {
    // Check if the username or email already exists
    const existingUser = await client.query(
      "SELECT * FROM Accounts WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Username or email already exists");
    }

    // Insert the new user into the database
    const role = "user"; // Default role
    await client.query(
      "INSERT INTO Accounts (username, password, email, role) VALUES ($1, $2, $3, $4)",
      [username, password, email, role]
    );

    return { message: "User registered successfully" };
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

// Register route
accountRouter.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const result = await registerUser(username, password, email);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
});

export default accountRouter;