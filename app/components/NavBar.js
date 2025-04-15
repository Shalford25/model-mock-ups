"use client";
import {useState, useContext, useEffect} from "react";
import { MyContext } from "./MyContext";
export default function NavBar(){
    return(

        <div className="grid grid-cols-6 bg-blue-100 text-2xl px-10 py-20">
          <div><a href="/">Home</a></div>
           <div><a href="/business">Business</a></div>
           <div><a href="/login">Login</a></div>
           <div><a href="/register">Register</a></div>
           <div><a href="/cart">Cart</a></div>
        </div>
      );
}