import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa"; // User icon for logged-in state
import { CreateAccountModal } from "./CreateAccountModal";
import UserServicesInstance from "../services/user.service";

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
  const AuthSection = () => {
    switch (authState) {
      case "loading":
        return (
          <div className="h-9 w-24 animate-pulse rounded-md bg-gray-700"></div>
        );

      case "authenticated":
        return (
          <FaUserCircle className="h-9 w-9 cursor-pointer text-white transition-opacity hover:opacity-80" />
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
