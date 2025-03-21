import type { RequestHandler } from "@builder.io/qwik-city";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const onGet: RequestHandler = async ({ params, json }) => {
  const filePath = path.resolve("src/content/blog", `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    json(404, { error: "Post not found" });
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: postContent } = matter(content);

  json(200, {
    title: data.title || "Untitled",
    content: postContent || "No content available",
  });
};
