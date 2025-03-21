import { component$ } from '@builder.io/qwik';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';

export default component$(() => {
  return (
    <>
      <Header />
      <main class="max-w-4xl mx-auto p-6 text-white">
        <h1 class="text-4xl font-bold mb-4">About This Project</h1>
        <p class="text-lg mb-4 text-gray-400">
          Welcome to the community page of <strong>Globus Pointer v2</strong>. This project is designed to provide a seamless and interactive experience for users, leveraging modern web technologies.
        </p>
        <h2 class="text-2xl font-semibold mt-6 mb-2">Key Features</h2>
        <ul class="list-disc list-inside mb-4 text-gray-400">
          <li>Built with Qwik for optimal performance.</li>
          <li>Modular and reusable components.</li>
          <li>Styled using Tailwind CSS for a clean and modern look.</li>
        </ul>
        <h2 class="text-2xl font-semibold mt-6 mb-2">Community Goals</h2>
        <p class="text-lg mb-4 text-gray-400">
          Our goal is to foster a collaborative environment where developers can contribute, learn, and grow together. We encourage you to explore the codebase, provide feedback, and share your ideas.
        </p>
        <h2 class="text-2xl font-semibold mt-6 mb-2">Get Involved</h2>
        <p class="text-lg mb-4 text-gray-400">
          Join our community by contributing to the project on GitHub, participating in discussions, or sharing your expertise. Together, we can make this project even better!
        </p>
      </main>
      <Footer />
    </>
  );
});