"use client";
import { useRouter } from "next/navigation";
import { IUseCase } from "../../types/useCaseType";
import Image from "next/image";
import Link from "next/link";

interface ContentDetailPageProps {
  useCase: IUseCase;
}

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({ useCase }) => {
  const router = useRouter();

  return (
    <section className="container mx-auto py-8 px-5 md:px-10">
      {/* Back Button */}
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        Back
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{useCase.title}</h1>

      {/* Meta description */}
      <p className="italic mb-6 text-gray-600">
        {useCase.meta.meta_description}
      </p>

      {/* Images */}
      {useCase.seo.images.length > 0 && (
        <div className="flex flex-col md:flex-row mt-8">
          <div className="w-full md:w-[40%]">
            {useCase.seo.images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt_text}
                className="w-full md:w-[30rem] h-[20rem] mb-4"
              />
            ))}
          </div>
          <div className="w-full md:w-[60%] md:mx-10">
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p className="text-justify text-lg">{useCase.content.introduction.text}</p>
          </div>
        </div>
      )}

      {/* Main Sections */}
      {useCase.content.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
          <p className="text-justify">{section.content}</p>
        </div>
      ))}

      {/* Conclusion */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p className="text-justify">{useCase.content.conclusion.text}</p>
      </div>

      {/* Internal Links */}
      {useCase.seo.internal_links.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Related Links</h3>
          <ul className="list-disc ml-5">
            {useCase.seo.internal_links.map((link, index) => (
              <li key={index}>
                <Link key={link.url} href={`/solutions/${link.url}`}>
                {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* External Links */}
      {useCase.seo.external_links.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">External Resources</h3>
          <ul className="list-disc ml-5">
            {useCase.seo.external_links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ContentDetailPage;
