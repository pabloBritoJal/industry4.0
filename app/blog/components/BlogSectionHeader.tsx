import { captions } from "@locales/en/captions";

const BlogSectionHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-56 md:h-48">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900">
            <span className="block xl:inline">
              {captions.blogSectionHeader.titlePart1}
            </span>{" "}
            <span className="block text-indigo-600 xl:inline">
              {captions.blogSectionHeader.titlePart2}
            </span>
          </h1>
          <h1 className="w-full md:w-2/3 mx-auto mt-3 text-gray-500 sm:mt-5 text-lg">
            {captions.blogSectionHeader.description}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BlogSectionHeader;
