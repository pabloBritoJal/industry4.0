// components/ContactForm.tsx
import { useState } from "react";
import { captions } from "@locales/en/captions";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular un pequeño retraso de 2 segundos para simular el envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Limpiar los campos del formulario después del envío
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-md p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">
        {captions.aboutUsPage.contactTitle}
      </h3>

      {isSubmitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-md">
          {captions.aboutUsPage.contactForm.successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              {captions.aboutUsPage.contactForm.fullName}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={captions.aboutUsPage.namePlaceholder}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              {captions.aboutUsPage.contactForm.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={captions.aboutUsPage.emailPlaceholder}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              {captions.aboutUsPage.contactForm.message}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={captions.aboutUsPage.messagePlaceholder}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? captions.aboutUsPage.sendingMessage
              : captions.aboutUsPage.sendMessage}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
