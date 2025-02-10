import React, { useState } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut, emailSignUp } = UserAuth() || {};

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

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
    <div>
      <div className="h-20 w-full flex items-center justify-between p-2">
        <ul className="flex">
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
        {!user ? (
          <ul className="flex">
            <li className="p-2 cursor-pointer" onClick={handleSignIn}>
              sign in with Google
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col  w-[250px] ">
            <li className="p-2 justify-center">
              <Link href="/Profile">Welcome {user.displayName}</Link>
            </li>
            <li
              className="p-2 cursor-pointer justify-center"
              onClick={handleSigOut}
            >
              sign out
            </li>
          </ul>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Navbar;

// return (
//   <div>
//     <div className="h-20 w-full flex items-center justify-between p-2">
//       <ul className="flex sm:flex-row sm:space-x-4 flex-col sm:hidden">
//         <li className="p-2 cursor-pointer">
//           <Link href="/">Home</Link>
//         </li>
//         <li className="p-2 cursor-pointer">
//           <Link href="/Pokemon">Pokemon</Link>
//         </li>
//         <li className="p-2 cursor-pointer">
//           <Link href="/Support-us">Support us</Link>
//         </li>
//         <li className="p-2 cursor-pointer">
//           <Link href="/Subscriptions">Subscriptions</Link>
//         </li>
//       </ul>
//
//       <button
//         className="sm:hidden p-2 bg-blue-500 text-white rounded"
//         onClick={toggleSidebar}
//       >
//         ☰
//       </button>
//
//       {!user ? (
//         <ul className="flex sm:flex-row">
//           <li className="p-2 cursor-pointer" onClick={handleSignIn}>
//             sign in with Google
//           </li>
//         </ul>
//       ) : (
//         <ul className="flex flex-col w-[250px]">
//           <li className="p-2 justify-center">
//             <Link href="/Profile">Welcome {user.displayName}</Link>
//           </li>
//           <li
//             className="p-2 cursor-pointer justify-center"
//             onClick={handleSigOut}
//           >
//             sign out
//           </li>
//         </ul>
//       )}
//     </div>
//
//     {sidebarOpen && (
//       <div className="fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 sm:hidden">
//         <ul>
//           <li className="p-2 cursor-pointer">
//             <Link href="/">Home</Link>
//           </li>
//           <li className="p-2 cursor-pointer">
//             <Link href="/Pokemon">Pokemon</Link>
//           </li>
//           <li className="p-2 cursor-pointer">
//             <Link href="/Support-us">Support us</Link>
//           </li>
//           <li className="p-2 cursor-pointer">
//             <Link href="/Subscriptions">Subscriptions</Link>
//           </li>
//           {!user ? (
//             <li className="p-2 cursor-pointer" onClick={handleSignIn}>
//               sign in with Google
//             </li>
//           ) : (
//             <>
//               <li className="p-2 cursor-pointer">
//                 <Link href="/Profile">Welcome {user.displayName}</Link>
//               </li>
//               <li className="p-2 cursor-pointer" onClick={handleSigOut}>
//                 sign out
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     )}
//
//     <hr />
//   </div>
// );
