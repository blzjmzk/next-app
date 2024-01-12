"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession(); //zmieniamy nazwę data na session

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <Link href="/dashboard">Dashboard</Link>
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className="ml-3">
            Sign Out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
