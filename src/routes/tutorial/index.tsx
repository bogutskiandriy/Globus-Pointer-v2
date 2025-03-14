import { component$ } from '@builder.io/qwik';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';

export default component$(() => {
  return (
    <div class="about-container">
        <Header />
      <h1>Tutorial</h1>
      <section class="container mx-auto px-4">
        
      </section>
        <Footer />
    </div>
  );
});