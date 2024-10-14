"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@assets/images/logo.svg";
import Close from "@assets/icons/closeIcon.svg";
import Hamburger from "@assets/icons/hamburger.svg";
import SearchIcon from "@assets/icons/searchIcon.svg";
import { useState } from "react";
import Divider from "./Divider";
import classNames from "classnames";
import usePathNameStore from "@store/usePathNameStore";

const sections = [
  { name: "Home", slug: "/" },
  { name: "Blog", slug: "/blog" },
  { name: "Solutions", slug: "/solutions" },
  { name: "Learn", slug: "/learn" },
  { name: "About us", slug: "/aboutUs" },
];

const NavBar = () => {
  const { pathName } = usePathNameStore((state) => state);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classNameLinks = classNames(
    "absolute left-0 top-20 bg-white w-full h-screen lg:h-1 lg:block lg:static lg:bg-transparent lg:col-span-2",
    {
      hidden: !isOpen,
    }
  );
  const classNameInputSearch = classNames(
    "absolute top-[360px] lg:top-0 z-50 left-0 px-8 w-full lg:relative lg:items-center lg:flex lg:px-3",
    {
      hidden: !isOpen,
    }
  );
  const classNameCloseIcon = classNames( "w-[30px] h-[30px]" , {
    hidden: !isOpen,
  });
  const classNameHambrugerIcon = classNames( "w-[30px] h-[30px]" , {
    hidden: isOpen,
  });

  return (
    <section className="bg-white w-full  h-20 px-6 fixed z-20">
      <nav className="grid grid-cols-4 w-full mb-16 pt-3 lg:mb-0">
        <div className="py-2 col-span-2 lg:col-span-1">
          <Link href="/" className="flex gap-2 items-center">
            <Logo className="w-[50px] h-[50px]" />
            <p className="logo_text">HASSLER T.C.</p>
          </Link>
        </div>
        <div className={classNameInputSearch}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="pl-10 h-9 w-full border rounded-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 "
          />
          <SearchIcon className="absolute w-[24px] h-[24px] top-2 left-11 text-gray-900 lg:top-6 lg:left-6" />
        </div>
        <div className="lg:hidden absolute top-7 right-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Close className={classNameCloseIcon} />
            <Hamburger className={classNameHambrugerIcon} />
          </button>
        </div>
        <div className={classNameLinks}>
          <ul className="flex flex-col pt-2 items-center lg:flex-row lg:justify-end lg:p-auto lg:mx-16">
            {sections.map((section) => (
              <>
                <li
                  key={section.slug}
                  className={classNames(
                    "h-10 flex items-center justify-center text-center w-full mt-2 px-8 lg:p-0 lg:rounded-full font-semibold cursor-pointer",
                    {
                      "bg-gray-300": pathName === section.slug,
                      "hover:bg-orange-200": pathName !== section.slug,
                    }
                  )}
                >
                  <Link href={`${section.slug}`}>{section.name}</Link>
                  <Divider />
                </li>
              </>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
