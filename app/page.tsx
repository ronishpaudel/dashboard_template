"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { OAuth } from "./component/oAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <OAuth />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default Home;
