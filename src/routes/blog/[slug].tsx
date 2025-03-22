import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const post = useSignal<{ title: string; content: string } | null>(null);

  useTask$(async ({ track }) => {
    const slug = window.location.pathname.split("/").pop();
    track(() => slug);
    try {
      const response = await fetch(`http://localhost:8000/posts${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }
      post.value = await response.json();
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  });

  if (!post.value) {
    return <p>Loading...</p>;
  }

  return (
    <article class="p-6 bg-gray-900 text-white min-h-screen">
      <h1 class="text-3xl font-bold mb-4">{post.value.title}</h1>
      <div
        class="prose prose-invert"
        dangerouslySetInnerHTML={post.value.content} // Fixed
      ></div>
    </article>
  );
});
