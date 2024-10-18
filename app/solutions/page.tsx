"use client";

import usePathNameStore from "@store/usePathNameStore";
import { ISolutions } from "../../types/solutionsType";
import { solutionsData } from "@data/solutionsData";
import { useEffect } from "react";
import { captions } from "@locales/en/captions";
import SolutionsCard from "./components/SolutionsCard";
import Link from "next/link";

const SolutionsPage = () => {
  const { setPathName } = usePathNameStore((state) => state);

  useEffect(() => {
    setPathName("/solutions");
  }, []);

  return (
    <div className="container mx-auto py-8 px-5 md:px-10">
      <h1 className="text-3xl font-bold mb-4">
        {captions.solutionsPage.pageTitle}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutionsData.map((useCase: ISolutions) => {
          return (
            <Link key={useCase.slug} href={`/solutions/${useCase.slug}`}>
              <SolutionsCard key={useCase.id} useCase={useCase} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SolutionsPage;
