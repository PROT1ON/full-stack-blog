import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Image from "../Components/Image";
import { Heart, Link, MessageCircle } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CommentsForm from "../Components/CommentsForm"
import FetchComments from "../Components/FetchComments";
import LikeButton from "../Components/LikePost";
import CopyLinkButton from "../Components/CopyLink";
import BlogActions from "../Components/BlogActions";


const SinglePostPage = () => {
    
  const { slug } = useParams();
  const url = useSearchParams()
   const { isPending, error, data:post} = useQuery({
      queryKey: ['SingleBlog',slug],
      queryFn: async () => {
        const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        )
        if (!response) throw new Error('Failed to fetch repo data')
          return response.data.post
      },
    })
    if (isPending) return <p>Loading...</p>;
    
    if (error) return 'An error has occurred: ' + error.message

  console.log("Found post:", post);

  if (!post) {
    return <div>Post not found!</div>;
  }
 


 
  const Poster = post.user?.userName || "Anonymous";
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
            {Poster
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>

          
          <span>{post.createdAt}</span>
          <Heart className="text-red-400" />
          {post.Liked.length}

          <MessageCircle className="text-lime-400" />
          {post.comments}
        </div>
       <h2 className="font-bold">{post.desc}</h2>
        <div className="border-b border-t border-gray-300 my-2 sm:my-10 p-4 flex gap-8">
        <LikeButton postId={post._id} />
          <CopyLinkButton />
        </div>
        <div className="">
          <BlogActions postId={post._id} />
        </div>
        <div className="flex flex-col my-10 p-4 flex gap-8">
          <h2 className="font-bold text-3xl">
            Comments
            <span>({post.comments})</span>
          </h2>
          <CommentsForm  postId={post._id}/>
          <FetchComments postId={post._id} />
          
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
