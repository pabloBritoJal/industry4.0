import ContentDetailPage from "../../../components/global/ContentDetailPage";
import { notFound } from "next/navigation";

interface BlogPostType {
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string; // opcional, ya que algunas entradas podrían no tener imagen
}

const solutionData: Record<string, BlogPostType> = {
  "my-first-blog-post": {
    title: "How Industry 4.0 is Transforming the World",
    author: "John Doe",
    date: "January 1, 2023",
    content: "This is the content of the blog post..",
    imageUrl: "/path/to/image.jpg",
  },
  // Agrega más blogs si es necesario
};

// Definimos la interfaz para el parámetro `params`
interface BlogPostParams {
  params: {
    slug: string;
  };
}
const SolutionDetail = ({ params }: { params: { slug: string } }) => {
  const solution = solutionData[params.slug];

  if (!solution) {
    return notFound();
  }

  return (
    <ContentDetailPage
      title={solution.title}
      author={solution.author}
      date={solution.date}
      content={solution.content}
      imageUrl={solution.imageUrl}
    />
  );
};

export default SolutionDetail;
