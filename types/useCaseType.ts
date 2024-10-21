import { StaticImageData } from "next/image";

export interface IUseCase {
    title: string;
    meta: {
      meta_title: string;
      meta_description: string;
      url_slug: string;
      keywords: string[];
    };
    content: {
      introduction: {
        text: string;
      };
      sections: {
        heading: string;
        content: string;
      }[];
      conclusion: {
        text: string;
      };
    };
    seo: {
      internal_links: {
        title: string;
        url: string;
      }[];
      external_links: {
        title: string;
        url: string;
      }[];
      images: {
        src: StaticImageData;
        alt_text: string;
      }[];
    };
  }
  