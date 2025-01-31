import { createContext, FC, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";

interface AuthContextType {
  user: any;
  googleSignIn: () => void;
  logOut: () => void;
  emailSignUp: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
}

export const AuthContextProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const emailSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  const signUpWithEmail = (email: string, password: string, name: string) => {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, emailSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }
  return context;
};
