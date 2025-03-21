import { component$ } from '@builder.io/qwik';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { NeedHelp } from '~/components/needHelp';

export default component$(() => {
  return (
    <div class="about-container text-white min-h-screen">
        <Header />
      <main class="container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold mb-6 text-center">Tutorial</h1>
        <section class="text-center mb-12">
          <h2 class="text-2xl font-semibold mb-4">Welcome to the Tutorial</h2>
          <p class="text-lg text-gray-300">
            This section will guide you through using the Globus Pointer v2 platform effectively.
          </p>
        </section>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-2">Getting Started</h3>
            <p class="text-gray-400 mb-4">
              Learn how to navigate and use the platform efficiently.
            </p>
            <ul class="list-disc list-inside text-gray-400">
              <li>Explore the menu to access various sections.</li>
              <li>Use the search bar to find specific content quickly.</li>
              <li>Follow the tutorials for step-by-step guidance.</li>
            </ul>
          </div>
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-2">Features Overview</h3>
            <p class="text-gray-400">
              The platform includes interactive components and a user-friendly interface to enhance your experience.
            </p>
            <p class="text-gray-400 mt-2">
              It is designed to be intuitive and scalable for various use cases.
            </p>
          </div>
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-2">Additional Resources</h3>
            <p class="text-gray-400">
              Check out the documentation and FAQs for more detailed information and troubleshooting tips.
            </p>
          </div>
        </section>
        <NeedHelp />
      </main>
        <Footer />
    </div>
  );
});