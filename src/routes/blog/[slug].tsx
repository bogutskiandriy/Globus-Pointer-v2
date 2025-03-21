import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const post = useSignal<{ title: string; content: string } | null>(null);

  useTask$(async ({ track }) => {
    const slug = window.location.pathname.split("/").pop();
    track(() => slug);
    const response = await fetch(`/api/blog-posts/${slug}`);
    post.value = await response.json();
  });

  if (!post.value) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h1 class="text-3xl font-bold mb-4">{post.value.title}</h1>
      <div dangerouslySetInnerHTML={post.value.content}></div> {/* Fixed dangerouslySetInnerHTML */}
    </article>
  );
});
