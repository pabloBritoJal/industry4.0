"use client";

import Link from "next/link";
import Logo from "@assets/images/svg/logo.svg";
import Close from "@assets/icons/closeIcon.svg";
import Hamburger from "@assets/icons/hamburger.svg";
import SearchIcon from "@assets/icons/searchIcon.svg";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import usePathNameStore from "@store/usePathNameStore";
import { useRouter } from "next/navigation";
import { captions } from "@locales/en/captions";
import { blogData } from "@data/blogData";
import { solutionsData } from "@data/solutionsData";

const sections = [
  { name: captions.navbar.sections.home, slug: "/" },
  { name: captions.navbar.sections.blog, slug: "/blog" },
  { name: captions.navbar.sections.solutions, slug: "/solutions" },
  { name: captions.navbar.sections.aboutUs, slug: "/aboutUs" },
];

type ContentType = "Blog" | "UseCase" | "";

interface IResults {
  title: string;
  url: string;
  type: ContentType;
}

const NavBar = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<IResults[]>([]);
  const router = useRouter();
  const searchTermRef = useRef<HTMLDivElement>(null);

  const classNameLinks = classNames(
    "absolute left-0 top-20 bg-white w-full h-screen lg:h-1 lg:block lg:static lg:bg-transparent lg:col-span-2",
    { hidden: !isOpen }
  );
  const classNameInputSearch = classNames(
    "absolute top-[360px] lg:top-0 z-50 left-0 px-8 w-full lg:relative lg:items-center lg:flex lg:px-3",
    { hidden: !isOpen }
  );
  const classNameCloseIcon = classNames("w-[30px] h-[30px]", {
    hidden: !isOpen,
  });
  const classNameHamburgerIcon = classNames("w-[30px] h-[30px]", {
    hidden: isOpen,
  });

  useEffect(() => {
    if (searchTerm.length < 3) {
      setResults([]);
      return;
    }
    const blogResults: IResults[] = blogData
      .filter((article) =>
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((article) => ({
        title: article.title,
        url: article.url,
        type: "Blog",
      }));

    const solutionsResults: IResults[] = solutionsData
      .filter((solution) =>
        solution.meta.meta_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((solution) => ({
        title: solution.title,
        url: `/solutions/${solution.meta.url_slug}`,
        type: "UseCase",
      }));

    const combinedResults: IResults[] = [
      ...blogResults,
      ...solutionsResults,
    ].slice(0, 5);

    setResults(
      combinedResults.length > 0
        ? combinedResults
        : [{ title: "Data not found", url: "", type: "" }]
    );
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResultClick = (url: string) => {
    if (url) {
      setSearchTerm("");
      setIsOpen(false);
      router.push(url);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (searchTermRef.current) {
      const targetNode = event.target as Node | null;
      if (targetNode && !searchTermRef.current.contains(targetNode)) {
        setSearchTerm("");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <section className="bg-white w-full h-20 px-6 fixed z-20">
      <nav className="grid grid-cols-4 w-full mb-16 pt-3 lg:mb-0">
        <div className="py-2 col-span-2 lg:col-span-1">
          <button
            onClick={() => router.push("/")}
            className="flex gap-4 items-center"
            aria-label="Go to homepage"
          >
            <Logo className="w-[50px] h-[50px]" />
            <div className="flex flex-col justify-start">
              <p className="hidden md:block font-satoshi font-semibold text-2xl text-black text-left">
                {captions.navbar.logoName}
              </p>
              <p className="text-xs text-gray-400 font-semibold text-left">
                {captions.navbar.logoSubtitle}
              </p>
            </div>
          </button>
        </div>
        <div className={classNameInputSearch} ref={searchTermRef}>
          <form onSubmit={handleSearch} className="w-full md:static relative">
            <input
              type="text"
              name="search"
              id="search"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={captions.navbar.searchPlaceholder}
              className="pl-10 h-9 w-full border rounded-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2"
            />
            <SearchIcon className="absolute w-[22px] h-[22px] text-gray-900 top-2 left-2 md:top-6 md:left-6" />
            {searchTerm.length >= 3 && (
              <ul className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-50">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      result.url === "" ? "text-gray-400 cursor-default" : ""
                    }`}
                  >
                    {result.type === "Blog" ? (
                      <Link
                        onClick={() => {
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.title}
                      </Link>
                    ) : (
                      <button onClick={() => handleResultClick(result.url)}>
                        {result.title}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
        <div className="lg:hidden absolute top-7 right-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <Close className={classNameCloseIcon} />
            <Hamburger className={classNameHamburgerIcon} />
          </button>
        </div>
        <div className={classNameLinks}>
          <ul className="flex flex-col pt-2 items-center lg:flex-row lg:justify-end lg:p-auto lg:mx-16">
            {sections.map((section) => (
              <li
                onClick={() => {
                  setIsOpen(false);
                  setPathName(section.slug);
                  router.push(section.slug);
                }}
                key={section.slug}
                className={classNames(
                  "h-10 flex items-center justify-center text-center w-full mt-2 px-8 lg:p-0 lg:rounded-full font-semibold cursor-pointer",
                  {
                    "bg-gray-200": pathName === section.slug,
                    "hover:bg-orange-200": pathName !== section.slug,
                  }
                )}
              >
                <p aria-label={`Go to ${section.name}`}>{section.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
