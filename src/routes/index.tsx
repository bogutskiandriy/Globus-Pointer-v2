import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Map } from "~/components/map/map";

export default component$(() => {
  return (
    <>
      <Header />
      <Map />
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Globus Pointer",
  meta: [
    {
      name: "description",
      content: "Fast Pointer to the World",
    },
  ],
};
