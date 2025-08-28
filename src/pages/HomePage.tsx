import { FeatureSection } from '../components/FeatureSection';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { NavBar } from '../components/NavBar';
import { StatsSection } from '../components/StatsSection';

export const HomePage = ({
  isModalOpen,
  handleLoginClick,
}: {
  isModalOpen: boolean;
  handleLoginClick: () => void | undefined;
}) => {
  return (
    <div
      className=" bg-gradient-to-br
     from-background via-card to-background"
    >
      <NavBar
        isModalOpen={isModalOpen}
        handleLoginClick={handleLoginClick}
        menu={undefined}
        menuHandler={() => {
          return;
        }}
      />
      <HeroSection handleLoginClick={handleLoginClick} />
      <FeatureSection />
      <StatsSection />
      <Footer />
    </div>
  );
};
