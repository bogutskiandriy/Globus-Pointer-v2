import type { RequestHandler } from "@builder.io/qwik-city";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const onGet: RequestHandler = async ({ json }) => {
  const blogDir = path.resolve("src/content/blog");

  if (!fs.existsSync(blogDir)) {
    json(404, { error: "Blog directory not found" });
    return;
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"));

  if (files.length === 0) {
    json(404, { error: "No blog posts found" });
    return;
  }

  const posts = files.map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data } = matter(content);
    return {
      title: data.title || "Untitled",
      date: data.date || "Unknown date",
      description: data.description || "No description",
      slug: file.replace(".md", ""),
    };
  });

  json(200, posts);
};
