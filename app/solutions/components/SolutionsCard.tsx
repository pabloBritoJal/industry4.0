import Image from "next/image";
import Link from "next/link";
import { captions } from "@locales/en/captions";
import { IUseCase } from "../../../types/useCaseType";

interface SolutionsCardProps {
  useCase: IUseCase;
}

const SolutionsCard: React.FC<SolutionsCardProps> = ({ useCase }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md">
      <div className="bg-white rounded-md overflow-hidden shadow-md">
        <Image
          src={useCase.seo.images[0].src}
          alt={useCase.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4 h-[16rem]">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase mb-2">
            {useCase.meta.keywords[0]}
          </span>
          <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
          <p className="text-gray-700 text-base mb-4">
            {useCase.meta.meta_description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Link
            key={useCase.meta.url_slug}
            href={`/solutions/${useCase.meta.url_slug}`}
            className="text-blue-500 hover:text-blue-600 font-bold"
            aria-label={`Read more about ${useCase.title}`}
          >
            {captions.solutionsPage.readMore}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionsCard;
