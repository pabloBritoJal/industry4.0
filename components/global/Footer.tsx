import Link from "next/link";

const Footer = () => {
  return (
    <section className="w-full h-60 bg-black py-6 mt-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 mb-16 flex justify-between">
          <div className="w-[70%] md:w-full">
            <h2 className="text-lg font-medium text-white">Pablo Brito</h2>
            <h4 className="text-sm text-white">
              Software development & Industry 4.0
            </h4>
          </div>
          <div className="col-span-2 flex flex-col md:flex-row gap-x-10 gap-6 w-[30%] md:w-full px-6">
            <div>
              <Link
                className="text-base font-medium text-gray-300 hover:text-white underline flex justify-end md:justify-start"
                href={"/"}
              >
                Home
              </Link>
            </div>
            <div>
              <Link
                className="text-base text-gray-300 font-medium hover:text-white underline flex justify-end md:justify-start"
                href={"/blog"}
              >
                Blog
              </Link>
              <h6 className="text-[10px] text-slate-200 hidden md:block">
                Expand your knowledge in one of the most important areas of
                modern industry.
              </h6>
            </div>
            <div>
              <Link
                className="text-base text-gray-300 font-medium hover:text-white underline flex justify-end md:justify-start"
                href={"/solutions"}
              >
                Solutions
              </Link>
              <h6 className="text-[10px] text-slate-200 hidden md:block">
                Discover use cases for applying Industry 4.0 technologies in
                various areas.
              </h6>
            </div>
            <div>
              <Link
                className="text-base text-gray-300 font-medium hover:text-white underline flex justify-end md:justify-start"
                href={"/aboutUs"}
              >
                About Us
              </Link>
              <h6 className="text-[10px] text-slate-200 hidden md:block">
                Learn more about our company, what we do, and how we do it.
              </h6>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 grid grid-cols-2">
          <p className="text-base text-gray-400 py-2">
            &copy; 2023 Your Company. All rights reserved.
          </p>
          <div className="mt-4 flex justify-end">
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M20.59,2H3.41C2.65,2,2,2.66,2,3.41v17.18c0,0.75,0.65,1.41,1.41,1.41h17.18c0.75,0,1.41-0.65,1.41-1.41V3.41C22,2.66,21.35,2,20.59,2z M18.85,4v2.48h-1.29c-1.21,0-1.44,0.58-1.44,1.42v1.86h2.88l-0.38,2.91h-2.5v7.45H11.5v-7.45h-2.5v-2.91h2.5v-1.61c0-2.48,1.52-3.82,3.7-3.82c1.05,0,1.95,0.08,2.21,0.12z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300 ml-6">
              <span className="sr-only">Twitter</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M23.94,4.5c-4,0.5-1.07,0.92-1.67,1.27c0.01,0.12,0.01,0.24,0.01,0.36c0,7.71-5.86,16.6-16.6,16.6c-3.29,0-6.34-0.96-8.92-2.62c0.46,0.05,0.93,0.08,1.41,0.08c2.75,0,5.28-0.93,7.29-2.51c-2.57-0.05-4.73-1.74-5.48-4.07c0.36,0.07,0.73,0.11,1.11,0.11c0.54,0,1.07-0.07,1.57-0.19c-2.72-0.55-4.77-2.96-4.77-5.86v-0.07c0.8,0.44,1.71,0.71,2.67,0.74c-1.58-1.06-2.62-2.87-2.62-4.92c0-1.08,0.29-2.08,0.79-2.94c2.89,3.54,7.21,5.87,12.09,6.11c-0.1-0.44-0.15-0.9-0.15-1.37c0-3.32,2.69-6.01,6.01-6.01c1.73,0,3.29,0.73,4.39,1.91c1.37-0.27,2.65-0.77,3.82-1.46c-0.45,1.41-1.41,2.59-2.65,3.34c1.22-0.14,2.39-0.47,3.49-0.95C22.08,3.93,21.08,4.25,20,4.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300 ml-6">
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M20.28,20.28h-3.9V13.9c0-1.44-0.03-3.29-2-3.29c-2.01,0-2.31,1.57-2.31,3.19v6.49h-3.9V9.38h3.81v1.7h0.05c0.53-1.01,1.83-2.08,3.76-2.08c4.03,0,4.78,2.65,4.78,6.09v6.19zM6.68,7.68c-1.2,0-2.18-0.99-2.18-2.18c0-1.2,0.98-2.18,2.18-2.18c1.2,0,2.18,0.98,2.18,2.18C8.85,6.7,7.88,7.68,6.68,7.68zM4.38,20.28h-3.9V9.38h3.9V20.28z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
