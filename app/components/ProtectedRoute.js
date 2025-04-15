"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "./MyContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { account, hasRole } = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    if (!account || (requiredRole && !hasRole(requiredRole))) {
      router.push("/login"); // Redirect to login if unauthorized
    }
  }, [account, hasRole, requiredRole, router]);

  return <>{account && (!requiredRole || hasRole(requiredRole)) && children}</>;
}