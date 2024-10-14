import Image from "next/image";

type Author = {
  name: string;
  image: string;
};

type ArticleCardProps = {
  title: string;
  excerpt: string;
  author: Author;
  date: string;
  imageUrl: string;
};

const ArticleCard = ({
  title,
  excerpt,
  author,
  date,
  imageUrl,
}: ArticleCardProps) => {
  return (
    <div className="bg-gray-300 min-w-[224px] h-full px-2 py-2 flex flex-col justify-between rounded-lg">
      <div className="flex flex-col">
        <div>
          <h3 className="mt-2 px-3 text-sm text-justify font-bold">{title}</h3>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="w-full text-xs text-justify px-3">{excerpt}</p>
        <p className="w-full text-right text-xs px-3">{date}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
