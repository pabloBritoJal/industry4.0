import type { Metadata } from "next";
import Image from "next/image";
import deyeProduct from "@assets/images/img/deye-product.png";
import deyeConexion from "@assets/images/img/deye-conexion.png";
import deyeComponents from "@assets/images/img/deye-components.png";

export const metadata: Metadata = {
  title: "Sistema de Agua Caliente Solar | Deye 290 L",
  description:
    "Sistema residencial de agua caliente con bomba de calor, tanque acumulador de 290 litros y seis paneles solares.",
};

const CheckIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    className={className}
    aria-hidden="true"
  >
    <path
      d="m5 12 4 4L19 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
      strokeLinecap="round"
    />
  </svg>
);

const AirIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 8h10.5a2.5 2.5 0 1 0-2.3-3.5"
      strokeLinecap="round"
    />
    <path
      d="M3 12h15a2.5 2.5 0 1 1-2.3 3.5"
      strokeLinecap="round"
    />
    <path d="M3 16h6" strokeLinecap="round" />
  </svg>
);

const WaterIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9.5 15.5a3 3 0 0 0 3 1.5" strokeLinecap="round" />
  </svg>
);

const GridIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2 8 22M12 2l4 20M6.5 8h11M5 14h14M3.5 22h17" />
  </svg>
);

const MoonIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z"
      strokeLinejoin="round"
    />
    <path
      d="m9 12 2 2 4-5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 40 24"
    className="h-6 w-10 text-emerald-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M2 12h32M27 5l7 7-7 7" strokeLinecap="round" />
  </svg>
);

function SolarPanelIllustration() {
  return (
    <svg
      viewBox="0 0 680 450"
      className="h-full w-full"
      role="img"
      aria-label="Ilustración de paneles solares residenciales"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dff7f0" />
          <stop offset="100%" stopColor="#f7fbfa" />
        </linearGradient>

        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#123a51" />
          <stop offset="100%" stopColor="#071d2b" />
        </linearGradient>

        <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dde8e5" />
          <stop offset="100%" stopColor="#b7cbc5" />
        </linearGradient>

        <filter id="shadow">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="10"
            floodColor="#0f3d33"
            floodOpacity=".16"
          />
        </filter>
      </defs>

      <rect width="680" height="450" rx="38" fill="url(#sky)" />

      <circle cx="560" cy="85" r="45" fill="#f8c74d" opacity=".95" />
      <circle cx="560" cy="85" r="65" fill="#f8c74d" opacity=".12" />

      <path
        d="M0 340 140 250l105 72 145-124 290 166v86H0Z"
        fill="#c9e2d9"
      />
      <path
        d="M0 375 120 310l132 64 173-105 255 117v64H0Z"
        fill="#a4cfbf"
      />

      <g filter="url(#shadow)">
        <path d="m105 280 225-148 250 145-225 145Z" fill="url(#roof)" />
        <path d="M105 280v44l250 126v-28Z" fill="#aabcb7" />
        <path d="M580 277v45L355 450v-28Z" fill="#8da9a0" />

        <g transform="translate(205 182) skewY(30)">
          <rect width="245" height="155" rx="4" fill="url(#panel)" />
          <g stroke="#6fa6bc" strokeWidth="1">
            <path d="M49 0v155M98 0v155M147 0v155M196 0v155" />
            <path d="M0 38.75h245M0 77.5h245M0 116.25h245" />
          </g>
          <rect
            x="3"
            y="3"
            width="239"
            height="149"
            rx="2"
            fill="none"
            stroke="#d7edf5"
            strokeWidth="3"
          />
        </g>
      </g>

      <g transform="translate(42 55)">
        <circle cx="34" cy="34" r="34" fill="#fff" />
        <path
          d="M34 15v7M34 46v7M15 34h7M46 34h7M20.5 20.5l5 5M42.5 42.5l5 5M20.5 47.5l5-5M42.5 25.5l5-5"
          stroke="#eaaa28"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="34" cy="34" r="9" fill="#f7c646" />
      </g>
    </svg>
  );
}

function HeatPumpIllustration() {
  return (
    <svg
      viewBox="0 0 520 670"
      className="h-full w-full"
      role="img"
      aria-label="Ilustración del termotanque solar con bomba de calor"
    >
      <defs>
        <linearGradient id="tankBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#edf4f2" />
          <stop offset="100%" stopColor="#cddbd7" />
        </linearGradient>

        <linearGradient id="darkTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#344b4a" />
          <stop offset="100%" stopColor="#142c2b" />
        </linearGradient>

        <linearGradient id="display" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d6a59" />
          <stop offset="100%" stopColor="#103f38" />
        </linearGradient>

        <filter id="tankShadow">
          <feDropShadow
            dx="0"
            dy="20"
            stdDeviation="18"
            floodColor="#082f27"
            floodOpacity=".18"
          />
        </filter>
      </defs>

      <ellipse cx="260" cy="620" rx="155" ry="26" fill="#0d4338" opacity=".11" />

      <g filter="url(#tankShadow)">
        <rect
          x="130"
          y="80"
          width="260"
          height="520"
          rx="122"
          fill="url(#tankBody)"
        />

        <path
          d="M130 198c0-67 58-118 130-118s130 51 130 118v80H130Z"
          fill="url(#darkTop)"
        />

        <ellipse cx="260" cy="195" rx="86" ry="86" fill="#1f3736" />
        <circle cx="260" cy="195" r="68" fill="#eef4f2" />
        <circle
          cx="260"
          cy="195"
          r="48"
          fill="none"
          stroke="#a6bbb6"
          strokeWidth="8"
        />
        <circle
          cx="260"
          cy="195"
          r="17"
          fill="none"
          stroke="#a6bbb6"
          strokeWidth="8"
        />

        {Array.from({ length: 10 }).map((_, index) => {
          const angle = (Math.PI * 2 * index) / 10;
          const x1 = 260 + Math.cos(angle) * 22;
          const y1 = 195 + Math.sin(angle) * 22;
          const x2 = 260 + Math.cos(angle + 0.42) * 52;
          const y2 = 195 + Math.sin(angle + 0.42) * 52;

          return (
            <path
              key={index}
              d={`M${x1} ${y1} Q260 195 ${x2} ${y2}`}
              fill="none"
              stroke="#7e9a94"
              strokeWidth="7"
              strokeLinecap="round"
            />
          );
        })}

        <rect
          x="185"
          y="312"
          width="150"
          height="74"
          rx="15"
          fill="url(#display)"
        />
        <text
          x="260"
          y="348"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="#d8fff4"
        >
          55 °C
        </text>
        <text
          x="260"
          y="370"
          textAnchor="middle"
          fontSize="11"
          fill="#a9e4d5"
        >
          SOLAR + RED
        </text>

        <rect x="195" y="414" width="130" height="4" rx="2" fill="#b9c9c5" />

        <text
          x="260"
          y="455"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#244a43"
        >
          DEYE
        </text>

        <text
          x="260"
          y="481"
          textAnchor="middle"
          fontSize="12"
          fill="#647c76"
        >
          SOLAR AIR SOURCE
        </text>

        <path
          d="M176 556c20 18 48 27 84 27s64-9 84-27"
          fill="none"
          stroke="#c3d2ce"
          strokeWidth="3"
        />
      </g>

      <g transform="translate(65 380)">
        <rect width="118" height="68" rx="18" fill="#fff" />
        <circle cx="31" cy="34" r="18" fill="#e9f8f2" />
        <path
          d="M31 22v6M31 40v6M19 34h6M37 34h6M22.5 25.5l4 4M35.5 38.5l4 4M22.5 42.5l4-4M35.5 29.5l4-4"
          stroke="#e6a923"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="31" cy="34" r="5" fill="#f4c64b" />
        <text x="58" y="30" fontSize="10" fontWeight="700" fill="#1f5448">
          ENERGÍA
        </text>
        <text x="58" y="45" fontSize="10" fontWeight="700" fill="#1f5448">
          SOLAR
        </text>
      </g>

      <g transform="translate(338 454)">
        <rect width="118" height="68" rx="18" fill="#fff" />
        <path
          d="M27 17s14 15 14 27a14 14 0 0 1-28 0c0-12 14-27 14-27Z"
          fill="#61b8e7"
        />
        <text x="52" y="30" fontSize="10" fontWeight="700" fill="#1f5448">
          AGUA
        </text>
        <text x="52" y="45" fontSize="10" fontWeight="700" fill="#1f5448">
          CALIENTE
        </text>
      </g>
    </svg>
  );
}

const FeatureCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <article className="rounded-[2rem] border border-emerald-950/5 bg-white p-7 shadow-[0_22px_60px_rgba(13,62,52,0.08)]">
    <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
      {icon}
    </div>

    <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
      {title}
    </h3>

    <p className="leading-7 text-slate-600">{text}</p>
  </article>
);

const TechnicalItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between gap-5 border-b border-slate-200 py-4 last:border-b-0">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-right font-bold text-slate-900">{value}</span>
  </div>
);

const CostRow = ({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) => (
  <div
    className={`flex items-center justify-between gap-6 border-b border-slate-200 py-4 last:border-none ${
      strong ? "font-bold text-slate-950" : "text-slate-600"
    }`}
  >
    <span>{label}</span>
    <span className="shrink-0 tabular-nums">USD {value}</span>
  </div>
);

export default function TermotanqueSolarPage() {
  return (
    <main className="overflow-hidden bg-[#f5f9f7] text-slate-900">
      {/* Navegación */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#073f35]/95 text-white shadow-lg shadow-emerald-950/10 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-emerald-950">
              <SunIcon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-wide">
                AGUA CALIENTE SOLAR
              </p>
              <p className="text-[10px] tracking-[0.2em] text-emerald-100">
                CONFORT Y EFICIENCIA
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-emerald-50 md:flex">
            <a className="transition hover:text-amber-300" href="#producto">
              El sistema
            </a>

            <a
              className="transition hover:text-amber-300"
              href="#funcionamiento"
            >
              Cómo funciona
            </a>

            <a className="transition hover:text-amber-300" href="#paneles">
              Paneles
            </a>

            <a className="transition hover:text-amber-300" href="#costos">
              Costos
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}

      <section
        id="inicio"
        className="relative isolate min-h-[760px] bg-[#073f35] text-white"
      >
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_20%,rgba(253,190,63,0.22),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(71,187,150,0.23),transparent_35%)]" />

        <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
              <SunIcon className="h-5 w-5 text-amber-300" />
              Sistema híbrido solar para viviendas
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Agua caliente para toda la familia
              <span className="mt-2 block text-amber-300">
                aprovechando el sol.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/85 sm:text-xl">
              Un termotanque inteligente de 290 litros que combina energía
              solar, calor del aire y apoyo automático de la red eléctrica.
            </p>

            <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                "Tanque acumulador de 290 litros",
                "Seis paneles solares de 560 W",
                "No necesita baterías",
                "Agua caliente de día y de noche",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-300 text-emerald-950">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-emerald-50">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#funcionamiento"
                className="rounded-full bg-amber-300 px-7 py-4 font-bold text-emerald-950 shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Ver cómo funciona
              </a>

              <a
                href="#costos"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Ver inversión estimada
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[590px] w-full max-w-[550px]">
            <div className="absolute inset-7 rounded-[4rem] bg-gradient-to-br from-amber-300/25 via-white/10 to-emerald-300/15 blur-3xl" />

            <div className="relative h-full rounded-[3.5rem] border border-white/15 bg-white/8 p-5 shadow-[0_50px_100px_rgba(0,0,0,.25)] backdrop-blur-sm">
              <HeatPumpIllustration />
            </div>

            <div className="absolute -left-2 top-16 rounded-2xl border border-white/15 bg-white/95 px-5 py-4 text-slate-900 shadow-2xl sm:-left-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Capacidad
              </p>
              <p className="mt-1 text-3xl font-black">290 L</p>
            </div>

            <div className="absolute -right-1 bottom-20 rounded-2xl border border-white/15 bg-amber-300 px-5 py-4 text-emerald-950 shadow-2xl sm:-right-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Campo solar
              </p>
              <p className="mt-1 text-3xl font-black">3,36 kWp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resumen */}

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(9,68,56,.15)] md:grid-cols-4">
          {[
            ["2,5 kW", "Capacidad térmica"],
            ["≈ 500 W", "Consumo nominal"],
            ["COP 5,0", "Alta eficiencia"],
            ["55–60 °C", "Temperatura de uso"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={`px-7 py-7 text-center ${
                index < 3 ? "md:border-r md:border-slate-200" : ""
              }`}
            >
              <p className="text-3xl font-black tracking-tight text-emerald-800">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Qué es */}

      <section
        id="producto"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 lg:px-8"
      >
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative h-[320px] overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-100 to-white shadow-[0_30px_80px_rgba(16,85,71,.12)] sm:h-[420px] lg:h-[500px]">
            <Image
              src={deyeProduct}
              alt="Termotanque solar Deye con bomba de calor"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain p-6"
            />
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
              Más que un termotanque eléctrico
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Un equipo que aprovecha el calor que ya existe en el aire.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              La bomba de calor no necesita producir todo el calor mediante una
              resistencia eléctrica. Utiliza un compresor para recoger energía
              del aire, elevar su temperatura y transferirla al agua.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Por eso puede entregar aproximadamente cinco unidades de calor
              por cada unidad de electricidad consumida, bajo las condiciones
              de ensayo del fabricante.
            </p>

            <div className="mt-8 rounded-[2rem] bg-emerald-900 p-7 text-white">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-300">
                Explicado de forma sencilla
              </p>

              <p className="mt-3 text-xl font-bold leading-8">
                El equipo usa electricidad principalmente para mover el calor,
                no para fabricarlo completamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
              Beneficios para el hogar
            </p>

            <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Comodidad automática, sin cambiar los hábitos de la familia.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<SunIcon />}
              title="Prioridad solar"
              text="Durante el día, el controlador utiliza primero la energía disponible en los paneles solares."
            />

            <FeatureCard
              icon={<AirIcon />}
              title="Calor gratuito del aire"
              text="La mayor parte de la energía térmica procede del aire ambiente, no de la red eléctrica."
            />

            <FeatureCard
              icon={<WaterIcon />}
              title="Reserva de agua caliente"
              text="El tanque conserva el agua caliente para las duchas de la noche y de la mañana."
            />

            <FeatureCard
              icon={<ShieldIcon />}
              title="Respaldo automático"
              text="Cuando la energía solar no es suficiente, la red completa la potencia que falta."
            />
          </div>
        </div>
      </section>

      {/* Funcionamiento */}

      <section
        id="funcionamiento"
        className="scroll-mt-24 bg-[#073f35] py-28 text-white"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-amber-300">
              Cómo funciona
            </p>

            <h2 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Del sol a la ducha en cinco pasos.
            </h2>

            <p className="mt-6 text-lg leading-8 text-emerald-50/80">
              Todo el proceso es automático. La familia solamente abre la ducha
              y utiliza el agua caliente.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-5">
            {[
              {
                number: "01",
                icon: <SunIcon />,
                title: "Los paneles generan electricidad",
                text: "La radiación solar se convierte en energía eléctrica.",
              },
              {
                number: "02",
                icon: <AirIcon />,
                title: "El equipo capta calor del aire",
                text: "El ventilador hace pasar aire a través del evaporador.",
              },
              {
                number: "03",
                icon: <GridIcon />,
                title: "El compresor eleva la temperatura",
                text: "El refrigerante alcanza una temperatura útil.",
              },
              {
                number: "04",
                icon: <WaterIcon />,
                title: "El calor pasa al agua",
                text: "El intercambiador calienta el agua almacenada.",
              },
              {
                number: "05",
                icon: <MoonIcon />,
                title: "El tanque conserva el calor",
                text: "El agua queda disponible incluso cuando ya no hay sol.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="relative rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur"
              >
                <p className="text-sm font-black tracking-[0.2em] text-amber-300">
                  {step.number}
                </p>

                <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950">
                  {step.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold leading-6">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-emerald-50/70">
                  {step.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-white p-5 sm:p-8">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-emerald-700">
              Diagrama de conexión del sistema
            </p>

            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl sm:h-[320px] lg:h-[420px]">
              <Image
                src={deyeConexion}
                alt="Diagrama de conexión del termotanque Deye con los paneles solares, el panel de control y la red eléctrica"
                fill
                sizes="(min-width: 1024px) 1100px, 90vw"
                className="object-contain"
              />
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Los paneles solares alimentan directamente la entrada DC del
              termotanque. El panel de control muestra la temperatura y el
              estado del equipo, y la red eléctrica queda conectada como
              respaldo automático.
            </p>
          </div>

          <div className="mt-12 rounded-[2.5rem] border border-amber-300/25 bg-amber-300/10 p-8 md:p-10">
            <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-300 text-emerald-950">
                <WaterIcon className="h-10 w-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black">
                  El tanque funciona como una batería térmica.
                </h3>

                <p className="mt-3 max-w-4xl leading-7 text-emerald-50/80">
                  El sistema no guarda electricidad. Convierte la energía solar
                  en calor y la almacena dentro de los 290 litros de agua. Por
                  eso no necesita baterías de litio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Situaciones */}

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                Operación automática
              </p>

              <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                ¿Qué ocurre con sol, nubes o durante la noche?
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                El controlador combina energía solar y red eléctrica sin que el
                usuario tenga que intervenir.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <SunIcon />,
                  title: "Día con buen sol",
                  text: "Los paneles pueden cubrir la operación normal del compresor. Mientras exista suficiente generación, el consumo de red puede ser nulo.",
                  tone: "bg-amber-100 text-amber-700",
                },
                {
                  icon: <AirIcon />,
                  title: "Día nublado",
                  text: "El sistema utiliza toda la energía solar disponible y toma de la red únicamente la diferencia necesaria.",
                  tone: "bg-sky-100 text-sky-700",
                },
                {
                  icon: <ShieldIcon />,
                  title: "El tanque ya está caliente",
                  text: "El compresor se detiene. Los paneles dejan de entregar potencia al equipo. La energía sobrante no se inyecta a la red.",
                  tone: "bg-emerald-100 text-emerald-700",
                },
                {
                  icon: <MoonIcon />,
                  title: "Durante la noche",
                  text: "La familia utiliza el agua caliente acumulada. Si la temperatura baja demasiado, la red puede apoyar la recuperación.",
                  tone: "bg-indigo-100 text-indigo-700",
                },
              ].map((scenario) => (
                <article
                  key={scenario.title}
                  className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(13,62,52,0.06)] sm:grid-cols-[auto_1fr]"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${scenario.tone}`}
                  >
                    {scenario.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-950">
                      {scenario.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {scenario.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paneles */}

      <section
        id="paneles"
        className="scroll-mt-24 bg-white py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
          <div className="h-[480px] overflow-hidden rounded-[3rem] shadow-[0_30px_80px_rgba(12,78,64,.13)]">
            <SolarPanelIllustration />
          </div>

          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
              Campo fotovoltaico
            </p>

            <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Seis paneles solares de alta potencia.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              La propuesta contempla seis módulos rígidos Amerisolar de 560 W
              conectados directamente a la entrada solar del termotanque.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              {[
                ["6", "Paneles solares"],
                ["560 W", "Potencia por panel"],
                ["3,36 kWp", "Potencia total"],
                ["N-type", "Tecnología TOPCon"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-emerald-50 p-5"
                >
                  <p className="text-2xl font-black text-emerald-800">{value}</p>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-3">
              {[
                "20 años de garantía de producto según ficha técnica",
                "30 años de garantía lineal de potencia",
                "Estructura rígida y durable para instalación en techo",
                "Sin inversor fotovoltaico independiente",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recirculación */}

      <section className="bg-[#edf6f2] py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                Mayor comodidad
              </p>

              <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Agua caliente más rápida en los baños.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                En una vivienda grande, el agua que permanece dentro de las
                tuberías se enfría. Al abrir la ducha, primero debe salir esa
                agua antes de que llegue el agua caliente del tanque.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Una bomba de recirculación puede mover el agua por un circuito
                de retorno para que la tubería esté caliente antes de abrir la
                ducha.
              </p>

              <div className="mt-8 rounded-[2rem] bg-white p-7 shadow-lg shadow-emerald-950/5">
                <h3 className="text-xl font-black text-slate-950">
                  Control recomendado
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  La bomba debe operar por horario, temperatura o demanda. No
                  conviene mantenerla encendida las 24 horas, porque aumentaría
                  las pérdidas de calor de las tuberías.
                </p>
              </div>
            </div>

            <div className="rounded-[3rem] bg-emerald-950 p-7 text-white sm:p-10">
              <h3 className="text-2xl font-black">
                ¿Puede adaptarse una casa existente?
              </h3>

              <div className="mt-8 space-y-5">
                {[
                  {
                    number: "01",
                    title: "Retorno dedicado",
                    text: "Se instala una tercera tubería desde el punto más alejado hasta el tanque. Es la solución más eficiente.",
                  },
                  {
                    number: "02",
                    title: "Retorno por la tubería fría",
                    text: "Cuando no es posible hacer obra civil, una válvula especial puede utilizar temporalmente la tubería de agua fría como retorno.",
                  },
                  {
                    number: "03",
                    title: "Sistema bajo demanda",
                    text: "La bomba se activa con un botón, sensor o automatización antes de utilizar la ducha.",
                  },
                ].map((option) => (
                  <div
                    key={option.number}
                    className="rounded-2xl border border-white/10 bg-white/8 p-5"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-300 font-black text-emerald-950">
                        {option.number}
                      </span>

                      <div>
                        <h4 className="font-bold">{option.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                          {option.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-sm leading-6 text-emerald-50/65">
                La bomba, las válvulas y las tuberías de recirculación no están
                incluidas en el costo base presentado en esta propuesta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Especificaciones */}

      <section className="bg-white py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
              Especificaciones principales
            </p>

            <h2 className="text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
              Sistema propuesto para la vivienda.
            </h2>
          </div>

          <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 h-[300px] overflow-hidden rounded-[2.5rem] border border-slate-200 bg-[#f8faf9] sm:h-[400px] lg:order-1 lg:h-[480px]">
              <Image
                src={deyeComponents}
                alt="Componentes internos del termotanque: ventilador, compresor, válvula PT, intercambiador de microcanal, resistencia eléctrica, entrada de agua fría y drenaje"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain p-6"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                Por dentro del termotanque
              </p>

              <h3 className="text-3xl font-black tracking-[-0.03em] text-slate-950">
                Cada componente cumple una función específica.
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                El ventilador y el compresor extraen calor del aire ambiente,
                el intercambiador de microcanal lo transfiere al agua, y la
                resistencia eléctrica actúa solo como respaldo. La válvula PT
                y el puerto de drenaje permiten el mantenimiento del equipo.
              </p>
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
            <div className="rounded-[2.5rem] border border-slate-200 bg-[#f8faf9] p-7 sm:p-9">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <WaterIcon />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    Termotanque Deye
                  </h3>
                  <p className="text-sm text-slate-500">
                    DRSK1-ACDC-25/300R3
                  </p>
                </div>
              </div>

              <TechnicalItem label="Capacidad del tanque" value="290 litros" />
              <TechnicalItem label="Capacidad térmica" value="2,5 kW" />
              <TechnicalItem label="Consumo nominal" value="≈ 500 W" />
              <TechnicalItem label="COP declarado" value="5,0" />
              <TechnicalItem label="Resistencia auxiliar" value="2,0 kW" />
              <TechnicalItem label="Refrigerante" value="R290" />
              <TechnicalItem label="Alimentación" value="Solar DC + red AC" />
            </div>

            <div className="rounded-[2.5rem] border border-slate-200 bg-[#f8faf9] p-7 sm:p-9">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950">
                  <SunIcon />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    Paneles solares
                  </h3>
                  <p className="text-sm text-slate-500">
                    Amerisolar AS-7M144N-HC
                  </p>
                </div>
              </div>

              <TechnicalItem label="Cantidad" value="6 unidades" />
              <TechnicalItem label="Potencia individual" value="560 W" />
              <TechnicalItem label="Potencia instalada" value="3,36 kWp" />
              <TechnicalItem label="Configuración" value="6 en serie" />
              <TechnicalItem label="Tecnología" value="N-type TOPCon" />
              <TechnicalItem label="Garantía producto" value="20 años" />
              <TechnicalItem label="Garantía de potencia" value="30 años" />
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-amber-300 bg-amber-50 p-6">
            <p className="text-sm leading-6 text-amber-950">
              <strong>Nota de ingeniería:</strong> la configuración considera
              módulos de 560 W. Antes de emitir la orden de compra, se debe
              obtener confirmación escrita de Deye respecto a la compatibilidad
              de la corriente de operación del módulo con el controlador MPPT.
              En caso contrario se seleccionará un panel rígido equivalente con
              corriente de operación igual o menor a 13 A.
            </p>
          </div>
        </div>
      </section>

      {/* Costos */}

      <section
        id="costos"
        className="scroll-mt-24 bg-[#073f35] py-28 text-white"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-amber-300">
              Inversión estimada
            </p>

            <h2 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl">
              Costo del termotanque y los paneles solares.
            </h2>

            <p className="mt-6 text-lg leading-8 text-emerald-50/75">
              Valores estimados para carga consolidada dentro de un contenedor
              de 20 pies y transporte hasta Cochabamba.
            </p>
          </div>

          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            <div className="rounded-[2.5rem] bg-white p-7 text-slate-900 sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                    Pago 1
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    Al despachar la carga
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Precio CIF estimado, incluyendo transporte hasta
                    Cochabamba.
                  </p>
                </div>

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700">
                  01
                </span>
              </div>

              <div className="mt-7">
                <CostRow label="Termotanque llevado a FOB" value="950,00" />
                <CostRow label="Seis paneles solares FOB" value="356,50" />
                <CostRow
                  label="Flete prorrateado y seguro"
                  value="105,00"
                />
              </div>

              <div className="mt-7 flex items-end justify-between gap-5 rounded-2xl bg-emerald-50 p-5">
                <span className="font-bold text-emerald-900">Subtotal CIF</span>
                <span className="text-3xl font-black tracking-tight text-emerald-800">
                  USD 1.411,50
                </span>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-7 text-slate-900 sm:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                    Pago 2
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    Para desaduanizar
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tributos y gastos estimados para nacionalizar la mercancía.
                  </p>
                </div>

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 font-black text-emerald-950">
                  02
                </span>
              </div>

              <div className="mt-7">
                <CostRow
                  label="Gravamen arancelario estimado"
                  value="103,00"
                />
                <CostRow label="IVA de importación" value="197,00" />
                <CostRow
                  label="Agencia y gastos aduaneros"
                  value="120,00"
                />
              </div>

              <div className="mt-7 flex items-end justify-between gap-5 rounded-2xl bg-amber-50 p-5">
                <span className="font-bold text-amber-950">
                  Subtotal desaduanización
                </span>
                <span className="text-3xl font-black tracking-tight text-amber-700">
                  USD 420,00
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2.5rem] border border-amber-300/40 bg-gradient-to-r from-amber-300 to-amber-200 p-8 text-emerald-950 shadow-[0_30px_80px_rgba(0,0,0,.18)] sm:p-10">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em]">
                  Total estimado
                </p>

                <h3 className="mt-2 text-3xl font-black">
                  Sistema puesto en almacén
                </h3>
              </div>

              <p className="text-5xl font-black tracking-[-0.04em] sm:text-6xl">
                USD 1.831,50
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm leading-6 text-emerald-50/70">
              El costo presentado corresponde únicamente al termotanque y los
              seis paneles solares puestos en almacén. No incluye estructura de
              montaje, conductores, protecciones, tuberías, válvula mezcladora,
              bomba de recirculación, instalación, puesta en marcha ni posibles
              adecuaciones civiles.
            </p>
          </div>
        </div>
      </section>

      {/* Cierre */}

      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-3xl bg-amber-300 text-emerald-950">
            <SunIcon className="h-9 w-9" />
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
            Agua caliente, menor dependencia de la red y mayor comodidad.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Una solución diseñada para aprovechar la energía solar disponible
            durante el día y conservarla en forma de agua caliente para cuando
            la familia la necesite.
          </p>

          <a
            href="#costos"
            className="mt-9 inline-flex rounded-full bg-emerald-800 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Revisar inversión
          </a>
        </div>
      </section>

      <footer className="bg-[#052f28] py-9 text-emerald-50">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 text-sm lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="font-bold">Sistema residencial de agua caliente solar</p>
            <p className="mt-1 text-emerald-100/60">
              Termotanque híbrido Deye + paneles fotovoltaicos Amerisolar
            </p>
          </div>

          <p className="text-emerald-100/60">
            Propuesta preliminar sujeta a ingeniería, disponibilidad y
            confirmación del fabricante.
          </p>
        </div>
      </footer>
    </main>
  );
}