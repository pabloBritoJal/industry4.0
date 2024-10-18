// components/ContactDetails.tsx
import Link from "next/link";
import { captions } from "@locales/en/captions";

const ContactDetails = () => (
  <div className="bg-white rounded-md p-4">
    <h3 className="text-lg font-medium mb-2">
      {captions.aboutUsPage.contactDetails}
    </h3>
    <p className="mb-2">
      <i className="fab fa-whatsapp mr-2"></i>
      <Link href="tel:+1234567890">+1234567890</Link> (
      {captions.aboutUsPage.contactMethods.whatsapp})
    </p>
    <p className="mb-2">
      <i className="fab fa-twitter mr-2"></i>
      <Link href="https://twitter.com/hasslertech">
        {captions.aboutUsPage.contactMethods.twitter}
      </Link>
    </p>
    <p className="mb-2">
      <i className="fab fa-facebook mr-2"></i>
      <Link href="https://www.facebook.com/hasslertech">
        {captions.aboutUsPage.contactMethods.facebook}
      </Link>
    </p>
    <p className="mb-2">
      <i className="fab fa-linkedin mr-2"></i>
      <Link href="https://www.linkedin.com/company/hasslertech">
        {captions.aboutUsPage.contactMethods.linkedin}
      </Link>
    </p>
    <p className="mb-2">
      <i className="far fa-envelope mr-2"></i>
      <Link href="mailto:info@hasslertech.com">
        {captions.aboutUsPage.contactMethods.email}
      </Link>
    </p>
  </div>
);

export default ContactDetails;
