"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import SignIn from "./component/Signin";
import { OAuth } from "./component/oAuth";

const Home: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <OAuth />
    </QueryClientProvider>
  );
};

export default Home;
