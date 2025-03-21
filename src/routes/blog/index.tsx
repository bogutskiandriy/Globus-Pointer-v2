import { component$ } from "@builder.io/qwik";
import { BlogPostList } from "~/components/blogPostList";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

export default component$(() => {
  return (
    <>
      <Header />
      <BlogPostList />
      <Footer />
    </>
  );
});
