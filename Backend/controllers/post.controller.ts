
import { Request, Response } from "express";
import Post from "../models/Post.ts";
import { getAuth } from "@clerk/express";
import User from "../models/Users.ts";
import ImageKit from "@imagekit/nodejs";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
   

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Find MongoDB user using Clerk ID
   const user = await User.findOne({
  clerkUserId: userId,
  
});
console.log(user);

console.log("Authenticated Clerk ID:", userId);
console.log("MongoDB user:", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //slug generation fnuctoin 
    let slug = req.body.title.toLowerCase().replace(/ /g,"-")

    let existingPost = await Post.findOne({slug: slug})

    let counter = 2

    while(existingPost) {
      slug = `${slug}-${counter}`
      existingPost = await Post.findOne({slug: slug})
      counter ++ 
    }
    // Save MongoDB ObjectId in Post
    const post = await Post.create({
      ...req.body,
      slug,
      user: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL POSTS
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE POST
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({slug:req.params.slug})

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  
});
//image loaa
export const uploadAuth = async(req:Request, res:Response ) => {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
}