"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./MyContext";
import Link from "next/link";

export default function InventoryGrid({ inventory }) {
  const { addToCart, account } = useContext(MyContext);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("right");

  const scrollSpeed = 1.5;
  const scrollInterval = 20;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || inventory.length === 0) return;

    const interval = setInterval(() => {
      if (isHovered || isFading) return;

      if (scrollDirection === "right") {
        container.scrollLeft += scrollSpeed;

        if (
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
        ) {
          setScrollDirection("left");
        }
      } else {
        container.scrollLeft -= scrollSpeed;

        if (container.scrollLeft <= 0) {
          setScrollDirection("right");
        }
      }
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [isHovered, isFading, scrollDirection, inventory]);

  return (
    <div className="px-6 py-8">
      <div
        ref={scrollRef}
        className={
          "flex gap-6 overflow-x-scroll scroll-smooth transition-opacity duration-300" +
          (isFading ? " opacity-0" : " opacity-100")
        }
        style={{paddingBottom: "20px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {inventory.map((item) => (
          <div
            key={item.id}
            className="min-w-[18rem] shrink-0 border border-gray-200 rounded-lg p-6 bg-white flex flex-col space-y-3"
          >
            <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={item.imagelink}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <Link href={`/dynamic/${item.id}`}>
              <h2 className="text-lg font-semibold text-gray-900 hover:underline line-clamp-2">
                {item.name}
              </h2>
            </Link>

            <p className="text-lg text-gray-700">${Number(item.price).toFixed(2)}</p>
            <p className="text-sm text-gray-500">
              {item.quantity > 0 ? `Available: ${item.quantity}` : "Out of Stock"}
            </p>

            {item.quantity > 0 ? (
              account?.role === "user" ? (
                <button
                  className="mt-auto text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              ) : (
                <p className="text-sm text-gray-400 italic">Login to purchase</p>
              )
            ) : (
              <p className="text-sm text-red-400 font-medium">Out of Stock</p>
            )}
          </div>
        ))}
      </div>
      <section className="mt-12 px-6 py-8 flex justify-end items-center bg-blue-300 text-white h-auto">
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-md">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-4">Register to add models to your collection today.</p>
          <a href="/register" className="bg-white text-blue-500 px-4 py-2 rounded-md text-lg font-semibold hover:bg-gray-200">Sign Up Now</a>
        </div>
      </section>


      <section className="mt-12 px-6 py-8 max-w-[800px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Model Mock-Ups</h2>
        
        <p className="text-lg text-gray-700 mb-4">
          At Model Mock-Ups, we are passionate about bringing the finest model kits and collectibles to hobbyists and collectors. Our mission is to inspire creativity and provide a seamless shopping experience for everyone, whether you're a beginner or a seasoned pro.
        </p>
        
        <div className="mt-6">
          <Link
            href="/aboutus"
            className="text-blue-500 font-semibold hover:underline"
          >
            Learn more about our mission and team
          </Link>
        </div>
      </section>
    </div>
  );
}
