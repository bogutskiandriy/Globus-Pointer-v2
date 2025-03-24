import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import dotenv from "dotenv";

dotenv.config();

const BACKEND = process.env["BACKEND_URL"];

interface BlogPost {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export const BlogPostList = component$(() => {
  const posts = useSignal<BlogPost[]>([]);

  useTask$(async () => {
    try {
      const response = await fetch(`${BACKEND}/api/posts`); // Use the BACKEND constant
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      posts.value = await response.json();
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  });

  return (
    <div class="p-6 bg-gray-900 text-white min-h-screen">
      <h2 class="text-center text-2xl font-bold mb-4">Blog Posts</h2>
      <ul class="space-y-4">
        {posts.value.map((post) => (
          <li key={post.slug} class="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold">{post.title}</h3>
            <p class="text-sm text-gray-400">{post.date}</p>
            <p>{post.description}</p>
            <a
              href={`/blog/${post.slug}`}
              class="text-blue-400 hover:underline mt-2 inline-block"
            >
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
