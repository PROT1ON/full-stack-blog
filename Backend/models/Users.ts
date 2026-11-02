import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    clerkUserId: {
      type:String,
      required:true,
      unique:true
    },
    userName: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;