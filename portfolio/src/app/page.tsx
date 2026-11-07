import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Engineering } from "@/components/sections/Engineering";
import { Background } from "@/components/sections/Background";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <Engineering />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
