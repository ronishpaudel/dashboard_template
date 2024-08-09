"use client";

import React from "react";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import useAuth from "./hooks/postHooks/useAuth";

const OAuth: React.FC = () => {
  const { mutate: login, isError, error } = useAuth();

  const handleLoginSuccess = (response: CredentialResponse) => {
    console.log("Login Success:", response);
    const token = response.credential!;
    login(token);
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1 className="text-2xl font-bold dark:text-white">
        Sign in to your account
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Or register for a new account
      </p>

      {isError && (
        <div className="mt-4 text-red-500">
          {error instanceof Error
            ? error.message
            : "Login failed. Please try again."}
        </div>
      )}

      <div className="mt-4">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </div>
  );
};

export { OAuth };
