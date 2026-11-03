
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
router.post('/upload-auth',uploadAuth)
router.post("/", createPost);
router.get("/", getPosts);
router.get("/:slug", getPost);
router.put("/:slug", updatePost);
router.delete("/:slug", deletePost);

export default router;
