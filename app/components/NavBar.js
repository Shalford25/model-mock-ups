"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "./MyContext";

export default function NavBar() {
  const { account, logout, cart } = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full grid grid-cols-6 bg-blue-400 text-2xl px-5 py-5 shadow-md z-50">
      <div>
        <a href="/">
          <img
            src="/icons/icon.png"
            alt="Home"
            className="h-14 w-auto"
          />
        </a>
      </div>
      <div className="col-span-4 flex justify-center items-center">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-l-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
      <div className="col-span-1 flex justify-end items-center relative">
        {account?.role === "user" && (
          <div className="flex items-center mr-6">
            <a href="/cart" className="flex items-center text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11l-1.5-6M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 104 0"
                />
              </svg>
              <span className="ml-2 text-black">{cart.length}</span>
            </a>
          </div>
        )}

        <div className="flex items-center">
          <button
            className="text-black text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            &#9776;
          </button>
        </div>

        {menuOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-48 text-base"
          >
            {account?.role === "admin" && (
              <a
                href="/business"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Business
              </a>
            )}
            <a
              href="/aboutus"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              About Us
            </a>
            <a href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
              Register
            </a>
            {!account ? (
              <a
                href="/login"
                className="block px-4 py-2 text-blue-500 hover:bg-gray-200"
              >
                Login
              </a>
            ) : (
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
