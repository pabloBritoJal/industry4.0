import Image from "next/image";
import Link from "next/link";

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
  url: string;
};

const ArticleCard = ({
  title,
  excerpt,
  author,
  date,
  imageUrl,
  url,
}: ArticleCardProps) => {
  let lastDateIndex = date.indexOf(" ");
  let dateString = date.slice(0, lastDateIndex);
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-200 min-w-[224px] h-full px-2 py-6 flex flex-col justify-between rounded-lg hover:cursor-pointer"
    >
      <div className="flex flex-col">
        <div>
          <h3 className="mt-2 px-3 text-sm text-justify font-bold text-gray-600">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="w-full text-xs text-justify px-3 my-3 text-gray-400 overflow-hidden text-ellipsis break-words max-h-[6rem] leading-[1.5rem]">
          {excerpt}
        </p>
        <div className="flex flex-row gap-x-2 items-center">
          <div className="flex items-center">
            <Image
              src={author.image}
              alt={author.name}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <p className="text-right text-xs px-3">{author.name}</p>
        </div>
        <p className="text-right text-xs text-gray-600 px-3 mt-2">{dateString}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
