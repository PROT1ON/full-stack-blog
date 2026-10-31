import { Schema } from "mongoose";
import mongoose from "mongoose";
const CommentsSchema = new Schema({
     user: {
        type:Schema.Types.ObjectId, ref: 'User',  required: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    
}, {timestamps: true})

export default mongoose.model("User", CommentsSchema)