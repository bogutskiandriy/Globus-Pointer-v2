import { component$ } from '@builder.io/qwik';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-900 text-white">
      <Header />
      <main class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-extrabold mb-8 text-center">Frequently Asked Questions</h1>
        <div class="space-y-6">
          <div class="border-b border-gray-800 pb-6">
            <h2 class="text-2xl font-semibold">What is this project about?</h2>
            <p class="text-gray-700 mt-4 leading-relaxed">
              This project is a modern web application designed to provide users with an intuitive and efficient experience.
            </p>
          </div>
          <div class="border-b border-gray-800 pb-6">
            <h2 class="text-2xl font-semibold">How can I contribute?</h2>
            <p class="text-gray-700 mt-4 leading-relaxed">
              You can contribute by submitting pull requests, reporting issues, or suggesting new features.
            </p>
          </div>
          <div class="border-b border-gray-800 pb-6">
            <h2 class="text-2xl font-semibold">Where can I find the documentation?</h2>
            <p class="text-gray-700 mt-4 leading-relaxed">
              The documentation is available in the project's repository under the "docs" folder.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
});