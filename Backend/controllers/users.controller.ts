
import { Request, Response } from "express";
import User from "../models/Users.ts";
import { getAuth} from "@clerk/express"
import Post from "../models/Post.ts";
// CREATE USER
export const createUser = async (req: Request, res: Response) => {
try {
  const {
    userName,
    email,
    clerkUserId,
  } = req.body;

  const newUser = await User.create({
    userName,
    email,
    clerkUserId,
    savedPosts: [],
  });

  return res.status(201).json({
    success: true,
    user: newUser,
  });

} catch (error) {
  console.error(error);
}
}

// GET ALL USERS
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE USER
// GET SINGLE USER BY CLERK ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({
      clerkUserId: userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SAVE POST

export const getUsersavePost = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await User.findOne({ clerkUserId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      savedPosts: user.savedPosts,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const savePosts = async (req: Request, res: Response) => {
  try {
    // Get Clerk authenticated user
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Get post ID
    const { postId } = req.body;

    if (!postId || typeof postId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid PostId is required",
      });
    }

    // Find MongoDB user
    const user = await User.findOne({
      clerkUserId: userId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if post is already saved
    const existingSave = user.savedPosts.some(
      (id) => id === postId
    );

    if (existingSave) {
      // Unsave post
      user.savedPosts = user.savedPosts.filter(
        (id) => id !== postId
      );
    } else {
      // Save post
      user.savedPosts.push(postId);
    }

    // Save changes to MongoDB
    await user.save();

    return res.status(200).json({
      success: true,
      message: existingSave
        ? "Post removed from saved posts"
        : "Post saved successfully",
      savedPosts: user.savedPosts,
    });

  } catch (error) {
    console.error("Save post error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// REMOVE SAVED POST
export const removeSavedPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { savedPosts: postId },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saved post removed successfully",
      savedPosts: user.savedPosts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
