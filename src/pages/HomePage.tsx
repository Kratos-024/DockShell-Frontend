import { FeatureSection } from "../components/FeatureSection";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { NavBar } from "../components/NavBar";
import { StatsSection } from "../components/StatsSection";

export const HomePage = () => {
  return (
    <div
      className=" bg-gradient-to-br
     from-background via-card to-background"
    >
      <NavBar />
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <Footer />
    </div>
  );
};
