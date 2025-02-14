"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut, emailSignUp } = UserAuth() || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpWithGoogle = async (email: string, password: string) => {
    try {
      await emailSignUp(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="h-20 w-full flex items-center justify-between p-2">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex">
          <li className="p-2 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="p-2 cursor-pointer">
            <Link href="/Pokemon">Pokemon</Link>
          </li>
          <li className="p-2 cursor-pointer">
            <Link href="/Support-us">Support us</Link>
          </li>
          <li className="p-2 cursor-pointer">
            <Link href="/Subscriptions">Subscriptions</Link>
          </li>
        </ul>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 cursor-pointer"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>

        {!user ? (
          <ul className="hidden md:flex">
            <li className="p-2 cursor-pointer" onClick={handleSignIn}>
              sign in with Google
            </li>
          </ul>
        ) : (
          <ul className="hidden md:flex flex-col w-[250px]">
            <li className="p-2 justify-center">
              <Link href="/Profile">Welcome {user.displayName}</Link>
            </li>
            <li
              className="p-2 cursor-pointer justify-center"
              onClick={handleSignOut}
            >
              sign out
            </li>
          </ul>
        )}
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center bg-gray-100 p-4">
            <li className="p-2 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/Pokemon">Pokemon</Link>
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/Support-us">Support us</Link>
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/Subscriptions">Subscriptions</Link>
            </li>
            {!user ? (
              <li className="p-2 cursor-pointer" onClick={handleSignIn}>
                sign in with Google
              </li>
            ) : (
              <>
                <li className="p-2 cursor-pointer">
                  <Link href="/Profile">Welcome {user.displayName}</Link>
                </li>
                <li className="p-2 cursor-pointer" onClick={handleSignOut}>
                  sign out
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      <hr />
    </div>
  );
};

export default Navbar;
