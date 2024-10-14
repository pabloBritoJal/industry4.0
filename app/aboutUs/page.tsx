"use client";

import usePathNameStore from "@store/usePathNameStore";
import Image from "next/image";
import { useEffect } from "react";
import logo from "@assets/images/logo.svg";
import Link from "next/link";

const AboutUsPage = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  useEffect(() => {
    setPathName("/aboutUs");
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Acerca de nosotros</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <div className="relative h-64 mb-4">
            <Image
              src={logo}
              alt="Hassler Tech Company"
              width={300}
              height={300}
              className="rounded-md"
            />
          </div>
          <p className="text-lg mb-4">
            En Hassler Tech Company nos dedicamos a brindar servicios de
            consultoría sobre la industria 4.0. Contamos con el personal más
            capacitado del sector para ayudar a su empresa a implementar
            tecnologías de vanguardia y mejorar su productividad.
          </p>
          <p className="text-lg mb-4">
            Ofrecemos una amplia gama de servicios de consultoría, todos ellos
            enfocados en la industria 4.0. Algunos de nuestros servicios
            incluyen:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Optimización de procesos de producción</li>
            <li>Análisis de datos y toma de decisiones</li>
            <li>Implementación de tecnologías de automatización</li>
            <li>Integración de sistemas y procesos</li>
            <li>Estrategias de ciberseguridad</li>
          </ul>
          <p className="text-lg mb-4">
            En Hassler Tech Company nos enorgullece ofrecer servicios de la más
            alta calidad a nuestros clientes en la industria 4.0. Si desea
            obtener más información sobre nuestros servicios o desea programar
            una consulta, no dude en ponerse en contacto con nosotros utilizando
            el formulario a continuación.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Contáctanos</h3>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingrese su nombre completo"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ingrese su correo electrónico"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Ingrese su mensaje"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              >
                Enviar
              </button>
            </form>
          </div>
          <div className="bg-white rounded-md p-4">
            <h3 className="text-lg font-medium mb-2">Datos de contacto</h3>
            <p className="mb-2">
              <i className="fab fa-whatsapp mr-2"></i>
              <Link href="tel:+1234567890">+1234567890</Link> (WhatsApp)
            </p>
            <p className="mb-2">
              <i className="fab fa-twitter mr-2"></i>
              <Link href="https://twitter.com/hasslertech">Twitter</Link>
            </p>
            <p className="mb-2">
              <i className="fab fa-facebook mr-2"></i>
              <Link href="https://www.facebook.com/hasslertech">Facebook</Link>
            </p>
            <p className="mb-2">
              <i className="fab fa-linkedin mr-2"></i>
              <Link href="https://www.linkedin.com/company/hasslertech">
                LinkedIn
              </Link>
            </p>
            <p className="mb-2">
              <i className="far fa-envelope mr-2"></i>
              <Link href="mailto:info@hasslertech.com">
                info@hasslertech.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
