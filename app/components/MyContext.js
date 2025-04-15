"use client";
import { useState, createContext } from "react";
import React from "react";

export const MyContext = React.createContext();

export function Provider({ children }) {


  return (
    <MyContext.Provider value={{}}>
      {children} {/* Ensure children is rendered directly */}
    </MyContext.Provider>
  );
}