import React, { useState } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut, emailSignUp } = UserAuth() || {};

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

  const handleSigOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-20 w-full flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/Pokemon">Pokemon</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/Subscribtions">Subscriptions</Link>
        </li>
      </ul>

      {!user ? (
        <ul className="flex">
          <li className="p-2 cursor-pointer" onClick={handleSignIn}>
            sign in
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col  w-[250px] ">
          <li className="p-2 justify-center">Welcome {user.displayName}</li>
          <li
            className="p-2 cursor-pointer justify-center"
            onClick={handleSigOut}
          >
            sign out
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
