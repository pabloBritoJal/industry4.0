"use client";

import usePathNameStore from "@store/usePathNameStore";
import { useEffect, useState } from "react";
import BlogResultDisplay from "./components/BlogResultDisplay";
import BlogSectionHeader from "./components/BlogSectionHeader";
import FilterSide from "./components/BlogFilterSide";
import { blogData } from "@data/blogData";

const BlogPage = () => {
  const { setPathName } = usePathNameStore((state) => state);

  // Extraer las opciones únicas de industries, applications y technologies desde blogData
  const industries = Array.from(
    new Set(blogData.flatMap((post) => post.industries))
  );
  const applications = Array.from(
    new Set(blogData.flatMap((post) => post.applications))
  );
  const technologies = Array.from(
    new Set(blogData.flatMap((post) => post.technologies))
  );

  useEffect(() => {
    setPathName("/blog");
  }, [setPathName]);

  const [selectedFilters, setSelectedFilters] = useState<{
    industries: string[];
    applications: string[];
    technologies: string[];
  }>({
    industries: [],
    applications: [],
    technologies: [],
  });

  return (
    <>
      <section>
        <BlogSectionHeader />
      </section>
      <section className="lg:w-screen px-0 md:px-10 flex flex-col md:flex-row justify-between">
        <aside className="md:w-[20%] shadow-lg p-4 hidden md:block bg-white rounded-3xl">
          <FilterSide
            industries={industries}
            applications={applications}
            technologies={technologies}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </aside>
        <section className="w-full md:w-[75%] bg-white rounded-3xl mt-4 md:mt-0">
          <BlogResultDisplay selectedFilters={selectedFilters} />
        </section>
      </section>
    </>
  );
};

export default BlogPage;
