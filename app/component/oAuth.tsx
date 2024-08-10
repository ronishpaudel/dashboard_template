import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "./hooks/postHooks/useAuth";

initializeApp(firebaseConfig);

const OAuth: React.FC = () => {
  const { mutate: login, isPending, isError } = useGoogleLogin();

  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      login(token); // Pass the token to the mutation
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold dark:text-white">
        Sign in to your account
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Or register for a new account
      </p>

      <div className="mt-4">
        <button
          onClick={handleLogin}
          className="flex justify-items-center px-6 py-3 text-slate-950 rounded-md bg-white dark:bg-white border-slate-950 shadow-lg"
          disabled={isPending}
        >
          <FcGoogle className="w-6 h-6 mr-2" />
          Sign in with Google 🚀
        </button>
        {isError && (
          <p className="mt-2 text-red-500">Login failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export { OAuth };
