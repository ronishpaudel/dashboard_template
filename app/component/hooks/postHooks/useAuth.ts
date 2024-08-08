"use client";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../api/API";
import { useRouter } from "next/navigation";

const authenticateUser = async (token: string) => {
  const response = await API.post(
    "/auth/google/callback",
    { token },
    { withCredentials: true }
  );
  return response.data;
};

const useAuth = () => {
  const router = useRouter();

  const login = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      console.log("User data:", data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return login;
};

export default useAuth;
