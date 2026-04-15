export default function PropuestaIndustria40Delizia() {
  const companyName = "Planta de helados, lácteos y jugos";

  const baseFeatures = [
    "Integración de hasta 10 puntos de datos",
    "Dashboard en tiempo real",
    "Históricos y gráficas por rango de tiempo",
    "Registro continuo de datos",
    "Estado de conexión por equipo",
    "Acceso web seguro",
  ];

  const operativoFeatures = [
    "Todo lo del Plan Base",
    "Alertas por temperatura, nivel, peso y desconexión",
    "Historial de eventos",
    "Reportes operativos básicos",
    "Dashboards organizados por área / proceso",
  ];

  const avanzadoFeatures = [
    "Todo lo del Plan Operativo",
    "Analítica de tendencias y desviaciones",
    "KPIs de estabilidad y uso de activos",
    "Reglas inteligentes basadas en históricos",
    "Base para optimización y evolución Industria 4.0",
  ];

  const setupItems = [
    "Integración de 6 controladores Omron E5CC vía RS-485 Modbus RTU",
    "Integración de 2 sistemas de pesaje según interfaz disponible",
    "Integración de 1 flujómetro existente",
    "Instalación de 1 sensor de nivel industrial",
    "Instalación y configuración de gateway industrial",
    "Configuración de adquisición, normalización y envío de datos",
    "Despliegue inicial del sistema SaaS",
    "Validación de comunicación y puesta en marcha",
  ];

  const hardwareItems = [
    {
      name: "Gateway industrial Teltonika RUT956",
      brand: "Teltonika Networks",
      image: "https://m.media-amazon.com/images/I/71uHmRR4BSL._AC_SL1500_.jpg",
      detail:
        "Gateway/router industrial para conectividad de campo y salida a la nube. Base de la arquitectura edge del sistema.",
      useCase:
        "Concentrador principal del piloto para enlace del sistema con la plataforma SaaS.",
      model: "RUT956",
      availability: "Stock local inmediato",
      source: "Hiller Electric",
      price: "USD 1.000",
    },
    {
      name: "Sensor de nivel radar compacto",
      brand: "Siemens",
      image:
        "https://images.sw.cdn.siemens.com/siemens-disw-assets/public/5FDDFDfMnnV178eXTuOkmm/en-US/sitranslr100serieswithLR150.png?auto=format%2Ccompress&fit=crop&crop=faces%2Cedges&w=640&h=480&q=60",
      detail:
        "Sensor de nivel por radar (FMCW) sin contacto. Alta confiabilidad en entornos industriales, inmune a vapor, espuma y variaciones de densidad del producto.",
      useCase:
        "Solución recomendada para medición de nivel en tanques con condiciones exigentes (vapor, condensación o superficies inestables), donde el ultrasonido no es confiable.",
      model: "SITRANS LR100",
      availability: "Referencial mercado local / importación",
      source: "Siemens / distribuidores industriales",
      price: "USD 400 – 800",
    },
    {
      name: "Sensor de nivel ultrasónico",
      brand: "Siemens",
      image:
        "https://www.rshydro.co.uk/cp/admin/uploads/products/images/update/Sitrans-Probe-LU-Ultrasonic-Level-Transmitter-Img-1.jpg",
      detail:
        "Sensor sin contacto para medición de nivel en aplicaciones compatibles. Adecuado cuando el entorno físico del tanque permite una lectura estable.",
      useCase:
        "Alternativa para tanques donde no convenga contacto con producto y no existan condiciones severas de vapor o espuma.",
      model: "SITRANS Probe LU",
      availability: "Referencial mercado local",
      source: "Proveedores industriales locales / importación",
      price: "USD 300 – 700",
    },
    {
      name: "Módulo industrial de entradas analógicas/digitales",
      brand: "ICP DAS / Advantech",
      image:
        "https://advdownload.advantech.com/productfile/PIS/WISE-4012/Product%20-%20Photo(Main)/WISE-4012_02_S20160304144120.png",
      detail:
        "Módulos para integrar señales 4–20 mA, 0–10 V y digitales de campo, útiles en escenarios de flujómetros, transmisores y señales auxiliares existentes.",
      useCase:
        "Adaptación de señales industriales cuando el equipo no expone directamente comunicación digital integrada.",
      model: "WISE-4012 / equivalente",
      availability: "Referencial mercado local",
      source: "Proveedores industriales locales / importación",
      price: "USD 120 – 350",
    },
    {
      name: "Conversor industrial Modbus / RS-485",
      brand: "Moxa",
      image:
        "https://cdn-cms-frontdoor-dfc8ebanh6bkb3hs.a02.azurefd.net/en/getattachment/Products/INDUSTRIAL-EDGE-CONNECTIVITY/Protocol-Gateways/Modbus-TCP-Gateways/MGate-MB3170-MB3270-Series/moxa-mgate-mb3170-mb3270-series-image-(1).jpg",
      detail:
        "Interfaz industrial para escenarios de compatibilidad y adaptación entre equipos Modbus RTU/TCP o redes industriales mixtas.",
      useCase:
        "Soporte técnico para integración de equipos existentes cuando la topología o interfaz de campo lo requiera.",
      model: "MGate MB3170 / equivalente",
      availability: "Referencial mercado local",
      source: "Proveedores industriales locales / importación",
      price: "USD 80 – 200",
    },
    {
      name: "Cableado e instalación industrial",
      brand: "Materiales certificados",
      image: "https://i.ibb.co/931QVYGx/8723060-011.jpg",
      detail:
        "Incluye cableado industrial blindado, conectores, canalización y adecuaciones necesarias para la correcta instalación de los equipos en campo.",
      useCase:
        "Garantiza integridad de señal, protección contra interferencias eléctricas y cumplimiento de buenas prácticas de instalación industrial.",
      model: "Cable instrumentación / par trenzado blindado",
      availability: "Mercado local",
      source: "Proveedores eléctricos industriales",
      price: "USD 40 – 80 por punto",
    },
  ];

  const integrationPoints = [
    "6 Omron E5CC",
    "2 sistemas de celdas de carga",
    "1 flujómetro",
    "1 sensor de nivel",
  ];

  const dashboardCards = [
    {
      title: "Vista General de Planta",
      desc: "Estado consolidado de temperaturas, peso, flujo y nivel con indicadores online/offline.",
      accent: "KPIs + resumen por área",
    },
    {
      title: "Tanques y Materia Prima",
      desc: "Seguimiento por tanque con temperatura, peso o nivel e histórico asociado.",
      accent: "Variables críticas visibles",
    },
    {
      title: "Tendencias e Históricos",
      desc: "Gráficas por rango de tiempo para validar estabilidad y comportamiento del proceso.",
      accent: "Base para trazabilidad",
    },
    {
      title: "Estado de Comunicaciones",
      desc: "Disponibilidad de gateway y equipos, última actualización y salud del sistema.",
      accent: "Visibilidad técnica real",
    },
  ];

  const phases = [
    {
      title: "Adopción del Plan Base",
      desc: "Centralización inicial de datos para dar visibilidad operativa inmediata con inversión controlada.",
    },
    {
      title: "Evolución al Plan Operativo",
      desc: "Incorporación de alertas, eventos y reportes para transformar datos en acción.",
    },
    {
      title: "Escalamiento al Plan Avanzado",
      desc: "Analítica, KPIs y reglas inteligentes como base real de Industria 4.0.",
    },
  ];

  const architecturePillars = [
    "Gateway industrial central",
    "Bus RS-485 para Omron E5CC",
    "Integración de señales analógicas / digitales",
    "Base de datos histórica + dashboard web",
  ];

  const localPriceNotes = [
    "Los precios indicados son referenciales de mercado local en Bolivia y consideran escenarios de disponibilidad inmediata a través de proveedores especializados.",
    "En caso de que el cliente pueda trabajar con plazos de entrega mayores, la provisión mediante importación directa puede permitir una estructura de costos más competitiva, manteniendo compatibilidad y especificación técnica equivalente.",
  ];

  type PricingCardProps = {
    title: string;
    subtitle: string;
    price: string;
    features: string[];
    highlight?: boolean;
    badge?: string;
  };

  const SectionHeader = ({
    eyebrow,
    title,
    description,
    light = false,
  }: {
    eyebrow: string;
    title: string;
    description: string;
    light?: boolean;
  }) => (
    <div className="max-w-3xl">
      <div
        className={`text-sm font-semibold uppercase tracking-[0.2em] ${
          light ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {eyebrow}
      </div>
      <h2
        className={`mt-3 text-3xl sm:text-4xl font-black tracking-tight ${
          light ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-lg leading-8 ${
          light ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </div>
  );

  const PricingCard = ({
    title,
    subtitle,
    price,
    features,
    highlight = false,
    badge,
  }: PricingCardProps) => (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-trangray-y-1 hover:shadow-xl ${
        highlight
          ? "border-black bg-black text-white"
          : "border-gray-200 bg-white text-black"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${
          highlight ? "bg-orange-500" : "bg-black"
        }`}
      />
      {badge ? (
        <div
          className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            highlight ? "bg-white/15 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {badge}
        </div>
      ) : null}

      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className={`${highlight ? "text-gray-300" : "text-gray-600"}`}>
          {subtitle}
        </p>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className={`${highlight ? "text-gray-300" : "text-gray-500"}`}>
          / mes
        </span>
      </div>

      <div
        className={`mt-2 text-sm ${
          highlight ? "text-gray-300" : "text-gray-500"
        }`}
      >
        Hasta 10 puntos incluidos. Expansión por bloques adicionales de
        capacidad.
      </div>

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div
              className={`mt-1 h-2.5 w-2.5 rounded-full ${
                highlight ? "bg-white" : "bg-black"
              }`}
            />
            <p className={`${highlight ? "text-gray-200" : "text-gray-700"}`}>
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const MiniDashboard = ({
    title,
    desc,
    accent,
  }: {
    title: string;
    desc: string;
    accent: string;
  }) => (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-black">{title}</div>
            <div className="text-xs text-gray-500">{accent}</div>
          </div>
          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Online
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="text-xs text-gray-500">Temperatura</div>
            <div className="mt-2 text-2xl font-bold text-black">4.2°C</div>
          </div>

          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="text-xs text-gray-500">Nivel / Peso</div>
            <div className="mt-2 text-2xl font-bold text-black">78%</div>
          </div>

          <div className="col-span-2 rounded-2xl bg-white p-3 shadow-sm">
            <div className="mb-2 text-xs text-gray-500">
              Histórico reciente
            </div>
            <div className="flex h-24 items-end gap-2">
              {[28, 36, 24, 44, 38, 52, 46, 58, 54, 62, 48, 66].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-xl bg-black/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">{desc}</p>
    </div>
  );

  const HardwareCard = ({
    item,
  }: {
    item: {
      name: string;
      brand: string;
      image: string;
      detail: string;
      useCase: string;
      model: string;
      availability: string;
      source: string;
      price: string;
    };
  }) => (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="border-b border-white/10 bg-white px-5 py-4">
        <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-gray-400">
              {item.brand}
            </div>
            <div className="mt-1 text-xl font-bold text-white">{item.name}</div>
          </div>

          <div className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
            {item.price}
          </div>
        </div>

        <p className="text-sm leading-7 text-gray-300">{item.detail}</p>

        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-xs uppercase tracking-[0.16em] text-gray-400">
            Aplicación propuesta
          </div>
          <p className="mt-2 text-sm leading-7 text-gray-200">
            {item.useCase}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-xs text-gray-400">Modelo</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {item.model}
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-xs text-gray-400">Disponibilidad</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {item.availability}
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="text-xs text-gray-400">Referencia</div>
            <div className="mt-1 text-sm font-semibold text-white">
              {item.source}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden border-b border-gray-200 bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.12),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.12),_transparent_32%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex rounded-full border border-gray-300 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur">
                Propuesta técnica y económica · Industria 4.0 SaaS
              </div>

              <h1 className="mt-6 max-w-4xl text-3xl sm:text-4xl font-black tracking-tight text-black sm:text-5xl lg:text-6xl">
                Adopción del Plan Base para monitoreo industrial en{" "}
                {companyName}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                Una ruta concreta para digitalizar la planta sin entrar en un
                SCADA costoso. El objetivo inicial es centralizar datos
                industriales reales usando la infraestructura existente, nuevos
                sensores donde haga falta y una plataforma SaaS lista para
                crecer por módulos.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Setup inicial
                  </div>
                  <div className="mt-2 text-3xl font-extrabold orange_gradient">USD 1.650</div>
                  <div className="mt-1 text-sm text-gray-600">
                    Implementación inicial del sistema
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Plan Base
                  </div>
                  <div className="mt-2 text-3xl font-extrabold orange_gradient">USD 100</div>
                  <div className="mt-1 text-sm text-gray-600">
                    Suscripción mensual · hasta 10 puntos
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Enfoque
                  </div>
                  <div className="mt-2 text-3xl font-extrabold orange_gradient">No intrusivo</div>
                  <div className="mt-1 text-sm text-gray-600">
                    Sin intervenir la lógica de control existente
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/60">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-black">
                      Resumen ejecutivo
                    </div>
                    <div className="text-xs text-gray-500">
                      Implementación inicial + evolución modular
                    </div>
                  </div>
                  <div className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                    Fase actual
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Captura y centralización de datos industriales",
                    "Dashboard web con históricos y estado de conexión",
                    "Arquitectura preparada para alertas, reportes y analítica",
                    "Modelo SaaS con crecimiento por planes",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4"
                    >
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-black" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {integrationPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-gray-200 p-3"
                    >
                      <div className="text-xs text-gray-500">Integración</div>
                      <div className="mt-1 font-semibold text-black">
                        {point}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {phases.map((phase, index) => (
            <div
              key={phase.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
                0{index + 1}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-black">
                {phase.title}
              </h2>
              <p className="mt-3 text-gray-600">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
          <SectionHeader
            eyebrow="Problema y propuesta"
            title="El problema no es la falta de sensores. Es la falta de una arquitectura de datos útil."
            description="La planta ya tiene instrumentos y equipos valiosos, pero los datos están aislados. Esta propuesta plantea una adopción progresiva: primero visibilidad real y almacenamiento histórico; después alertas, reportes y evolución hacia capacidades fuertes de Industria 4.0."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <div className="text-lg font-bold text-black">
                Qué resolvemos desde el inicio
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Datos dispersos en controladores, indicadores y sensores sin una plataforma única",
                  "Operación basada en observación manual o revisión local de equipos",
                  "Ausencia de históricos consolidados para análisis posterior",
                  "Dificultad para crecer hacia alertas, reportes y analítica sin una base consistente",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-gray-50 p-4"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-black p-6 text-white shadow-sm">
              <div className="text-lg font-bold">Qué implementamos</div>

              <div className="mt-5 space-y-3">
                {[
                  "Captura de datos desde activos industriales existentes y sensores nuevos",
                  "Gateway industrial central con comunicación MQTT hacia la nube",
                  "Base de datos histórica y dashboard web para monitoreo",
                  "Fundación técnica para escalar a módulos de alertas, reportes y analítica",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl bg-white/10 p-4"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                    <p className="text-gray-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <SectionHeader
          eyebrow="Implementación inicial"
          title="Qué se hace exactamente en el setup inicial"
          description="El setup no cobra desarrollo de software como activo independiente. Lo que se cobra es la implementación inicial del sistema para dejar la arquitectura operativa, los puntos integrados y la plataforma funcionando para la adopción del servicio mensual."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {setupItems.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  Incluido
                </div>
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-black bg-black p-6 text-white shadow-xl">
            <div className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Inversión inicial
            </div>
            <div className="mt-3 text-5xl font-black">USD 1.650</div>
            <p className="mt-4 text-gray-300">
              Incluye implementación inicial del sistema para adopción del Plan
              Base. No incluye hardware externo que deba adquirirse ni
              desarrollos especiales fuera del alcance definido.
            </p>

            <div className="mt-6 rounded-3xl bg-white/10 p-4">
              <div className="text-sm font-semibold">Tiempo estimado</div>
              <div className="mt-2 text-gray-300">
                10 a 15 días hábiles desde orden de proceder y disponibilidad de
                acceso a equipos.
              </div>
            </div>

            <div className="mt-4 rounded-3xl bg-white/10 p-4">
              <div className="text-sm font-semibold">Forma de pago</div>
              <div className="mt-2 text-gray-300">
                50% al inicio · 50% con sistema operativo y entregado.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
          <SectionHeader
            eyebrow="Planes del sistema"
            title="Modelo SaaS industrial por módulos"
            description="La ruta recomendada es comenzar con el Plan Base y escalar a medida que la planta convierta datos en decisiones. Cada plan incluye hasta 10 puntos de datos. La expansión se realiza por bloques adicionales de capacidad."
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            <PricingCard
              title="Plan Base"
              subtitle="Monitoreo Industrial"
              price="USD 100"
              features={baseFeatures}
              badge="Adopción recomendada"
            />

            <PricingCard
              title="Plan Operativo"
              subtitle="Supervisión y Alertas"
              price="USD 200"
              features={operativoFeatures}
              highlight
              badge="Siguiente evolución"
            />

            <PricingCard
              title="Plan Avanzado"
              subtitle="Analítica y Optimización"
              price="USD 350"
              features={avanzadoFeatures}
              badge="Etapa de madurez"
            />
          </div>

          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-bold text-black">
              Política de capacidad
            </div>
            <p className="mt-3 text-gray-600">
              Cada plan incluye hasta 10 puntos de datos. Si la planta requiere
              mayor cobertura, la capacidad se amplía mediante bloques
              adicionales. Esto evita costos innecesarios al inicio y permite un
              crecimiento ordenado del sistema.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                { label: "Plan Base", value: "+USD 60 / bloque adicional" },
                {
                  label: "Plan Operativo",
                  value: "+USD 80 / bloque adicional",
                },
                {
                  label: "Plan Avanzado",
                  value: "+USD 100 / bloque adicional",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-gray-50 p-4">
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="mt-1 text-lg font-bold text-black">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Bloque adicional de hasta 10 puntos
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <SectionHeader
          eyebrow="Vista del sistema"
          title="Miniaturas del dashboard propuesto"
          description="La presentación visual debe transmitir orden, visibilidad operativa y preparación para crecimiento. Estas miniaturas representan el tipo de interfaz esperada para la adopción inicial del sistema."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) => (
            <MiniDashboard
              key={card.title}
              title={card.title}
              desc={card.desc}
              accent={card.accent}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-black text-white">
        <div className="mt-10 rounded-3xl border border-orange-500/30 bg-orange-500/10 p-6 sm:p-10 mx-6 lg:mx-auto max-w-4xl">
          <div className="text-sm uppercase tracking-[0.2em] text-orange-400">
            Inversión referencial en HARDWARE
          </div>

          <div className="mt-2 text-3xl font-extrabold text-white">
            USD 2.000 – 3.600
          </div>

          <p className="mt-4 text-gray-300">
            Estimación de inversión en hardware para una adopción inicial de
            hasta 10 puntos de datos, considerando gateway industrial, sensor de
            nivel, interfaces de integración y cableado.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Gateway industrial: USD 1.000 - 1200",
              "Sensor de nivel: USD 300 – 800",
              "Interfaces y módulos: USD 100 – 400",
              "Cableado e instalación: USD 400 – 800",
              "Extras: USD 200 – 400",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/5 p-3 text-sm text-gray-200"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-gray-300">
            El valor final será definido con precisión posterior al setup
            inicial, etapa en la cual se validan en campo las condiciones reales
            de instalación, la selección óptima de sensores (ultrasonido o
            radar) y las interfaces disponibles en los equipos existentes.
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
          <SectionHeader
            eyebrow="Hardware y arquitectura"
            title="Base técnica seleccionada para la planta"
            description="La arquitectura recomendada es híbrida y no intrusiva: lectura por RS-485 Modbus RTU para Omron, integración digital o analógica para pesaje y flujo, sensor de nivel industrial y envío de datos mediante gateway industrial hacia la plataforma SaaS vía MQTT."
            light
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
            {architecturePillars.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/10 p-4 text-gray-100"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {hardwareItems.map((item) => (
              <HardwareCard key={item.name} item={item} />
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-bold text-white">
              Nota sobre precios y provisión de hardware
            </div>

            <div className="mt-4 space-y-3">
              {localPriceNotes.map((note) => (
                <div
                  key={note}
                  className="flex gap-3 rounded-2xl bg-white/5 p-4"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />
                  <p className="text-gray-300">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Qué incluye el Plan Base
            </div>

            <div className="mt-4 space-y-4">
              {[
                "Dashboard web en tiempo real con variables por tanque, proceso o equipo",
                "Históricos con selección por rango y visualización de tendencias",
                "Registro continuo de datos con timestamps e integridad básica",
                "Estado de conexión de equipos y gateway",
                "Acceso desde navegador en PC, tablet o móvil",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-black" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Qué no incluye esta etapa
            </div>

            <div className="mt-4 space-y-4">
              {[
                "Control de procesos o modificación de la lógica existente",
                "Desarrollos personalizados complejos fuera del alcance definido",
                "Predicción avanzada o machine learning sin base histórica suficiente",
                "Integraciones ERP / MES u otras plataformas en esta adopción inicial",
                "Automatización de acciones sobre equipos desde el dashboard",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-lg">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Cierre de propuesta
                </div>

                <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-black">
                  La recomendación es adoptar el Plan Base y construir desde
                  ahí.
                </h2>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                  Esta es la ruta más razonable en costo, tiempo y riesgo.
                  Permite a la planta empezar a medir de verdad, centralizar
                  información crítica y preparar una evolución ordenada hacia
                  alertas, reportes y capacidades avanzadas de Industria 4.0 sin
                  caer en la complejidad y costo de un SCADA tradicional.
                </p>
              </div>

              <div className="rounded-3xl bg-black p-6 text-white">
                <div className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Resumen comercial
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-sm text-gray-400">Setup inicial</div>
                    <div className="text-3xl font-extrabold">USD 1.650</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400">
                      Suscripción mensual
                    </div>
                    <div className="text-3xl font-extrabold">USD 100</div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-4 text-sm text-gray-300">
                    Plan Base · hasta 10 puntos · expansión modular por bloques.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
