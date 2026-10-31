
import express from "express";
import { ClerkwebHooks } from "../controllers/webHooks.controller.ts";

const router = express.Router();

router.post("/", ClerkwebHooks);

export default router;
