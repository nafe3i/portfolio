import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Layout } from "@/components/sections/Layout";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

function App() {
  return (
    <Layout>
      <Hero photoSrc="/mohamed-amine-portrait-editorial.jpg" />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
