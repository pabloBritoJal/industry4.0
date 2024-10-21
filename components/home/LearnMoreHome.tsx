import Link from "next/link";
import Image from "next/image";
import learnMore from "@assets/images/img/learnMore.jpeg";
import monitor from "@assets/images/img/monitor.jpg";
import { captions } from "@locales/en/captions";

const LearnMoreHome = () => {
  return (
    <div className="w-full relative mb-8 bg-gradient-to-r from-orange-400 to-orange-500 px-3 py-16 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6">
            {captions.learnMoreHome.title}
          </h2>
          <p className="text-white text-lg mb-8">
            {captions.learnMoreHome.description}
          </p>
          <Link
            href="/solutions"
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-full inline-block"
            aria-label="Learn more about Industry 4.0"
          >
            {captions.learnMoreHome.buttonText}
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center gap-10">
          <Image
            src={learnMore}
            width={300}
            height={300}
            alt="Learn more about Industry 4.0 through exploration"
            className="hidden md:block rounded-2xl"
          />
          <Image
          className="rounded-2xl"
            src={monitor}
            width={300}
            height={300}
            alt="Monitoring Industry 4.0 technologies"
          />
        </div>
      </div>
    </div>
  );
};

export default LearnMoreHome;
