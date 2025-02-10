"use client";

import "./globals.css";
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
          <Navbar />
          <Providerr children={children}></Providerr>
        </AuthContextProvider>
      </body>
    </html>
  );
}
