export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
  urlPicture: string;
  url: string;
  industries: string[];
  applications: string[];
  technologies: string[];
  category: string;
}

export const blogData: Article[] = [
  {
    id: 1,
    slug: "blog_1",
    title: "Introduction to Industry 4.0",
    excerpt:
      "‘Industry 4.0’ — a term first coined in 2011 at German trade fair Hannover Messe and later popularised in 2016 at the World Economic Forum — describes...",
    author: {
      name: "Dawn Capital",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*pi60aXqGvc0l6n51o6WxMA.png",
    },
    date: "2024-04-04 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oeUvx_PqLfpXkuVdPn9rxA.png",
    url: "https://medium.com/@dawncapitalteam/part-i-introduction-to-industry-4-0-14e0211cccf0",
    industries: ["Manufacturing"],
    applications: ["Automation"],
    technologies: ["AI", "Machine Learning"],
    category: "Industry 4.0 concepts",
  },

  {
    id: 2,
    slug: "blog_2",
    title: "Industrial IoT Applications and Why You Need Them",
    excerpt:
      "What Are Industrial IoT Applications? Industrial IoT applications, also known as IIoT applications, are the result of integrating complex physical mac...",
    author: {
      name: "EMQ Technologies",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*Cp7OwW2ZTRJQ4xaj8Dg7zg@2x.png",
    },
    date: "2023-11-07 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gG2HPq5IdOLq24ud",
    url: "https://emqx.medium.com/18-industrial-iot-applications-and-why-you-need-them-0af768cc26f3",
    industries: ["Manufacturing"],
    applications: ["Automation", "Process Optimization"],
    technologies: ["AI", "IoT"],

    category: "Industrial IOT",
  },

  {
    id: 3,
    slug: "blog_3",
    title: "KPIs Implementation for Industrial IoT",
    excerpt:
      "In today’s manufacturing environment, achieving operational excellence is a constant pursuit. Key Performance Indicators (KPIs) serve as navigation to...",
    author: {
      name: "EMQ Technologies",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*Cp7OwW2ZTRJQ4xaj8Dg7zg@2x.png",
    },
    date: "2023-10-24 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*zqPrEsE7a5_-NGmg",
    url: "https://emqx.medium.com/automated-kpis-implementation-for-industrial-iot-with-the-open-manufacturing-hub-153a8f730fa0",
    industries: ["Manufacturing"],
    applications: ["Monitoring", "Process Optimization"],
    technologies: ["AI", "Data Analytics", "IoT"],

    category: "Monitoring",
  },

  {
    id: 4,
    slug: "blog_4",
    title: "Industrial IoT vs. Consumer IoT",
    excerpt:
      "There is no denying the skyrocketing popularity of the Internet of Things, or IoT across sectors. More importantly, the technology is now being used a...",
    author: {
      name: "Pratik Rupareliya",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*tBoJLflh9LWdpjxZvXiWeQ.jpeg",
    },
    date: "2023-08-08 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*lR7gpLiNEeNpWmLZEgweWA.png",
    url: "https://patrickhq.medium.com/industrial-iot-vs-consumer-iot-everything-you-should-know-about-2f2546cce705",
    industries: ["Manufacturing"],
    applications: ["Automation"],
    technologies: ["AI", "Data Analytics", "IoT"],
    category: "Industry 4.0 concepts",
  },

  {
    id: 5,
    slug: "blog_5",
    title: "MQTT Sparkplug Solution for Industrial IoT Using EMQX & Neuron",
    excerpt:
      "Sparkplug is an MQTT-base communication protocol designed specifically for industrial automation and IoT applications. To implement a Sparkplug soluti...",
    author: {
      name: "EMQ Technologies",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*Cp7OwW2ZTRJQ4xaj8Dg7zg@2x.png",
    },
    date: "2023-06-16 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*lcsQhGGcqIKHk3Qm",
    url: "https://emqx.medium.com/mqtt-sparkplug-solution-for-industrial-iot-using-emqx-neuron-909aa3976c4",
    industries: ["Manufacturing"],
    applications: ["Automation", "Process Communication"],
    technologies: ["AI", "Data Analytics", "IoT"],
    category: "Comunication",
  },

  {
    id: 6,
    slug: "blog_6",
    title: "Leveraging Transformer Monitoring with Industrial IoT",
    excerpt:
      "From electricity generation to consumption, electric transformers play a crucial role in efficient energy management. Transformers are one of the most...",
    author: {
      name: "Pratik Rupareliya",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*tBoJLflh9LWdpjxZvXiWeQ.jpeg",
    },
    date: "2023-05-30 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*72610UMy5Re7RS9RqfIgvQ.png",
    url: "https://patrickhq.medium.com/leveraging-transformer-monitoring-with-industrial-iot-c70f73372022",
    industries: ["Energy", "Manufacturing"],
    applications: ["Monitoring", "Automation"],
    technologies: ["AI", "Data Analytics", "IoT"],
    category: "Monitoring",
  },

  {
    id: 7,
    slug: "blog_7",
    title: "Predictive Maintenance in Utilities",
    excerpt:
      "Predictive maintenance is a critical strategy for utilities seeking to optimize asset performance, improve reliability, and minimize downtime. GPT-4.0...",
    author: {
      name: "AI & Insights",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*HVPvyAxaFX42YwoNpsDdsQ.png",
    },
    date: "2024-06-08 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*EgTmSrw2MC6PJDibpaiyWQ.jpeg",
    url: "https://medium.com/@AIandInsights/predictive-maintenance-in-utilities-c7edd316a302",
    industries: ["Utilities", "Manufacturing"],
    applications: ["Predictive Maintenance", "Monitoring"],
    technologies: ["AI", "Data Analytics", "IoT"],
    category: "Use cases",
  },

  {
    id: 8,
    slug: "blog_8",
    title: "Unlocking the Power of Predictive Maintenance",
    excerpt:
      "This article unfolds the layers of predictive maintenance, clarifying how it operates, its advantages over traditional methods like preventive mainten...",
    author: {
      name: "Mirko Peters",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*xrb92dTlS7zD28YF1qt3JQ.jpeg",
    },
    date: "2024-02-27 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2FKp4m-7zwSe_c9QCifVDg.jpeg",
    url: "https://blog.mirkopeters.com/unlocking-the-power-of-predictive-maintenance-how-pdm-works-and-why-its-essential-8f4a7f0fc279",
    industries: ["Utilities", "Manufacturing"],
    applications: ["Predictive Maintenance"],
    technologies: ["AI", "Data Analytics", "IoT"],
    category: "Use cases",
  },

  {
    id: 9,
    slug: "blog_9",
    title: "Exploring Deep Learning for Predictive Maintenance",
    excerpt:
      "This blog post discusses the importance of identifying faulty compressors and anomaly detection in predictive maintenance using deep learning. It high...",
    author: {
      name: "Mirko Peters",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*xrb92dTlS7zD28YF1qt3JQ.jpeg",
    },
    date: "2024-01-03 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kWSkflKPlA9UbEaAZaZiog.png",
    url: "https://blog.mirkopeters.com/exploring-deep-learning-for-predictive-maintenance-06933792209e",
    industries: ["Manufacturing"],
    applications: ["Monitoring", "Automation"],
    technologies: ["AI", "IoT"],
    category: "Machine Learning",
  },

  {
    id: 10,
    slug: "blog_10",
    title:
      "AI-driven predictive maintenance: A game-changer for operational reliability",
    excerpt:
      "In the ever-evolving and fiercely competitive industrial landscape, where optimal operational performance is not just a goal but a necessity, the impa...",
    author: {
      name: "LeewayHertz",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*aLQgj6EYeX0wx-v3BYpEjw.png",
    },
    date: "2024-01-28 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*HIlFm0VqGUWc_nG4.png",
    url: "https://leewayhertz.medium.com/ai-driven-predictive-maintenance-a-game-changer-for-operational-reliability-f8a30b9e58ad",
    industries: ["Manufacturing"],
    applications: ["Automation", "Predictive Maintenance"],
    technologies: ["IoT", "Machine Learning"],
    category: "Use cases",
  },

  {
    id: 11,
    slug: "blog_11",
    title: "Top IoT Sensors for Predictive Maintenance",
    excerpt:
      "Since Alexa has started taking commands from users, the world has seen the practical use of IoT clearly. But today, IoT is not limited to just your ho...",
    author: {
      name: "Pratik Rupareliya",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*tBoJLflh9LWdpjxZvXiWeQ.jpeg",
    },
    date: "2023-09-19 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4tvUcuvkudRCEOaqxY-V8g.png",
    url: "https://patrickhq.medium.com/top-iot-sensors-for-predictive-maintenance-89e1391457e6",
    industries: ["Manufacturing"],
    applications: ["Monitoring", "Automation"],
    technologies: ["AI", "Data Analytics"],
    category: "Use cases",
  },

  {
    id: 12,
    slug: "blog_12",
    title:
      "OEE in Lean Manufacturing: Goals, Evaluation Method, and Six Big Losses",
    excerpt:
      "OEE, as defined in our previous post, stands for Overall Equipment Effectiveness, and it is an important part of lean management practices. This metri...",
    author: {
      name: "EMQ Technologies",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*Cp7OwW2ZTRJQ4xaj8Dg7zg@2x.png",
    },
    date: "2023-10-15 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*P2BW2xDhjyc6uuTB",
    url: "https://emqx.medium.com/oee-in-lean-manufacturing-goals-evaluation-method-and-six-big-losses-57d59c798c99",
    industries: ["Energy", "Utilities"],
    applications: ["Monitoring", "Predictive Maintenance"],
    technologies: ["AI", "IoT"],
    category: "Monitoring",
  },

  {
    id: 13,
    slug: "blog_13",
    title: "Three Ways IoT Can Improve Your OEE",
    excerpt:
      "In manufacturing, the term IoT (Internet of Things) is gaining a lot of momentum. Production machine sensors, which gather and collect data, are leadi...",
    author: {
      name: "Opex Analytics",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*-TOwFDUcSUQ-OUHzMSTDYg.png",
    },
    date: "2018-04-23 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*n8RTl_BE4P1NFYl876DmHQ.jpeg",
    url: "https://medium.com/opex-analytics/three-ways-iot-can-improve-your-oee-f1a164902bcd",
    industries: ["Manufacturing"],
    applications: ["Process Optimization", "Automation"],
    technologies: ["Machine Learning", "IoT"],
    category: "Monitoring",
  },
  {
    id: 14,
    slug: "blog_14",
    title: "IIoT vs. IoT: Examples and 5 Key Differences",
    excerpt:
      "IoT, or Internet of Things, is the idea of connecting everyday devices to the internet, allowing them to send, receive, and process data. These device...",
    author: {
      name: "EMQ Technologies",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*Cp7OwW2ZTRJQ4xaj8Dg7zg@2x.png",
    },
    date: "2023-11-01 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*dX0pSRaXJD7huGcr",
    url: "https://emqx.medium.com/iiot-vs-iot-examples-and-5-key-differences-14980be0db9a",
    industries: ["Energy", "Utilities"],
    applications: ["Automation", "Predictive Maintenance"],
    technologies: ["AI", "Machine Learning"],
    category: "Industry 4.0 concepts",
  },

  {
    id: 15,
    slug: "blog_15",
    title: "IIoT Explained: Examples, Technologies, Benefits and Challenges",
    excerpt:
      "The industrial internet of things, or IIoT, is a term used to describe the application of internet of things (IoT) technology in industrial settings. ...",
    author: {
      name: "EMQ Technologies",
      image:
        "https://miro.medium.com/v2/resize:fill:88:88/1*Cp7OwW2ZTRJQ4xaj8Dg7zg@2x.png",
    },
    date: "2023-08-08 00:00:00",
    urlPicture:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*plEdSum6ijmTRAtF",
    url: "https://emqx.medium.com/iiot-explained-examples-technologies-benefits-and-challenges-e688ee870685",
    industries: ["Manufacturing"],
    applications: ["Monitoring"],
    technologies: ["AI", "IoT"],
    category: "Industry 4.0 concepts",
  },
];
