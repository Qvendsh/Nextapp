"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Providerr from "@/components/Providerr";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Providerr>{children}</Providerr>
    </div>
  );
};

export default LayoutWrapper;
