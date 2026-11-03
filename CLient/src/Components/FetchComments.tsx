import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
interface Props {
  postId: string;
}
const FetchComments = ({postId}:Props) => {
 
  
  
  const { data, isPending, error } = useQuery({
   
    queryKey: ["comments", postId],
    queryFn: async () => {
       
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`
      );
      console.log(data.comments)
      return response.data.comments;
    },
    
  });

  if (isPending) return <p>Loading comments...</p>;

  if (error) return <p>Failed to load comments.</p>;

  if (!data?.length) return <p>No comments yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Comments ({data.length})
      </h2>

      {data.map((comment) => (
        <div key={comment._id} className="border p-4 rounded-xl">
          <h3 className="font-semibold">
            {comment.user?.userName || "Anonymous"}
          </h3>

          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchComments;