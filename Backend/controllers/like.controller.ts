
import Liked from "../models/Liked";
import Post from "../models/Post";
import User from '../models/Users'
import { getAuth } from "@clerk/express";
export const likeposts = async(req,res) => {
    try {
        const {userId} = getAuth(req)

        if(!userId) {
             return res.status(401).json({
        success: false,
        message: "Not authenticated",
      }
    )
}
    const postId = req.params.postId;
    const { liked } = req.body;
        
        const user = await User.findOne({ clerkUserId: userId });
        console.log(user);
        
            if (!user) {
              res.status(404).json({
                message: "User not found in database",
              });
              return;
            }
        
            const post = await Post.findById( postId );
              console.log(post)
            if (!post) {
              res.status(404).json({
                message: "Post not found",
              });
              return;
            }
            const existingLiked = await Liked.findOne({
                user:user._Id,
                post:post._id
            })
            if (existingLiked) {
      await Liked.findByIdAndDelete(existingLiked._id);

      res.status(200).json({
        success: true,
        liked: false,
        message: "Post unliked",
      });
      return;
    }
            const newLiked = await Liked.create({
                  
                  user: user._id,
                  post: post._id,
                });
                console.log("Post SUCCESSFULLY Liked:", Liked);
                res.status(201).json({
                  success: true,
                  liked:true
                 
                });
    } catch (error) {
                console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
    }
}