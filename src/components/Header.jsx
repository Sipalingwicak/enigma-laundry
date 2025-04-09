import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <header className="relative z-40 bg-emerald-100 shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a className="flex text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <img
              src="../src/assets/laundry-logo.svg"
              alt="laundry-logo"
              className="w-8 h-8 mr-4 mt-1"
            />

            <span className="font-bold text-sm text-left leading-tight text-emerald-800">
              Enigma <br />
              Laundry
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Global"
            className="hidden md:flex flex-1 justify-start"
          >
            <ul className="flex items-center gap-6 text-sm ml-5">
              {["About", "Services", "Testimony"].map((item) => (
                <li key={item}>
                  <a
                    className="text-emerald-950 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Login/Register + Toggle Button */}
          <div className="flex items-center gap-4">
            {/* Login & Register */}
            <div className="flex gap-4">
              <Link to={"/login"}>
                <button className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
                  Login
                </button>
              </Link>

              <Link to={"/register"}>
                <button
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75"
                  href="/register"
                >
                  Register
                </button>
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75"
              onClick={() => setToggle(!toggle)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {toggle ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`absolute left-0 top-16 w-full bg-emerald-100 border-t border-gray-200 md:hidden transition-all duration-300 z-50 shadow-lg ${
            toggle
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-4 text-sm">
            {["About", "Services", "Testimony"].map((item) => (
              <li key={item}>
                <a
                  className="text-gray-700 transition hover:text-gray-500"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
