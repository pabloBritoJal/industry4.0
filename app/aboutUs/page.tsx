"use client";

import usePathNameStore from "@store/usePathNameStore";
import { useEffect } from "react";
import Image from "next/image";
import pabloPhoto from "@assets/images/img/pabloPhoto.jpg";
import AboutMe from "./components/AboutMe";
import ContactForm from "./components/ContactForm";
import ContactDetails from "./components/ContactDetails";

const AboutUsPage = () => {
  const { setPathName } = usePathNameStore((state) => state);

  useEffect(() => {
    setPathName("/aboutUs");
  }, []);

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0 mx-5 flex flex-col items-center">
          <div className="relative h-64 w-64 mb-4 mx-auto md:mx-0 rounded-full border-8 border-orange-500">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={pabloPhoto}
                alt="Pablo Brito | Tech & Industry 4.0"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <AboutMe />
        </div>
        <div className="w-full md:w-1/2">
          <ContactForm />
          <ContactDetails />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
