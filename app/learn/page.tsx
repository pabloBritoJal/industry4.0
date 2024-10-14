"use client";

import usePathNameStore from "@store/usePathNameStore";
import { useEffect } from "react";

const LearnPage = () => {
  const { pathName, setPathName } = usePathNameStore((state) => state);
  useEffect(() => {
    setPathName("/learn");
  }, []);
  const articles = [
    {
      id: 1,
      title: "¿Qué es la Industria 4.0?",
      description:
        "Un artículo que explica los conceptos básicos de la Industria 4.0 y cómo está transformando la forma en que trabajamos.",
      image: "/images/article1.jpg",
      url: "https://www.example.com/article1",
      category: "Conceptos básicos",
      date: "22 de mayo de 2023",
    },
    {
      id: 2,
      title: "Automatización de procesos en la Industria 4.0",
      description:
        "Un artículo que profundiza en el impacto de la automatización de procesos en la Industria 4.0 y cómo puede mejorar la eficiencia y la productividad.",
      image: "/images/article2.jpg",
      url: "https://www.example.com/article2",
      category: "Automatización de procesos",
      date: "15 de junio de 2023",
    },
    {
      id: 3,
      title: "Big Data en la Industria 4.0",
      description:
        "Un artículo que explica cómo el análisis de grandes cantidades de datos puede ayudar a las empresas a tomar decisiones más informadas y a mejorar su rendimiento.",
      image: "/images/article3.jpg",
      url: "https://www.example.com/article3",
      category: "Big Data",
      date: "5 de julio de 2023",
    },
    {
      id: 4,
      title: "Seguridad en la Industria 4.0",
      description:
        "Un artículo que aborda los desafíos y las soluciones de ciberseguridad en la Industria 4.0, y cómo proteger los datos y sistemas de una empresa.",
      image: "/images/article4.jpg",
      url: "https://www.example.com/article4",
      category: "Seguridad",
      date: "20 de agosto de 2023",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">
        Aprende más sobre la Industria 4.0
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-md overflow-hidden shadow-md"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <span className="text-xs font-bold text-gray-500 uppercase mb-2">
                {article.category}
              </span>
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-gray-700 text-base mb-4">
                {article.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{article.date}</span>
                <a
                  href={article.url}
                  className="text-blue-500 hover:text-blue-600 font-bold"
                >
                  Leer más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
