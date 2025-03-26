import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.ts"; // Ensure this matches the actual file path
import postsRoutes from "./routes/posts.ts"; // Ensure this matches the actual file path

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (_, res) => {
  res.send("Сервер працює!");
});

// API routes
app.use("/api/weather", weatherRoutes);
app.use("/api/posts", postsRoutes);

// Error-handling middleware
app.use((err: Error, _req: Request, res: Response) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
