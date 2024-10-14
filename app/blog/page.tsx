"use client";

import usePathNameStore from "@store/usePathNameStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import BlogResultDisplay from "./components/BlogResultDisplay";
import BlogSectionHeader from "./components/BlogSectionHeader";

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
      <section className="lg:w-screen grid grid-flow-col grid-cols-8 bg-white">
        <section className="hidden lg:block lg:col-span-2">filterSide</section>
        <section className="col-span-8 w-full lg:col-span-6">
          <BlogResultDisplay />
        </section>
      </section>
    </>
  );
};

export default BlogPage;
