import homeMachine from "@assets/images/img/homeMachine.png";
import energy from "@assets/images/img/energy.png";
import monitoring from "@assets/images/img/monitoring.png";
import { StaticImageData } from "next/image";

export interface Solution {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

export const mockSolutions: Solution[] = [
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
