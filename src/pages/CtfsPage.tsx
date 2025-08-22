import { CtfHero } from "../components/CtfHero";
import { Footer } from "../components/Footer";
import { LabSection } from "../components/LabSection";
import { NavBar } from "../components/NavBar";

export const CtfsPage = () => {
  return (
    <section>
      <NavBar />
      <CtfHero />
      <LabSection />
      <Footer />
    </section>
  );
};
