import { useMutation } from "@tanstack/react-query";
import { API } from "../../api/API";

export interface UploadResponse {
  message: string;
  files: File[];
}

interface UploadError {
  message: string;
}

// Function to handle image upload
const uploadImages = async (formData: FormData): Promise<UploadResponse> => {
  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Custom hook to use the upload mutation
export const useImageUpload = () => {
  return useMutation<UploadResponse, UploadError, FormData>({
    mutationFn: uploadImages,
    onError: (error: UploadError) => {
      console.error("Error uploading images:", error.message);
    },
    onSuccess: (data: UploadResponse) => {
      console.log("Images uploaded successfully:", data.files);
    },
  });
};
