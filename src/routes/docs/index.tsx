// about.tsx
import { component$ } from '@builder.io/qwik';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { NeedHelp } from '~/components/needHelp';

export default component$(() => {
  return (
    <div class="docs-containe text-white min-h-screen">
      <Header />
      <main class="container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold mb-6 text-center">Documentation</h1>
        <section class="text-center mb-12">
          <h2 class="text-2xl font-semibold mb-4">Welcome to the Globus Pointer v2 Documentation</h2>
          <p class="text-lg text-gray-300">
            This project is designed to help developers integrate and use the Globus Pointer v2 system effectively.
          </p>
        </section>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-2">Getting Started</h3>
            <p class="text-gray-400 mb-4">
              Learn how to set up and run the Globus Pointer v2 system on your local machine.
            </p>
            <ul class="list-disc list-inside text-gray-400">
              <li>Clone the repository.</li>
              <li>Install dependencies with <code>npm install</code> or <code>yarn install</code>.</li>
              <li>Run the development server with <code>npm start</code> or <code>yarn start</code>.</li>
              <li>Access the app at <code>http://localhost:3000</code>.</li>
            </ul>
          </div>
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-2">How It Works</h3>
            <p class="text-gray-400">
              The application is built using Qwik, a modern framework for building fast and interactive web applications.
            </p>
            <p class="text-gray-400 mt-2">
              It includes reusable components like headers and footers and follows a modular structure for scalability.
            </p>
          </div>
          <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-2">Explore More</h3>
            <p class="text-gray-400">
              Dive deeper into the source code and component documentation to understand the system better.
            </p>
          </div>
        </section>
        <NeedHelp />
      </main>
      <Footer />
    </div>
  );
});