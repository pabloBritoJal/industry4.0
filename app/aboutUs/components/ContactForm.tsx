// components/ContactForm.tsx
import { captions } from "@locales/en/captions";

const ContactForm = () => (
  <div className="bg-white rounded-md p-4 mb-4">
    <h3 className="text-lg font-medium mb-2">
      {captions.aboutUsPage.contactTitle}
    </h3>
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          {captions.aboutUsPage.contactForm.fullName}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={captions.aboutUsPage.namePlaceholder}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          {captions.aboutUsPage.contactForm.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={captions.aboutUsPage.emailPlaceholder}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
          {captions.aboutUsPage.contactForm.message}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={captions.aboutUsPage.messagePlaceholder}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        {captions.aboutUsPage.sendMessage}
      </button>
    </form>
  </div>
);

export default ContactForm;
