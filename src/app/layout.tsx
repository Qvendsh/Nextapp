import "./globals.css";
import React from "react";
import { Metadata } from "next";
import { AuthContextProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: {
    template: `%s`,
    default: "Pokemons",
  },
  description: "Choose your pokemon",
  metadataBase: new URL("https://9856-195-72-146-220.ngrok-free.app/"),
  twitter: {
    card: "summary_large_image",
    site: "https://9856-195-72-146-220.ngrok-free.app/",
    creator: "@Qvendsh",
    title: "Pokemons",
    description: "Choose your pokemon",
    images: ["/awawa.jpg"],
  },
  openGraph: {
    images: ["/awawa.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthContextProvider>
      </body>
    </html>
  );
}
