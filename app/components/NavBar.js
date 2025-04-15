"use client";

import { useContext } from "react";
import { MyContext } from "./MyContext";

export default function NavBar() {
  const { account, logout, cart } = useContext(MyContext); // Include cart to track changes

  return (
    <div className="grid grid-cols-6 bg-blue-100 text-2xl px-10 py-20">
      <div><a href="/">Home</a></div>
      {account?.role === "admin" && <div><a href="/business">Business</a></div>}
      {account?.role === "user" && <div><a href="/cart">Cart ({cart.length})</a></div>}
      {!account ? (
        <div><a href="/login">Login</a></div>
      ) : (
        <div>
          <button onClick={logout} className="text-red-500">Logout</button>
        </div>
      )}
    </div>
  );
}