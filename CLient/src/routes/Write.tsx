
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useUser } from "@clerk/react";
import {  LoaderCircle } from "lucide-react";
import Image from "../Components/Image";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import TextEditor from "../Components/TextEditor";
import Upload from "../Components/Upload";
import { toast } from "react-toastify";

const FormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string().optional(),
  excerpt: z.string().min(10, "Description must be at least 10 characters"),
  desc: z.string().min(20, "Story must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
});

type FormValues = z.infer<typeof FormSchema>;

const Write = () => {
  const {getToken} = useAuth()
   const mutation = useMutation({
     mutationFn: async(newTodo) => {
      const token = await getToken()
      console.log(token)
      return axios.post(`${import.meta.env.VITE_API_URL}/blogs`, newTodo, {
        headers: {
          Authorization:`Bearer ${token}`
        }
      })
    },
     onSuccess: () => {
    toast.success("Blog published successfully!");
  },

  onError: (error) => {
    console.error("Failed to publish blog:", error);
    toast.error("Failed to publish blog.");
  },
  })
     
  const { isLoaded, isSignedIn } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      image: "",
      excerpt: "",
      desc: "",
      category: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data)
  };

if (!isLoaded) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderCircle className="animate-spin" size={32} />
    </div>
  );
}

if (!isSignedIn) {
  console.log("Sign in First");

  return (
    <div className="h-screen w-full relative">
      <Image
        src="/Blog%20/d66cb460-fd0f-4597-922e-9244584e058a.png"
        alt="Please sign in first"
        className="w-full h-full object-cover"
      />
      <Link to='/sign-in' className="px-6 py-4 w-60 absolute bottom-32 right-48 z-40 border rounded-full border-gray-300">
        Sign in 
        </Link>
      
    </div>
  );
}

  return (
    <form
      className="flex flex-col gap-4 justify-center items-start w-full px-8 py-6 sm:px-16 md:px-32 lg:px-64"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-5xl font-bold">Write a story</h2>

      {/* Title */}
      <div className="w-full flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title..."
          className="px-6 py-4 rounded-2xl ring-1 ring-[#E0DBEA] bg-[#FCF9F3]"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Short description */}
      <div className="w-full flex flex-col gap-2">
        <input
          type="text"
          placeholder="Short excerpt..."
          className="px-6 py-4 rounded-2xl ring-1 ring-[#E0DBEA] bg-[#FCF9F3]"
          {...register("excerpt")}
        />
        {errors.excerpt && (
          <p className="text-red-500 text-sm">
            {errors.excerpt.message}
          </p>
        )}
      </div>

    

      {/* Category */}
      <div className="w-full flex flex-col gap-2">
        <select
          className="px-6 py-4 rounded-2xl ring-1 ring-[#E0DBEA] bg-[#FCF9F3]"
          {...register("category")}
        >
          <option value="">Select category</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="business">Business</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div className="w-full flex flex-col gap-2">
      <Upload />
      </div>
        
          {/* Story */}
      <div className="w-full flex flex-col gap-2">
        <textarea
          placeholder="Write your story..."
          rows={10}
          className="px-6 py-4 rounded-2xl ring-1 ring-[#E0DBEA] bg-[#FCF9F3] w-full"
          {...register("desc")}
        />
        {errors.desc && (
          <p className="text-red-500 text-sm">{errors.desc.message}</p>
        )}
      </div>
      <button
  type="submit"
  disabled={mutation.isPending}
  className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50"
>
  {mutation.isPending ? "Publishing..." : "Publish Story"}
</button>
    </form>
  );
};

export default Write;
