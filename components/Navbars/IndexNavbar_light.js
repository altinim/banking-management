import React from "react";
import Link from "next/link";

// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-costum-dark text-xl font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Futur
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-none lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none align-center mr-auto">
              <li className="flex items-center">
                {" "}
                <Link
                  href="/auth/individual_register"
                  className="text-costum-dark  text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                >
                  Individual
                </Link>{" "}
              </li>
              <li className="flex items-center">
                {" "}
                <Link
                  href="/auth/business_register"
                  className="text-costum-dark  text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                >
                  Business
                </Link>{" "}
              </li>{" "}
              <li>
                <IndexDropdown />
              </li>
              <li className="flex items-center"> </li>
              <li className="flex items-center"></li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                {" "}
                <Link
                  href="/auth/login"
                  className="text-costum-dark  hover:text-blueGray-00 text-xs font-heavy leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                >
                  Sign In
                </Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
