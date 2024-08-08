"use client";
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Home: React.FC = () => {
  const handleLoginSuccess = (response: any) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex flex-col items-center justify-center w-full h-[100vh]">
        <h1 className="text-2xl font-bold dark:text-white">
          Sign in to your account
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 ">
          Or register for a new account
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          in the new world ecommerce world
        </p>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
