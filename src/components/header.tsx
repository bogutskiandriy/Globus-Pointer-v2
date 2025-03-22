import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

export const Header = component$(() => {
  useStylesScoped$(`
    .mobile-menu {
      transition: max-height 0.3s ease-in-out;
      overflow: hidden;
    }
    .mobile-menu.closed {
      max-height: 0;
    }
    .mobile-menu.open {
      max-height: 500px; /* Adjust as needed */
    }
  `);

  const state = useStore({ isOpen: false });

  return (
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4"> 
        <nav class="flex items-center justify-between">
          <div class="flex items-center">
            <a href="/" class="text-xl font-bold">Globus Pointer</a>
          </div>
          <div class="hidden md:flex space-x-4">
            <a href="/" class="hover:text-gray-300">Home</a>
            <a href="/docs" class="hover:text-gray-300">Docs</a>
            <a href="/tutorial" class="hover:text-gray-300">Tutorial</a>
            <a href="/blog" class="hover:text-gray-300">Blog</a>
          </div>
          <div class="md:hidden">
            <button class="cursor-pointer mobile-menu-button" onClick$={() => state.isOpen = !state.isOpen}>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
        <div class={`mobile-menu ${state.isOpen ? 'open' : 'closed'} md:hidden flex flex-col space-y-4 mt-4`}>
          <a href="/" class="hover:text-gray-300">Home</a>
          <a href="/docs" class="hover:text-gray-300">Docs</a>
          <a href="/tutorial" class="hover:text-gray-300">Tutorial</a>
          <a href="/blog" class="hover:text-gray-300">Blog</a>
        </div>
      </div>
    </header>
  );
});