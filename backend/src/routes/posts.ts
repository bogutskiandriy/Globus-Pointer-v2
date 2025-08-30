import { Router } from "express";
import { getPosts } from "../controllers/postsController.ts"; // Правильний шлях до контролера

const router = Router();

// Отримання всіх постів
router.get("/", getPosts);

export default router;
