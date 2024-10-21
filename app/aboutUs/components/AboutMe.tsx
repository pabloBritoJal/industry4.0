import { captions } from "@locales/en/captions";

const AboutMe = () => (
  <section className="mb-8 text-lg">
    <h2 className="text-2xl font-bold mb-4 text-gray-900">
      {captions.aboutUsPage.title}
    </h2>
    <article className="space-y-4 text-justify text-gray-700 leading-relaxed">
      <p>{captions.aboutUsPage.description1}</p>
      <p>{captions.aboutUsPage.description2}</p>
      <p>{captions.aboutUsPage.description3}</p>
    </article>
  </section>
);

export default AboutMe;
