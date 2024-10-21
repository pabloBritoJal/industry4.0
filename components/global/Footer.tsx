import Link from "next/link";
import LinkedInIcon from "@assets/icons/linkedin.svg";
import GitHubIcon from "@assets/icons/github.svg";
import WhatsIcon from "@assets/icons/whatsapp.svg";
import { captions } from "@locales/en/captions";

const Footer = () => {
  return (
    <section className="w-full h-auto bg-black py-6 mt-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 mb-16 flex justify-between">
          <div className="w-[70%] md:w-full">
            <h2 className="text-lg font-medium text-white">
              {captions.footer.name}
            </h2>
            <h4 className="text-sm text-white">{captions.footer.title}</h4>
          </div>
          <div className="col-span-2 flex flex-col md:flex-row gap-x-10 gap-6 w-[40%] md:w-full px-6">
            <div>
              <Link
                className="text-base font-medium text-gray-300 hover:text-white underline flex justify-end md:justify-start"
                href={"/"}
              >
                {captions.footer.home}
              </Link>
            </div>
            <div>
              <Link
                className="text-base text-gray-300 font-medium hover:text-white underline flex justify-end md:justify-start"
                href={"/blog"}
              >
                {captions.footer.blog}
              </Link>
              <h6 className="text-[10px] text-slate-200 hidden md:block">
                {captions.footer.blogDescription}
              </h6>
            </div>
            <div>
              <Link
                className="text-base text-gray-300 font-medium hover:text-white underline flex justify-end md:justify-start"
                href={"/solutions"}
              >
                {captions.footer.solutions}
              </Link>
              <h6 className="text-[10px] text-slate-200 hidden md:block">
                {captions.footer.solutionsDescription}
              </h6>
            </div>
            <div>
              <Link
                className="text-base text-gray-300 font-medium hover:text-white underline flex justify-end md:justify-start"
                href={"/aboutUs"}
              >
                {captions.footer.aboutUs}
              </Link>
              <h6 className="text-[10px] text-slate-200 hidden md:block">
                {captions.footer.aboutUsDescription}
              </h6>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 grid grid-cols-2">
          <p className="text-base text-gray-400 py-2">
            {captions.footer.rightsReserved}
          </p>
          <div className="mt-4 flex justify-end gap-6">
            <div className="flex gap-3">
              <Link target="_blank" href="https://wa.me/59178312525">
                <WhatsIcon className="h-6 w-6 fill-white" />
              </Link>
            </div>
            <div className="flex gap-3">
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/pablo-brito-jaldin-64579325b"
              >
                <LinkedInIcon className="h-6 w-6 fill-white" />
              </Link>
            </div>
            <div className="flex gap-3">
              <Link target="_blank" href="https://github.com/pabloBritoJal">
                <GitHubIcon className="h-6 w-6 fill-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
