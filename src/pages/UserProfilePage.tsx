import { NavBar } from '../components/NavBar';
import { UserProfileHero } from '../components/UserProfile';

export const UserProfilePage = () => {
  return (
    <section>
      <div>
        <NavBar isModalOpen={false} handleLoginClick={function (): void {}} />
        <UserProfileHero />
      </div>
    </section>
  );
};
