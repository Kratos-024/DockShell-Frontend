import { labs } from "../assets/contstant";
import { CtfHero } from "../components/CtfHero";
import { Footer } from "../components/Footer";
import { LabSection } from "../components/LabSection";
import { NavBar } from "../components/NavBar";

export const CtfsPage = () => {
  return (
    <section>
      <NavBar
        menu={false}
        menuHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <CtfHero />
      <LabSection labs={labs} header={"Labs"} />
      <Footer />
    </section>
  );
};
