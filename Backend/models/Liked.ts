
import mongoose, { Schema } from "mongoose";

const LikedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate likes
LikedSchema.index(
  { user: 1, post: 1 },
  { unique: true }
);

export default mongoose.model("Liked", LikedSchema);
