
import express from "express";

import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  uploadAuth,
} from "../controllers/post.controller.ts";

const router = express.Router();
router.post('/upload-image',uploadAuth)
router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
