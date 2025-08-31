import { useState, useEffect } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { FaUserCircle, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import new icons
import { CreateAccountModal } from './CreateAccountModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserServicesInstance from '../services/user.service';

type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

export const NavBar = ({
  menuHandler,
  menu = true,
  isModalOpen,
  handleLoginClick,
}: {
  menu?: boolean | undefined;
  isModalOpen: boolean;
  menuHandler?: () => void;
  handleLoginClick: () => void;
}) => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserSession = async () => {
      const response = await UserServicesInstance.validateSession();

      if (response.error) {
        console.error('Session validation failed:', response.error);
        setAuthState('unauthenticated');
        return;
      }

      if (response.data?.user) {
        setAuthState('authenticated');
      } else {
        console.warn('Session is valid but no user data was returned.');
        setAuthState('unauthenticated');
      }
    };

    checkUserSession();
  }, []);

  const closeModal = () => {
    handleLoginClick();
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthState('authenticated');
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await UserServicesInstance.logoutUser();
      toast.success('You have been logged out successfully.');
    } catch (error) {
      console.error('Server logout failed, proceeding with client-side cleanup.', error);
      toast.error('Server logout failed, but your session has been cleared locally.');
    } finally {
      localStorage.removeItem('accessToken');
      setAuthState('unauthenticated');
      setIsUserMenuOpen(false);
      setIsLoading(false);
      navigate('/');
    }
  };
  const handleMyProfile = () => {
    navigate('/p/profile');
    window.location.reload();
    setIsUserMenuOpen(false);
  };

  const AuthSection = () => {
    switch (authState) {
      case 'loading':
        return <div className="h-9 w-24 animate-pulse rounded-md bg-gray-700"></div>;

      case 'authenticated':
        return (
          <div className="relative">
            <FaUserCircle
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="h-[38px] w-[38px] cursor-pointer
               text-white transition-opacity hover:opacity-80"
            />
            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-[196px]
               rounded-xl  bg-[#232e31] p-2 shadow-lg ring-1
                ring-white/10 z-50"
              >
                <div className="space-y-2 sm:space-y-3 md:space-y-2">
                  <button
                    onClick={handleMyProfile}
                    className="w-full flex items-center 
                    justify-center gap-3 
                    py-3 
                     bg-[#bbff34] text-black 
                      font-bold text-base sm:text-lg
                       md:text-sm lg:text-base rounded-xl  cursor-pointer
                       transition-all duration-300 transform
                     "
                  >
                    <FaUser className="w-4 h-4 sm:w-5 sm:h-5  text-black md:w-4 md:h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className={`w-full flex items-center 
                      justify-center gap-3  
                    py-3
                      lg:py-4 text-gray-300 bg-gray-700
                       hover:bg-gray-600 rounded-lg  cursor-pointer
                   ${
                     isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                   }`}
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin rounded-full 
                      h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4 border-b-2 border-gray-300"
                      />
                    ) : (
                      <FaSignOutAlt
                        className="w-4 h-4 sm:w-5 
                      sm:h-5 md:w-4 md:h-4"
                      />
                    )}
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'unauthenticated':
      default:
        return (
          <>
            <button
              onClick={handleLoginClick}
              data-slot="button"
              className="inline-flex items-center border-[1px] justify-center 
              gap-2 whitespace-nowrap rounded-md text-sm 
              font-medium transition-all 
              hover:text-accent-foreground 
               h-9 px-4 py-2"
            >
              Login
            </button>
          </>
        );
    }
  };

  return (
    <>
      <section className="bg-black/20 inset-x-0 top-0 z-20">
        <nav
          aria-label="Main"
          data-orientation="horizontal"
          dir="ltr"
          data-slot="navigation-menu"
          data-viewport="true"
          className="group/navigation-menu px-9
           mx-auto relative gap-4 
          flex max-xl:px-7 min-w-min  flex-1 items-center 
          justify-center
          "
        >
          <button onClick={menuHandler} className="cursor-pointer">
            {!menu && (
              <div onClick={menuHandler}>
                <CiMenuFries className="w-[24px] h-[24px] rotate-180 text-white" />
              </div>
            )}
          </button>
          <div className="flex w-full items-center justify-between gap-12 py-4">
            <div className="flex gap-3 items-center">
              {' '}
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="https://secure.gravatar.com/avatar/0a36713aa63972a957a0eb366e8b0194.jpg?s=200&d=robohash&r=x"
                  alt="Logo"
                  className="h-10 w-10 rounded-full border border-gray-300 shadow-sm"
                />
              </a>
              <h1 className="text-[28px] ">
                <a className="text-xl font-bold text-amber-600" href="/">
                  <span className="text-[#9fef00]">Dock</span>
                  <span className="text-gray-600">Shell</span>
                </a>
              </h1>
            </div>

            <div>
              <ul
                data-orientation="horizontal"
                data-slot="navigation-menu-list"
                className="group flex-1 list-none items-center 
                justify-center gap-1 hidden lg:flex"
                dir="ltr"
              ></ul>
            </div>

            <div className=" items-center gap-2 flex">
              <AuthSection />
            </div>
          </div>
        </nav>
      </section>

      <CreateAccountModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
