"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ContentDetailPageProps {
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
}

const ContentDetailPage: React.FC<ContentDetailPageProps> = ({
  title,
  author,
  date,
  content,
  imageUrl,
}) => {
  const router = useRouter();

  return (
    <section className="container mx-auto py-8 px-5 md:px-10">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        Back
      </button>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="flex items-center mb-6 text-gray-600">
        <span>By {author}</span>
        <span className="ml-4">{date}</span>
      </div>
      {imageUrl && (
        <div className="w-full mb-6">
          <Image src={imageUrl} alt={title} width={800} height={450} />
        </div>
      )}
      <article className="prose max-w-none">{content}</article>
    </section>
  );
};

export default ContentDetailPage;
