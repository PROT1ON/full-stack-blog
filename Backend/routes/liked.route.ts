import express, { Router } from "express"
import { likeposts } from "../controllers/like.controller"

const router = Router()

router.post('/:postId', likeposts)

export default router