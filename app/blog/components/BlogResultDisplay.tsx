import { blogData, Article } from "@data/blogData";
import BlogArticleCard from "./BlogArticleCard";
import Link from "next/link";
import DropdownSelect from "@components/global/DropdownSelect";
import { useState, useMemo } from "react";

const sortOptions = ["Recommended", "Most popular", "Most recent"];

interface BlogResultDisplayProps {
  selectedFilters: {
    industries: string[];
    applications: string[];
    technologies: string[];
  };
}

const BlogResultDisplay: React.FC<BlogResultDisplayProps> = ({
  selectedFilters,
}) => {
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const filteredData = useMemo(() => {
    return blogData.filter((article: Article) => {
      const industryMatch =
        selectedFilters.industries.length === 0 ||
        article.industries.some((industry) =>
          selectedFilters.industries.includes(industry)
        );
      const applicationMatch =
        selectedFilters.applications.length === 0 ||
        article.applications.some((application) =>
          selectedFilters.applications.includes(application)
        );
      const technologyMatch =
        selectedFilters.technologies.length === 0 ||
        article.technologies.some((technology) =>
          selectedFilters.technologies.includes(technology)
        );
      return industryMatch && applicationMatch && technologyMatch;
    });
  }, [selectedFilters]);

  return (
    <>
      <div className="flex items-center justify-between h-14 px-7 pt-10">
        <DropdownSelect
          options={sortOptions}
          value={sortBy}
          setValue={setSortBy}
        />
      </div>
      <div className="flex flex-col gap-4 px-7 pt-5">
        {filteredData.map((article) => (
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            key={article.id}
            className="rounded-2xl hover:shadow-xl"
          >
            <BlogArticleCard
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.date}
              imageUrl={article.urlPicture}
              key={article.id}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogResultDisplay;
