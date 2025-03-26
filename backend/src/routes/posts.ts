import { Router } from "express";
import { getPosts } from "../controllers/postsControllers.ts";

const router = Router();

// GET route for fetching posts
router.get("/", async (req, res, next) => {
  try {
    await getPosts(req, res);
  } catch (error) {
    console.error("Error in posts route:", error);
    next(error); // Pass errors to the error-handling middleware
  }
});

export default router;
