import Image from "next/image";

type Author = {
  name: string;
  image: string;
};

type BlogArticleCardProps = {
  title: string;
  excerpt: string;
  author: Author;
  date: string;
  imageUrl: string;
};

const BlogArticleCard = ({
  title,
  excerpt,
  author,
  date,
  imageUrl,
}: BlogArticleCardProps) => {
  return (
    <div className="w-full h-72 lg:h-40 px-3 border-2 lg:px-6 py-3 grid grid-flow-row grid-rows-6 lg:grid-rows-5 rounded-2xl">
      <div className="flex flex-col row-span-1">
        <div>
          <h3 className="text-lg font-bold text-green-pallet">Category</h3>
        </div>
      </div>
      <div className="flex flex-col row-span-2 lg:row-span-1">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </div>
      <div className="flex flex-col row-span-2">
        <div>
          <h3 className="text-sm font-light">{excerpt}</h3>
        </div>
      </div>
      <div className="flex flex-row gap-3 justify-items-start row-span-1">
        <div className="flex gap-2 text-center">
          <div className="flex items-center">
            <Image
              src={author.image}
              alt={author.name}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <p className="flex text-sm font-medium items-center">{author.name}</p>
        </div>
        <div className="h-3/4 w-0.5 my-auto bg-gray-400"></div>
        <div className="flex text-sm font-normal items-center">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleCard;
