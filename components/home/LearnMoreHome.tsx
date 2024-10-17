import Link from "next/link";
import Image from "next/image";
import learnMore from "@assets/images/img/learnMore.jpeg";
import monitor from "@assets/images/img/monitor.jpg";

const LearnMoreHome = () => {
  return (
    <div className="w-full relative mb-8 bg-gradient-to-r from-orange-400 to-orange-500 px-3 py-16 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6">
            Discover Industry 4.0
          </h2>
          <p className="text-white text-lg mb-8">
            Explore the technologies driving the fourth industrial revolution
            and understand how they can transform your business.
          </p>
          <Link
            href="/learn-more"
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-full inline-block"
          >
            Learn More
          </Link>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center gap-10">
          <Image
            src={learnMore}
            width={300}
            height={300}
            alt="Learn more about Industry 4.0"
            className="hidden md:block"
          />
          <Image
            src={monitor}
            width={300}
            height={300}
            alt="Learn more about Industry 4.0"
          />
        </div>
      </div>
    </div>
  );
};

export default LearnMoreHome;
