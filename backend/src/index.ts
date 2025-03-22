import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blog.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env['PORT_BACKEND'] || 8000;
const BACKEND = process.env['BACKEND_URL'];

app.use(cors());
app.use(express.json());

app.use("./content", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server start on ${BACKEND}:${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Сервер працює!");
});

// test data for blog posts

const posts = [
  { title: "Post 1", date: "2023-08-01", description: "Content of post 1" },
  { title: "Post 2", date: "2023-08-02", description: "Content of post 2" },
  { title: "Post 3", date: "2023-08-03", description: "Content of post 3" },
  { title: "Post 4", date: "2023-08-04", description: "Content of post 4" },
  { title: "Post 5", date: "2023-08-05", description: "Content of post 5" }
];

app.get("/posts", (_, res) => {
  res.json(posts.map(post => ({ title: post.title, date: post.date, description: post.description })));
});
