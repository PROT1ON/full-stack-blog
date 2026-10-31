import React from "react";
import { useParams } from "react-router-dom";
import { items } from "../Components/Card";
import Image from "../Components/Image";
import { Heart, MessageCircle } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SinglePostPage = () => {
  const commentSchema = z.object({
    comment: z
      .string()
      .min(3, "Comment must be at least 3 characters")
      .max(500, "Comment cannot exceed 500 characters"),
  });

  type CommentForm = z.infer<typeof commentSchema>;

  const { slug } = useParams();

  console.log("URL slug:", slug);
  console.log(
    "Available slugs:",
    items.map((p) => p.slug),
  );

  const post = items.find((p) => p.slug.trim() === slug?.trim());

  console.log("Found post:", post);

  if (!post) {
    return <div>Post not found!</div>;
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (data: CommentForm) => {
    console.log(data);

    reset();
  };
  return (
    <div className="flex flex-col w-full min-h-screen justify-start  px-8 py-4 sm:px-32 sm:py-8 ">
      {/* BreadCrums */}

      {/* Image */}
      <div className="w-full h-[450px] rounded-3xl relative border">
        <Image
          src="/Blog%20/b1.jpg"
          className=" object-cover fill w-full h-full  rounded-3xl"
        />
      </div>
      {/* category */}
      <div className="flex-1 flex flex-col gap-8 justify-start px-8 py-4 sm:px-24 sm:py-12">
        <h2 className="uppercase font-mono font-semibold tracking-tight ">
          {post.category}
        </h2>
        {/* title */}
        <h1 className="font-medium text-5xl tracking-wide">{post.title}</h1>
        {/* excerpt */}
        <p className="font-light leading-1 text-3xl italic">{post.excerpt}</p>
        <div className="flex flex-row items-center  gap-2 text-xs  py-6">
          <div className="p-1.5 rounded-full border-violet-600 border">
            {post.publisher
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>

          <h2 className="font-bold">{post.publisher}</h2>
          <span>{post.date.toLocaleDateString()}</span>
          <Heart className="text-red-400" />
          {post.Liked}

          <MessageCircle className="text-lime-400" />
          {post.comments}
        </div>
        <p className="">{post.description}</p>
        <div className="border-b border-t border-gray-300 my-2 sm:my-10 p-4 flex gap-8">
          <button className="flex  gap-2 px-4 py-3 border-gray-300 border rounded-full">
            <Heart />
            Like
          </button>
          <button className="flex  gap-2 px-4 py-3 border-gray-300 border rounded-full">
            <Heart />
            Copy Link
          </button>
        </div>
        <div className="flex flex-col my-10 p-4 flex gap-8">
          <h2 className="font-bold text-3xl">
            Comments
            <span>({post.comments})</span>
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <textarea
              {...register("comment")}
              placeholder="Write your comment..."
              className="w-full min-h-32 p-4 border rounded-xl resize-none focus:outline-none focus:border-purple-500"
            />

            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white px-6 py-3 rounded-full self-start disabled:opacity-50"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
