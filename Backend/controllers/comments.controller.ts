
import { RequestHandler } from "express";
import Comments from "../models/Comments";
import Post from "../models/Post";
import User from "../models/Users";
import { getAuth } from "@clerk/express";


export const createComment: RequestHandler = async (req, res) => {
  try {
    // Get authenticated Clerk user
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Get post ID and comment from request
    const { postId } = req.params;
    const { comment } = req.body;

    // Validate comment
    if (
      typeof comment !== "string" ||
      comment.trim().length < 3
    ) {
      return res.status(400).json({
        success: false,
        message: "Comment must be at least 3 characters",
      });
    }

    // Find MongoDB user using Clerk ID
    const user = await User.findOne({
      clerkUserId: userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Create comment
    const newComment = await Comments.create({
      comment: comment.trim(),
      user: user._id,
      post: post._id,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment: newComment,
    });

  } catch (error) {
    console.error("Create comment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create comment",
    });
  }
};


export const getcomments: RequestHandler = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log('PostIdp',postId)
    const comments = await Comments.find({
      post: postId,
    })
      .populate("user", "userName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};
