import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";
import { fa } from "zod/v4/locales";

interface LikeButtonProps {
  postId: string;
}

const LikeButton = ({ postId }: LikeButtonProps) => {
    const [liked,setLiked] = useState(false)
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();

      if (!token) throw new Error("Authentication required");
        
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },

    onSuccess: () => {
      setLiked((prev) =>!prev)
      queryClient.invalidateQueries({
        queryKey: ["SingleBlog"],
      });
    },

    onError: (error) => {
      console.error("Like failed:", error);
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
       className={`flex items-center gap-2 px-4 py-3 border rounded-full transition-all disabled:opacity-50 ${
        liked
          ? "bg-red-50 border-red-500 text-red-500"
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Heart />
      {mutation.isPending ? "Loading..." : "Like"}
    </button>
  );
};

export default LikeButton;