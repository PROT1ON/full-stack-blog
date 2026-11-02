
import { Request, Response } from "express";
import User from "../models/Users.ts";

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
export const savePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { savedPosts: postId },
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
      message: "Post saved successfully",
      savedPosts: user.savedPosts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
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
