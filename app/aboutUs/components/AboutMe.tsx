import { captions } from "@locales/en/captions";

const AboutMe = () => (
  <div className="text-lg mb-4 text-justify">
    <p>{captions.aboutUsPage.description1}</p>
    <p>{captions.aboutUsPage.description2}</p>
  </div>
);

export default AboutMe;
