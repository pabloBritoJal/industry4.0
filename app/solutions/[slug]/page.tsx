import { solutionsData } from "@data/solutionsData";
import ContentDetailPage from "../../../components/global/ContentDetailPage";
import { notFound } from "next/navigation";

const SolutionDetail = ({ params }: { params: { slug: string } }) => {
  const useCase = solutionsData.filter((useCase) => {
    return useCase.meta.url_slug === params.slug;
  })[0];

  if (!useCase) {
    return notFound();
  }

  return <ContentDetailPage useCase={useCase} />;
};

export default SolutionDetail;
