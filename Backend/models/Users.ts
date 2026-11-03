
import mongoose, { Schema } from "mongoose";

interface IUser {
  clerkUserId: string;
  userName: string;
  email: string;
  user?: string;
  savedPosts: string[];
}

const UserSchema = new Schema<IUser>(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
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
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
