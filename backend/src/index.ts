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

const posts = [
  { title: "Post 1", content: "Content of post 1" },
  { title: "Post 2", content: "Content of post 2" }
];

app.get("/posts", (_, res) => {
  res.json(posts.map(post => ({ name: post.title, content: post.content })));
});
