import { component$ } from '@builder.io/qwik';

export const NeedHelp = component$(() => {
  return (
    <section class="mt-12 text-center mb-6">
      <h3 class="text-2xl font-semibold mb-4">Need Help?</h3>
      <p class="text-gray-300">
        Visit our <a href="/community" class="text-blue-400 underline">Community</a> or <a href="/faq" class="text-blue-400 underline">FAQ</a> for support.
      </p>
    </section>
  );
});