import { useMutation } from "@tanstack/react-query";
import { API } from "../../api/API";
import { useRouter } from "next/navigation";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    profilePic: string;
  };
  hasUsername: boolean;
}

const loginWithGoogle = async (token: string): Promise<AuthResponse> => {
  const response = await API.post("/auth/registration", {
    token,
  });

  if (!response) {
    throw new Error("Failed to create user");
  }

  return response.data;
};
const useGoogleLogin = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data, variables) => {
      console.log("Success:", data);
      console.log("Success token:", variables);
      localStorage.setItem("token", variables);
      push("/dashboard"); // Navigate to dashboard
    },

    onError: (error) => {
      console.error("Error:", error);
    },
  });
};

export { useGoogleLogin };
