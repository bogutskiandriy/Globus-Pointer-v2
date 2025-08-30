import type { Request, Response, NextFunction } from "express";
import Post from "../models/post.ts"; // Ensure this path is correct


export const getPosts = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    if (!posts.length) {
      console.warn("⚠️ No posts found in the database.");
    }
    res.json(posts); // Return posts as JSON
  } catch (error) {
    console.error("❌ Error fetching posts from DB:", error);
    next(error);
  }
};
