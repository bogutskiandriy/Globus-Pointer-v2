import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface BlogPost {
  title: string;
  date: string;
  description: string;
}

export const BlogPostList = component$(() => {
  const posts = useSignal<BlogPost[]>([]);

  useTask$(async () => {
    try {
      // Тимчасово використовуємо заглушку
      const fakeData: BlogPost[] = [
        { title: "1", date: "2025-21-03", description: "This is a mock blog post" },
      ];
      posts.value = fakeData;

      // Якщо є реальний бекенд, заміни на fetch("/api/blog-post")
      // const response = await fetch("/api/blog-post");
      // posts.value = await response.json();
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  });

  return (
    <div class="p-6 bg-gray-900 text-white min-h-screen">
      <h2 class="text-center text-2xl font-bold mb-4">Blog Posts</h2>
      <ul class="space-y-4">
        {posts.value.map((post) => (
          <li key={post.title} class="p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold">{post.date}</h3>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});
