import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa"; // Import new icons
import { CreateAccountModal } from "./CreateAccountModal";
import UserServicesInstance from "../services/user.service";
import { useNavigate } from "react-router-dom";

type AuthState = "loading" | "authenticated" | "unauthenticated";

export const NavBar = ({
  menuHandler,
  menu = true,
}: {
  menu: boolean;
  menuHandler: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for the user menu
  const [isLoading, setIsLoading] = useState(false); // For the sign-out button loading state
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setAuthState("unauthenticated");
        return;
      }
      const response = await UserServicesInstance.validateSession();
      if ("data" in response && response.data.user) {
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
      }
    };
    checkUserSession();
  }, []);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthState("authenticated");
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    localStorage.removeItem("accessToken");
    setAuthState("unauthenticated");
    setIsUserMenuOpen(false);
    setIsLoading(false);
  };

  const handleMyProfile = () => {
    navigate("/p/profile");
    console.log("Navigating to profile...");
    setIsUserMenuOpen(false);
  };

  const AuthSection = () => {
    switch (authState) {
      case "loading":
        return (
          <div className="h-9 w-24 animate-pulse rounded-md bg-gray-700"></div>
        );

      case "authenticated":
        return (
          <div className="relative">
            <FaUserCircle
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="h-9 w-9 cursor-pointer text-white transition-opacity hover:opacity-80"
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-800 p-2 shadow-lg ring-1 ring-white/10 z-50">
                <div className="space-y-2 sm:space-y-3 md:space-y-2">
                  {/* My Profile button */}
                  <button
                    onClick={handleMyProfile}
                    className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 md:px-4 lg:px-6 py-3 sm:py-4 md:py-3 lg:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-base sm:text-lg md:text-sm lg:text-base rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-h-[44px] sm:min-h-[48px] md:min-h-[44px]"
                  >
                    <FaUser className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" />
                    My Profile
                  </button>

                  {/* Sign Out button */}
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-3 px-4 sm:px-6 md:px-4 lg:px-6 py-3 sm:py-4 md:py-3 lg:py-4 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg sm:rounded-xl md:rounded-lg transition-all duration-200 min-h-[44px] sm:min-h-[48px] md:min-h-[44px] text-base sm:text-lg md:text-sm lg:text-base font-medium ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105 active:scale-95"
                    }`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4 border-b-2 border-gray-300" />
                    ) : (
                      <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4" />
                    )}
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "unauthenticated":
      default:
        return (
          <>
            <button
              onClick={handleLoginClick}
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2"
            >
              Login
            </button>
            <button
              onClick={handleLoginClick}
              data-slot="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2"
            >
              Start now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right size-4"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </>
        );
    }
  };

  return (
    <>
      <section className="bg-background inset-x-0 top-0 z-20">
        <div className="container">
          <nav
            aria-label="Main"
            data-orientation="horizontal"
            dir="ltr"
            data-slot="navigation-menu"
            data-viewport="true"
            className="group/navigation-menu relative gap-4 flex max-w-max flex-1 items-center justify-center min-w-full"
          >
            <button onClick={menuHandler} className="cursor-pointer">
              {!menu && (
                <div onClick={menuHandler}>
                  <CiMenuFries className="w-[24px] h-[24px] rotate-180 text-white" />
                </div>
              )}
            </button>
            <div className="flex w-full items-center justify-between gap-12 py-4">
              <h1 className="text-[28px]">
                <a href="/">DockShell</a>
              </h1>

              <div>
                <ul
                  data-orientation="horizontal"
                  data-slot="navigation-menu-list"
                  className="group flex-1 list-none items-center justify-center gap-1 hidden lg:flex"
                  dir="ltr"
                >
                  {/* ... Your other navigation list items ... */}
                </ul>
              </div>

              <div className="hidden items-center gap-2 lg:flex">
                <AuthSection />
              </div>

              <div className="flex items-center gap-4 lg:hidden">
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center size-9"
                  aria-label="Main Menu"
                >
                  <FaUserCircle className="size-5" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </section>

      <CreateAccountModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
