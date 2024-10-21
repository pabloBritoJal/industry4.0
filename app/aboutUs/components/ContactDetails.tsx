// components/ContactDetails.tsx
import Link from "next/link";
import { captions } from "@locales/en/captions";
import LinkedInIcon from "@assets/icons/linkedin.svg";
import GitHubIcon from "@assets/icons/github.svg";
import WhatsIcon from "@assets/icons/whatsapp.svg";

const ContactDetails = () => (
  <div className="bg-white rounded-md p-4">
    <h3 className="text-lg font-medium mb-2">
      {captions.aboutUsPage.contactDetails}
    </h3>
    <div className="flex gap-3">
      <WhatsIcon className="h-6 w-6" />
      <p className="mb-2">
        <Link target="_blank" href="https://wa.me/59178312525">
          {captions.aboutUsPage.contactMethods.whatsapp}
        </Link>{" "}
      </p>
    </div>
    <div className="flex gap-3">
      <LinkedInIcon className="h-6 w-6" />
      <p className="mb-2">
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/pablo-brito-jaldin-64579325b"
        >
          {captions.aboutUsPage.contactMethods.linkedin}
        </Link>
      </p>
    </div>
    <div className="flex gap-3">
      <GitHubIcon className="h-6 w-6" />
      <p className="mb-2">
        <Link target="_blank" href="https://github.com/pabloBritoJal">
          {captions.aboutUsPage.contactMethods.github}
        </Link>
      </p>
    </div>
  </div>
);

export default ContactDetails;
