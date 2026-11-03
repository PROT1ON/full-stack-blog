
import React from "react";
import { Save, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/react";


type BlogActionsProps =
 {
  postId: string;
};

const BlogActions = ({ postId }: BlogActionsProps) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // Get Clerk authentication headers
  const getAuthConfig = async () => {
    const token = await getToken();

    if (!token) {
      throw new Error("You are not authenticated");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Save / Unsave post
  const saveMutation = useMutation({
    mutationFn: async () => {
      const config = await getAuthConfig();

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        { postId },
        config
      );

      return data;
    },

    onSuccess: (data) => {
      console.log(data.message);

      queryClient.invalidateQueries({
        queryKey: ["savedPosts"],
      });
    },

    onError: (error) => {
      console.error("Save error:", error);
    },
  });

  // Delete post
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const config = await getAuthConfig();

      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        config
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },

    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => saveMutation.mutate()}
        disabled={saveMutation.isPending}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
      >
        <Save size={17} />
        {saveMutation.isPending ? "Saving..." : "Save"}
      </button>

      <button
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        <Trash2 size={17} />
        {deleteMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default BlogActions;
