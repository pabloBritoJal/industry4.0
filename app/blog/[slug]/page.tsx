import ContentDetailPage from "../../../components/global/ContentDetailPage";
import { notFound } from "next/navigation";

interface BlogPostType {
  title: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
}

const blogData: Record<string, BlogPostType> = {
  "my-first-blog-post": {
    title: "How Industry 4.0 is Transforming the World",
    author: "John Doe",
    date: "January 1, 2023",
    content: "This is the content of the blog post..",
    imageUrl: "https://imageio.forbes.com/blogs-images/bernardmarr/files/2018/09/AdobeStock_203804824-1200x480.png?format=png&width=1440",
  },
};

interface BlogPostParams {
  params: {
    slug: string;
  };
}

const BlogPost = ({ params }: BlogPostParams) => {
  const blog = blogData[params.slug];

  if (!blog) {
    return notFound();
  }

  return (
    <ContentDetailPage
      title={blog.title}
      author={blog.author}
      date={blog.date}
      content={blog.content}
      imageUrl={blog.imageUrl}
    />
  );
};

export default BlogPost;
