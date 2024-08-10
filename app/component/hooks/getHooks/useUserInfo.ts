import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

interface UserResponse {
  id: string;
  email: string;
  name: string;
  profilePic: string;
}

const fetchUser = async (): Promise<UserResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found in local storage");
  }

  const response = await API.get("/user/me", {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response) {
    throw new Error("Failed to fetch user data");
  }

  return response.data;
};

const useUserInfo = () => {
  return useQuery<UserResponse, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export { useUserInfo };
