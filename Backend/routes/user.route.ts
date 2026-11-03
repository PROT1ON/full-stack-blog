import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePosts,
  getUsersavePost,
} from "../controllers/users.controller.ts";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.patch("/save", savePosts)
router.get('/savedPosts', getUsersavePost)
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;