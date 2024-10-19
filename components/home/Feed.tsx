import Image from "next/image";
import Link from "next/link";
import { captions } from "@locales/en/captions";
import { mockSolutions } from "@data/mockSolutionsMain";

const Feed = () => {
  return (
    <section className="w-full py-10 px-2 md:px-5">
      <div className="mx-auto">
        <h2 className="pl-5 text-3xl font-bold mb-4">
          {captions.solutionsTitle}
        </h2>
        <div className="px-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockSolutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
            >
              <div className="w-60 h-60 flex items-center rounded-xl my-5">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  width={300}
                  height={300}
                  className="object-cover rounded-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-700">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            className="bg-orange-600 hover:bg-orange-400 text-white px-4 py-2 rounded-full"
            href="/solutions"
          >
            {captions.seeMore}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Feed;
