import { Schema } from "mongoose";
import mongoose from "mongoose";
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
     excerpt: {
        type: String,
        required: true,
        unique: true
    },
     desc: {
        type: String,
        required: true,
        unique: true
    },
    isFeatured: {
        type: Boolean,
        default: []
    },
    user: {
        type:Schema.Types.ObjectId, ref: 'User',  required: true
    }
}, {timestamps: true})

const Post =
  mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;