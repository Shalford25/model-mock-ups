"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "../components/MyContext";
import { verifyUser } from "../service/AccountRoutes";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(MyContext);
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Authenticate the user
      const user = await verifyUser(username, password);

      // Log the user into the context
      login({ username: user.username, role: user.role });

      // Redirect to the home page
      router.push("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input className="border-2 rounded px-2 py-1"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password: </label>
          <input className="border-2 rounded px-2 py-1 "
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="border-2 rounded px-2 py-1">Login</button>
      </form>
    </div>
  );
}