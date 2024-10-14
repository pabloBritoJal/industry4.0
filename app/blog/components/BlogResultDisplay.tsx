import { data } from "@data/mockData.js";
import BlogArticleCard from "./BlogArticleCard";
import Link from "next/link";
import FiltersIcon from "@assets/icons/filters.svg";
import DropdownSelect from "@components/global/DropdownSelect";
import { useState } from "react";

const sortOptions = ["Recommended", "Most popular", "Most recent"];

const BlogResultDisplay = () => {
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  return (
    <>
      <div className="flex items-center justify-between h-14 px-7 pt-10">
        <div>
          <button className="border-2 p-2 rounded-full border-green-pallet-light text-green-pallet-light hover:text-white hover:bg-primary-orange hover:opacity-80">
            <FiltersIcon className="w-[12px] h-[12px]" />
          </button>
          <span className="pl-2 text-black text-sm font-semibold">255 results</span>
        </div>
        <DropdownSelect
          options={sortOptions}
          value={sortBy}
          setValue={setSortBy}
        />
      </div>
      <div className="flex flex-col gap-4 px-7 pt-5">
        {data.map((article) => (
          <Link href={"/"} key={article.id} className="rounded-2xl hover:shadow-xl">
            <BlogArticleCard
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.date}
              imageUrl={article.imageUrl}
              key={article.id}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogResultDisplay;
