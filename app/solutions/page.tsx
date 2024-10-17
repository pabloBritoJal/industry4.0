// pages/solutions.tsx
"use client";

import usePathNameStore from "@store/usePathNameStore";
import { ISolutions } from "../../types/solutionsType";
import { solutionsData } from "../../data/solutionsData";
import { useEffect } from "react";

const SolutionsPage = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);

  useEffect(() => {
    setPathName("/solutions");
  }, []);

  return (
    <div className="container mx-auto py-8 px-5 md:px-10">
      <h1 className="text-3xl font-bold mb-4">
        Casos de Uso en la Industria 4.0
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutionsData.map((useCase: ISolutions) => (
          <div
            key={useCase.id}
            className="bg-white rounded-md overflow-hidden shadow-md"
          >
            <img
              src={useCase.image}
              alt={useCase.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <span className="text-xs font-bold text-gray-500 uppercase mb-2">
                {useCase.category}
              </span>
              <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
              <p className="text-gray-700 text-base mb-4">
                {useCase.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{useCase.date}</span>
                <a
                  href={useCase.url}
                  className="text-blue-500 hover:text-blue-600 font-bold"
                >
                  Leer más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;
