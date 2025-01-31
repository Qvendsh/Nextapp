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
    <div>
      <div>Home Page</div>
      {user ? (
        <div>you are logged in</div>
      ) : (
        <div>
          <ul>
            <li className="p-2 cursor-pointer" onClick={signInWithEmail}>
              sign in with google
            </li>
            <li className="p-2 cursor-pointer" onClick={signUpWithEmail}>
              sign up with google
            </li>
          </ul>
          <div className="flex">
            <div className="border-2 border-black">
              <input
                type="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="border-2 border-black">
              <input
                type="password"
                value={password}
                placeholder="yourpassword123"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="border-2 border-black">
              <input
                type="text"
                value={name}
                placeholder="enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
