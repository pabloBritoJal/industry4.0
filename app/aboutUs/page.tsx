"use client";

import usePathNameStore from "@store/usePathNameStore";
import Image from "next/image";
import { useEffect } from "react";
import pabloPhoto from "@assets/images/img/pabloPhoto.jpg";
import Link from "next/link";

const AboutUsPage = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  useEffect(() => {
    setPathName("/aboutUs");
  }, []);
  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Acerca de mí</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0 mx-5 flex flex-col items-center">
          <div className="relative h-64 w-64 mb-4 mx-auto md:mx-0 rounded-full  border-8 border-orange-500">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={pabloPhoto}
                alt="Pablo Brito | Tech & Industry 4.0"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <p className="text-lg mb-4 text-justify">
            Soy un desarrollador de software con formación en ingeniería
            electromecánica, apasionado por la tecnología y con un fuerte deseo
            de mejorar continuamente mis habilidades y crecer profesionalmente.
            Con un interés marcado en las tecnologías de vanguardia de la
            Industria 4.0, siempre busco soluciones innovadoras para diversas
            industrias.
          </p>
          <p className="text-lg mb-4 text-justify">
            Actualmente, ofrezco servicios de consultoría tanto en el ámbito de
            la Industria 4.0 como en el desarrollo de software. Con mi
            experiencia en desarrollo full-stack y aplicaciones móviles, puedo
            ayudar a empresas a implementar soluciones tecnológicas que
            optimicen sus procesos y mejoren su eficiencia.
          </p>
          <p className="w-full text-lg mb-4 text-left">Mis servicios abarcan:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Desarrollo full-stack de aplicaciones web con React.js, Next.js,
              Node.js, y Django
            </li>
            <li>Desarrollo de aplicaciones móviles con Flutter</li>
            <li>Consultoría en tecnologías de Industria 4.0</li>
            <li>Optimización de procesos industriales y automatización</li>
            <li>Integración de sistemas y análisis de datos</li>
          </ul>
          <p className="text-lg mb-4 text-justify">
            He trabajado en diversos proyectos, desde plataformas de gestión de
            clientes hasta aplicaciones web y móviles para la gestión de datos
            de pacientes. También tengo experiencia en proyectos empresariales
            con tecnologías como React.js, Next.js, TypeScript, Node.js y
            PostgreSQL, siempre enfocado en ofrecer soluciones robustas y
            escalables tanto en el sector industrial como en otros ámbitos.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-md p-4 mb-4">
            <h3 className="text-lg font-medium mb-2">Contáctame</h3>
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
