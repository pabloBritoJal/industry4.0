// components/SolutionsCard.tsx
import { ISolutions } from "../../../types/solutionsType";
import Image from "next/image";
import { captions } from "@locales/en/captions";

interface SolutionsCardProps {
  useCase: ISolutions;
}

const SolutionsCard: React.FC<SolutionsCardProps> = ({ useCase }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-md">
      <div className="bg-white rounded-md overflow-hidden shadow-md">
        <Image
          src={useCase.image}
          alt={useCase.title}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-bold text-gray-500 uppercase mb-2">
          {useCase.category}
        </span>
        <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
        <p className="text-gray-700 text-base mb-4">{useCase.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{useCase.date}</span>
          <a
            href={useCase.url}
            className="text-blue-500 hover:text-blue-600 font-bold"
            aria-label={`Read more about ${useCase.title}`}
          >
            {captions.solutionsPage.readMore}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SolutionsCard;
