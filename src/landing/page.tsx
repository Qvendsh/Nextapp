"use client";
import React, { useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { UserAuth } from "@/context/AuthContext";

const Page = () => {
  const { user, googleSignIn, logOut, emailSignUp } = UserAuth() || {};
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const signUpWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signInWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {user ? (
        <div className="text-xl font-semibold text-green-600">
          You are logged in
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome!</h2>
          <ul className="space-y-4 mb-6">
            <li
              className="p-2 text-center cursor-pointer text-blue-500 hover:text-blue-700 transition"
              onClick={signInWithEmail}
            >
              Sign in with Gmail
            </li>
            <li
              className="p-2 text-center cursor-pointer text-blue-500 hover:text-blue-700 transition"
              onClick={signUpWithEmail}
            >
              Sign up with Gmail
            </li>
          </ul>

          <div className="space-y-4 flex flex-col items-center ">
            <div className="border-2 border-gray-300 rounded-md p-2 max-w-xs w-full flex justify-center">
              <input
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className=" focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="border-2 border-gray-300 rounded-md p-2 max-w-xs w-full flex justify-center ">
              <input
                type="password"
                value={password}
                placeholder="yourpassword123"
                onChange={(e) => setPassword(e.target.value)}
                className=" focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="border-2 border-gray-300 rounded-md p-2 max-w-xs w-full flex justify-center">
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
