
import express from "express";


import  {createComment, getcomments}  from "../controllers/comments.controller.ts";

const router = express.Router();

router.get("/:postId", getcomments)
router.post("/:postId", createComment)

export default router;
