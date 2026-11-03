import { useAuth, useUser } from '@clerk/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import z from 'zod';

const commentSchema = z.object({
  comment: z
    .string()
    .min(3, 'Comment must be at least 3 characters')
    .max(500, 'Comment cannot exceed 500 characters'),
});
interface Props {
  postId: string;
}

type CommentForm = z.infer<typeof commentSchema>;

const CommentsForm = ({postId}:Props) => {
  
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();
  const queryClient = useQueryClient();
  console.log("Post ID:", postId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  });

  // Mutation for creating a comment
  const mutation = useMutation({
    mutationFn: async (data: CommentForm) => {
      if (!postId) throw new Error('Post Id is missing');

      const token = await getToken();

      if (!token) throw new Error('Authentication required');

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/comments/${postId}`,
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log("STATUS:", response.status);
console.log("RESPONSE:", response.data);

return response.data;
    },
    
    onSuccess: () => {
      toast.success('Comment posted successfully!');
      reset();

      // Refresh comments if your comments query uses this key
      queryClient.invalidateQueries({
        queryKey: ['Comments', postId],
      });
    },

    onError: (error) => {
      console.error('Failed to post comment:', error);
      toast.error('Failed to post comment.');
    },
  });

  const onSubmit = (data: CommentForm) => {
    mutation.mutate(data);
    console.log(data)
  };

  if (!isLoaded) return <p>Loading...</p>;

  if (!isSignedIn) {
    return <p>Please sign in to leave a comment.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
    >
      <textarea
        {...register('comment')}
        placeholder="Write your comment..."
        className="w-full min-h-32 p-4 border rounded-xl resize-none focus:outline-none focus:border-purple-500"
      />

      {errors.comment && (
        <p className="text-red-500 text-sm">
          {errors.comment.message}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-purple-600 text-white px-6 py-3 rounded-full self-start disabled:opacity-50"
      >
        {mutation.isPending ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentsForm;