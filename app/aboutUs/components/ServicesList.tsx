// components/ServicesList.tsx
import { captions } from "@locales/en/captions";

const ServicesList = () => (
  <>
    <h3 className="w-full text-lg mb-4 text-left">
      {captions.aboutUsPage.servicesTitle}
    </h3>
    <ul className="list-disc list-inside mb-4">
      {captions.aboutUsPage.servicesList.map((service, index) => (
        <li key={index}>{service}</li>
      ))}
    </ul>
  </>
);

export default ServicesList;
