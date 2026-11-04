import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Engineering } from "@/components/sections/Engineering";
import { Lab } from "@/components/sections/Lab";
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
        <Lab />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
