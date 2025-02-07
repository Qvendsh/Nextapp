"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Providerr from "@/components/Providerr";
import Navbar from "@/components/Navbar";
import React from "react";
import { AuthContextProvider } from "@/context/AuthContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <SessionProvider>
            <Navbar></Navbar>
            <Providerr children={children}></Providerr>
          </SessionProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
