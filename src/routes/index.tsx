import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { MenuSection } from "@/components/site/Menu";
import { Promo } from "@/components/site/Promo";
import { Hours } from "@/components/site/Hours";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sabor de Minas — O verdadeiro sabor da comida mineira" },
      {
        name: "description",
        content:
          "Restaurante Sabor de Minas: galinhada, feijão tropeiro, strogonoff e muito mais. Comida mineira artesanal com entrega rápida.",
      },
      { property: "og:title", content: "Sabor de Minas" },
      {
        property: "og:description",
        content: "O verdadeiro sabor da comida mineira.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Promo />
      <Hours />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
      <BackToTop />
      <Toaster position="bottom-right" theme="dark" richColors />
    </main>
  );
}