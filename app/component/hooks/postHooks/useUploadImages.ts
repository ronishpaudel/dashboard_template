import { useMutation } from "@tanstack/react-query";
import { API } from "../../api/API";

const uploadImage = async (formData: FormData) => {
  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log("Image uploaded successfully:", data);
      // handle success logic
    },
    onError: (error) => {
      console.error("Error uploading image:", error);
      // handle error logic
    },
  });
};
