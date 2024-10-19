import energy from "@assets/images/img/smart_energy.jpg";
import monitoring from "@assets/images/img/process_monitoring.jpg";
import predictive from "@assets/images/img/predictive_maintenance.jpg";
import assetsTrack from "@assets/images/img/asset_tracking.jpg";
import coldTrack from "@assets/images/img/cold_chain_monitoring.jpg";
import industrial from "@assets/images/img/industrial_automation.jpg";
import { StaticImageData } from "next/image";

export interface Solution {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  content: string;
}

export const mockSolutions: Solution[] = [
  {
    id: 1,
    title: "Process Monitoring and Analysis",
    description:
      "Enhance efficiency and quality of production processes using remote monitoring technologies and data analysis.",
    image: monitoring,
    content: "",
  },
  {
    id: 2,
    title: "Predictive Maintenance",
    description:
      "Optimize maintenance with Industry 4.0: predicting and preventing equipment and machine failures.",
    image: predictive,
    content: "",
  },
  {
    id: 3,
    title: "Energy Management in Industry 4.0",
    description:
      "Combine advanced technologies to reduce costs, improve efficiency and sustainability in production, and promote business competitiveness.",
    image: energy,
    content: "",
  },
];
