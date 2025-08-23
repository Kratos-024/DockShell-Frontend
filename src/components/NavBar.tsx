import { CiMenuFries } from "react-icons/ci";

export const NavBar = ({
  menuHandler,
  menu = true,
}: {
  menu: boolean;
  menuHandler: () => void;
}) => {
  return (
    <section className="bg-background inset-x-0 top-0 z-20">
      <div className="container">
        <nav
          aria-label="Main"
          data-orientation="horizontal"
          dir="ltr"
          data-slot="navigation-menu"
          data-viewport="true"
          className="group/navigation-menu relative gap-4  flex max-w-max flex-1 items-center justify-center min-w-full"
        >
          <button onClick={menuHandler} className="cursor-pointer">
            {!menu && (
              <div onClick={menuHandler}>
                <CiMenuFries className="w-[24px] h-[24px] rotate-180 text-white" />
              </div>
            )}
          </button>
          <div className="flex w-full items-center justify-between gap-12 py-4">
            <div>
              <h1 className="text-[28px]">DockShell</h1>
            </div>
            <div>
              <ul
                data-orientation="horizontal"
                data-slot="navigation-menu-list"
                className="group flex-1 list-none items-center justify-center gap-1 hidden lg:flex"
                dir="ltr"
              >
                <li data-slot="navigation-menu-item" className="relative">
                  <button
                    id="radix-«Rifetb»-trigger-radix-«R14bifetb»"
                    data-state="closed"
                    aria-expanded="false"
                    aria-controls="radix-«Rifetb»-content-radix-«R14bifetb»"
                    data-slot="navigation-menu-trigger"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 
                        py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent
                        focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent
                         data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50
                         focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px]
                         focus-visible:outline-1 group"
                    data-radix-collection-item=""
                  >
                    <span>Ctf</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-chevron-down relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </li>
                <li data-slot="navigation-menu-item" className="relative">
                  <button
                    id="radix-«Rifetb»-trigger-radix-«R1kbifetb»"
                    data-state="closed"
                    aria-expanded="false"
                    aria-controls="radix-«Rifetb»-content-radix-«R1kbifetb»"
                    data-slot="navigation-menu-trigger"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 group"
                    data-radix-collection-item=""
                  >
                    Developers{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-chevron-down relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </li>
                <li data-slot="navigation-menu-item" className="relative">
                  <button
                    id="radix-«Rifetb»-trigger-radix-«R24bifetb»"
                    data-state="closed"
                    aria-expanded="false"
                    aria-controls="radix-«Rifetb»-content-radix-«R24bifetb»"
                    data-slot="navigation-menu-trigger"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground 
                        disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 group"
                    data-radix-collection-item=""
                  >
                    Resources{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-chevron-down relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
              >
                Login
              </button>
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[&gt;svg]:px-3"
              >
                Start now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-right size-4"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <button
                data-slot="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9"
                aria-label="Main Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-menu size-4"
                  aria-hidden="true"
                >
                  <path d="M4 12h16"></path>
                  <path d="M4 18h16"></path>
                  <path d="M4 6h16"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute top-full left-0 isolate z-50 flex justify-center"></div>
        </nav>
      </div>
    </section>
  );
};
