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
        
    },
     desc: {
        type: String,
        required: true,
        
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    category: {
        type:String,
        default: "general",
        
    },
    user: {
        type:Schema.Types.ObjectId, ref: 'User',  required: true
    },
    Liked: {
        type: [String],
        default:[]
    },
    comments: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User",
                    required: true
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
    }
}, {timestamps: true})

const Post =
  mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;