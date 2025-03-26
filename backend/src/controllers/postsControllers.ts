import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

interface Post {
  title: string;
  date: string;
  description: string;
}

const filePath = path.resolve("src", "data", "posts.json");

export const getPosts = (_: Request, res: Response): void => {
  try {
    const posts: Post[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(posts.map(({ title, date, description }) => ({ title, date, description })));
  } catch (error) {
    console.error("Error reading posts file:", error);
    res.status(500).json({ error: "Failed to load posts" });
  }
};
