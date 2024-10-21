import React from "react";

interface FilterSideProps {
  industries: string[];
  applications: string[];
  technologies: string[];
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
  industries,
  applications,
  technologies,
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
        updatedFilters[filterType] = [
          ...updatedFilters[filterType],
          filterValue,
        ];
      }
      return updatedFilters;
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Industry Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Industry</h3>
        <ul className="list-none space-y-2">
          {industries.map((option, index) => (
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
        <h3 className="font-semibold">Applications</h3>
        <ul className="list-none space-y-2">
          {applications.map((option, index) => (
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
        <h3 className="font-semibold">Technologies</h3>
        <ul className="list-none space-y-2">
          {technologies.map((option, index) => (
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
