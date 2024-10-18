import React, { useState } from "react";
import { captions } from "@locales/en/captions";

interface FilterSideProps {
  selectedFilters: {
    industries: string[];
    applications: string[];
    technologies: string[];
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      industries: string[];
      applications: string[];
      technologies: string[];
    }>
  >;
}

const FilterSide: React.FC<FilterSideProps> = ({
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleFilterChange = (
    filterType: "industries" | "applications" | "technologies",
    filterValue: string
  ) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(filterValue)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== filterValue
        );
      } else {
        updatedFilters[filterType].push(filterValue);
      }
      return updatedFilters;
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">{captions.filterSide.title}</h2>

      {/* Industry Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">{captions.filterSide.industry.title}</h3>
        <ul className="list-none space-y-2">
          {captions.filterSide.industry.options.map((option, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={option}
                className="mr-2"
                checked={selectedFilters.industries.includes(option)}
                onChange={() => handleFilterChange("industries", option)}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Application Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">
          {captions.filterSide.application.title}
        </h3>
        <ul className="list-none space-y-2">
          {captions.filterSide.application.options.map((option, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={option}
                className="mr-2"
                checked={selectedFilters.applications.includes(option)}
                onChange={() => handleFilterChange("applications", option)}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Technology Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">
          {captions.filterSide.technology.title}
        </h3>
        <ul className="list-none space-y-2">
          {captions.filterSide.technology.options.map((option, index) => (
            <li key={index}>
              <input
                type="checkbox"
                id={option}
                className="mr-2"
                checked={selectedFilters.technologies.includes(option)}
                onChange={() => handleFilterChange("technologies", option)}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSide;
