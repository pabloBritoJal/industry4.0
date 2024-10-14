import Image from "next/image";
import Link from "next/link";
import homeMachine from "@assets/images/homeMachine.png";
import energy from "@assets/images/energy.png";
import monitoring from "@assets/images/monitoring.png";

const Feed = () => {
  const solutions = [
    {
      id: 1,
      title: "Process Monitoring and Analysis",
      description:
        "Enhance efficiency and quality of production processes using remote monitoring technologies and data analysis.",
      image: monitoring,
    },
    {
      id: 2,
      title: "Predictive Maintenance",
      description:
        "Optimize maintenance with Industry 4.0: predicting and preventing equipment and machine failures.",
      image: homeMachine,
    },
    {
      id: 3,
      title: "Energy Management in Industry 4.0",
      description:
        "Combine advanced technologies to reduce costs, improve efficiency and sustainability in production, and promote business competitiveness.",
      image: energy,
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="pl-5 text-3xl font-bold mb-4">Solutions</h2>
        <div className="px-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
            >
              <div className="h-80 flex items-center">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-700">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            className="bg-orange-600 hover:bg-orange-400 text-white px-4 py-2 rounded-full"
            href="/solutions"
          >
            See more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Feed;
