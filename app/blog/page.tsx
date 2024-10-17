"use client";

import usePathNameStore from "@store/usePathNameStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import BlogResultDisplay from "./components/BlogResultDisplay";
import BlogSectionHeader from "./components/BlogSectionHeader";
import FilterSide from "./components/BlogFilterSide";

const BlogPage = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  useEffect(() => {
    setPathName("/blog");
  }, []);

  return (
    <>
      <section>
        <BlogSectionHeader />
      </section>
      <section className="lg:w-screen px-0 md:px-10 flex justify-between">
        <aside className="h-full w-[20%] shadow-lg p-4 hidden md:block bg-white rounded-3xl">
          <FilterSide />
        </aside>
        <section className="w-full md:w-[75%] bg-white rounded-3xl">
          <BlogResultDisplay />
        </section>
      </section>
    </>
  );
};

export default BlogPage;
