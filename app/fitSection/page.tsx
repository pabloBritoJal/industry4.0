'use client';

import { useMemo, useState } from 'react';

type ViewKey =
  | 'all'
  | 'explanation'
  | 'nutrition'
  | 'gym'
  | 'exercises'
  | 'mobility'
  | 'tracking';

type Meal = {
  title: string;
  time: string;
  goal: string;
  items: string[];
};

type Exercise = {
  name: string;
  sets: string;
  rest: string;
  cue: string;
};

type GymDay = {
  day: string;
  title: string;
  focus: string;
  duration: string;
  warning?: string;
  exercises: Exercise[];
};

type ProgressMetric = {
  metric: string;
  frequency: string;
  target: string;
};

const views: Array<{ key: ViewKey; label: string; description: string }> = [
  {
    key: 'all',
    label: 'Todo',
    description: 'Plan completo',
  },
  {
    key: 'explanation',
    label: 'Explicación',
    description: 'Diagnóstico y estrategia',
  },
  {
    key: 'nutrition',
    label: 'Comida',
    description: 'Calorías, macros y comidas',
  },
  {
    key: 'gym',
    label: 'Gym',
    description: 'Rutina semanal completa',
  },
  {
    key: 'exercises',
    label: 'Ejercicios',
    description: 'Solo tablas de ejercicios',
  },
  {
    key: 'mobility',
    label: 'Movilidad',
    description: 'Casa, postura y fútbol',
  },
  {
    key: 'tracking',
    label: 'Control',
    description: 'Medición y ajustes',
  },
];

const profileStats = [
  { label: 'Edad', value: '41', unit: 'años' },
  { label: 'Altura', value: '187', unit: 'cm' },
  { label: 'Peso', value: '81', unit: 'kg' },
  { label: 'IMC', value: '23.2', unit: 'normal' },
];

const macroTargets = [
  { label: 'Calorías iniciales', value: '2,950–3,100 kcal/día' },
  { label: 'Proteína', value: '145–165 g/día' },
  { label: 'Carbohidratos', value: '330–400 g/día' },
  { label: 'Grasas', value: '80–105 g/día' },
  { label: 'Agua', value: '2.5–3.5 L/día + sudor' },
];

const weeklySchedule = [
  {
    day: 'Lunes',
    activity: 'Tren superior A + fútbol 20 min',
    intensity: 'Moderada',
  },
  {
    day: 'Martes',
    activity: 'Tren inferior A',
    intensity: 'Controlada',
  },
  {
    day: 'Miércoles',
    activity: 'Movilidad + fútbol de salón 90 min',
    intensity: 'Alta',
  },
  {
    day: 'Jueves',
    activity: 'Tren superior B',
    intensity: 'Progresiva',
  },
  {
    day: 'Viernes',
    activity: 'Tren inferior B',
    intensity: 'Fuerte',
  },
  {
    day: 'Sábado',
    activity: 'Caminata suave + movilidad',
    intensity: 'Baja',
  },
  {
    day: 'Domingo',
    activity: 'Descanso real',
    intensity: 'Recuperación',
  },
];

const meals: Meal[] = [
  {
    title: 'Desayuno',
    time: 'Mañana',
    goal: 'Alta proteína, energía estable y grasas buenas.',
    items: [
      '3 huevos enteros.',
      '100–150 g de claras si falta proteína.',
      '60–80 g de palta.',
      '40–60 g de queso blanco.',
      '2 rebanadas de pan de avena o integral.',
      '1 taza de café con leche sin azúcar.',
    ],
  },
  {
    title: 'Almuerzo',
    time: 'Mediodía',
    goal: 'Comida fuerte para sostener gym y fútbol.',
    items: [
      '180–220 g de pollo, pescado, pavo o carne magra.',
      '300–400 g de papa, camote, arroz, quinoa o pasta cocida.',
      'Ensalada grande con verduras variadas.',
      '1 cucharada de aceite de oliva.',
      '1 fruta en días de pierna o fútbol.',
    ],
  },
  {
    title: 'Merienda / pre-entreno',
    time: 'Tarde',
    goal: 'Carbohidrato útil y proteína antes del entrenamiento.',
    items: [
      '250 g de yogurt griego natural.',
      '1 plátano.',
      '150–250 g de papaya.',
      '40–60 g de avena.',
      '1 nuez de Brasil, no más de una al día de forma regular.',
    ],
  },
  {
    title: 'Cena obligatoria',
    time: 'Noche',
    goal: 'Recuperación muscular. Esta comida no debe saltarse.',
    items: [
      '180–220 g de pollo, pescado, carne magra, huevos o equivalente.',
      '250–350 g de papa, arroz, camote, pasta, quinoa o yuca.',
      '1–2 platos de verduras.',
      '1 cucharada de aceite de oliva o 60 g de palta.',
    ],
  },
];

const gymDays: GymDay[] = [
  {
    day: 'Lunes',
    title: 'Tren superior A',
    focus: 'Pecho, espalda, hombro y brazos',
    duration: '60–70 min',
    warning:
      'El fútbol de 20 minutos debe quedar recreativo o técnico. No convertirlo en una sesión brutal de sprints.',
    exercises: [
      {
        name: 'Press banca con mancuernas',
        sets: '3 x 6–10',
        rest: '2 min',
        cue: 'Bajada controlada, escápulas firmes.',
      },
      {
        name: 'Remo con pecho apoyado',
        sets: '3 x 8–12',
        rest: '2 min',
        cue: 'Pausar atrás, sin encoger hombros.',
      },
      {
        name: 'Press inclinado con mancuernas',
        sets: '2 x 8–12',
        rest: '90 s',
        cue: 'No arquear la zona lumbar.',
      },
      {
        name: 'Jalón al pecho agarre neutro',
        sets: '3 x 8–12',
        rest: '90 s',
        cue: 'Llevar codos hacia las costillas.',
      },
      {
        name: 'Press de hombro en máquina',
        sets: '2 x 8–10',
        rest: '90 s',
        cue: 'Sin dolor de hombro y sin compensar con espalda.',
      },
      {
        name: 'Face pull',
        sets: '2 x 12–20',
        rest: '60 s',
        cue: 'Priorizar hombro posterior y control.',
      },
      {
        name: 'Curl con barra Z',
        sets: '2 x 10–15',
        rest: '60 s',
        cue: 'Sin balanceo.',
      },
      {
        name: 'Tríceps en cuerda',
        sets: '2 x 10–15',
        rest: '60 s',
        cue: 'Codos fijos.',
      },
      {
        name: 'Dead bug',
        sets: '2 x 8–10 por lado',
        rest: '45 s',
        cue: 'Abdomen firme, sin despegar lumbar.',
      },
    ],
  },
  {
    day: 'Martes',
    title: 'Tren inferior A',
    focus: 'Pierna moderada antes del fútbol largo',
    duration: '55–65 min',
    warning:
      'No destruir las piernas. El miércoles hay fútbol de salón de 90 minutos.',
    exercises: [
      {
        name: 'Prensa inclinada',
        sets: '3 x 8–10',
        rest: '2–3 min',
        cue: 'Recorrido controlado, sin bloquear rodillas.',
      },
      {
        name: 'Peso muerto rumano con mancuernas',
        sets: '3 x 8–10',
        rest: '2 min',
        cue: 'Espalda neutra, tensión en isquios.',
      },
      {
        name: 'Zancada atrás',
        sets: '2 x 8 por pierna',
        rest: '90 s',
        cue: 'Rodilla estable, sin impulso.',
      },
      {
        name: 'Curl femoral sentado',
        sets: '2 x 10–15',
        rest: '90 s',
        cue: 'Pausa al contraer.',
      },
      {
        name: 'Gemelo de pie',
        sets: '3 x 10–15',
        rest: '60–90 s',
        cue: 'Recorrido completo.',
      },
      {
        name: 'Plancha lateral',
        sets: '2 x 30–45 s por lado',
        rest: '45 s',
        cue: 'Cadera alta.',
      },
      {
        name: 'Copenhagen plank corto',
        sets: '2 x 15–25 s por lado',
        rest: '45 s',
        cue: 'Rodilla apoyada, tensión controlada en aductores.',
      },
    ],
  },
  {
    day: 'Jueves',
    title: 'Tren superior B',
    focus: 'Espalda, pecho, hombro lateral y brazos',
    duration: '60–70 min',
    exercises: [
      {
        name: 'Jalón al pecho o dominada asistida',
        sets: '3 x 6–10',
        rest: '2 min',
        cue: 'Controlar la bajada.',
      },
      {
        name: 'Remo sentado en cable',
        sets: '3 x 8–12',
        rest: '2 min',
        cue: 'No encoger hombros.',
      },
      {
        name: 'Press banca en máquina o barra',
        sets: '3 x 6–10',
        rest: '2 min',
        cue: 'Escápulas firmes.',
      },
      {
        name: 'Landmine press',
        sets: '2 x 8–12',
        rest: '90 s',
        cue: 'Mejor control que press militar pesado.',
      },
      {
        name: 'Aperturas en cable o pec-deck',
        sets: '2 x 12–15',
        rest: '60–90 s',
        cue: 'Sin dolor anterior de hombro.',
      },
      {
        name: 'Elevaciones laterales',
        sets: '3 x 12–20',
        rest: '60 s',
        cue: 'Lento, sin impulso.',
      },
      {
        name: 'Reverse pec-deck',
        sets: '2 x 12–20',
        rest: '60 s',
        cue: 'Hombro posterior.',
      },
      {
        name: 'Curl inclinado',
        sets: '2 x 10–15',
        rest: '60 s',
        cue: 'Control completo.',
      },
      {
        name: 'Tríceps sobre cabeza en cuerda',
        sets: '2 x 10–15',
        rest: '60 s',
        cue: 'Estirar bien sin mover los codos.',
      },
      {
        name: 'Farmer carry',
        sets: '3 x 30–40 m',
        rest: '60–90 s',
        cue: 'Tronco firme, postura alta.',
      },
    ],
  },
  {
    day: 'Viernes',
    title: 'Tren inferior B',
    focus: 'Pierna más fuerte y glúteo/isquios',
    duration: '60–75 min',
    warning:
      'Este día puede ser más intenso porque hay más margen de recuperación antes del siguiente fútbol largo.',
    exercises: [
      {
        name: 'Hip thrust',
        sets: '3 x 6–10',
        rest: '2–3 min',
        cue: 'Pausa arriba, no hiperextender lumbar.',
      },
      {
        name: 'Sentadilla goblet pesada o hack squat',
        sets: '3 x 8–10',
        rest: '2 min',
        cue: 'Técnica limpia antes que carga.',
      },
      {
        name: 'Curl femoral sentado',
        sets: '3 x 10–12',
        rest: '90 s',
        cue: 'Control excéntrico.',
      },
      {
        name: 'Bulgarian split squat',
        sets: '2 x 8 por pierna',
        rest: '90 s',
        cue: 'No colapsar la rodilla.',
      },
      {
        name: 'Extensión de cuádriceps',
        sets: '2 x 12–15',
        rest: '60–90 s',
        cue: 'Pausa arriba.',
      },
      {
        name: 'Aductor en máquina',
        sets: '2 x 12–15',
        rest: '60–90 s',
        cue: 'Sin rebotes.',
      },
      {
        name: 'Gemelo sentado',
        sets: '3 x 8–15',
        rest: '60–90 s',
        cue: 'Estirar abajo.',
      },
      {
        name: 'Cable chop',
        sets: '2 x 10–12 por lado',
        rest: '45–60 s',
        cue: 'Rotación controlada.',
      },
      {
        name: 'Nordic hamstring asistido, desde semana 3',
        sets: '2 x 4–6',
        rest: '90 s',
        cue: 'Parcial, técnico, sin buscar fallo.',
      },
    ],
  },
];

const mobilityRoutine = [
  { name: 'Cat-camel', volume: '8 reps' },
  { name: 'Open book torácico', volume: '8 por lado' },
  { name: '90/90 de cadera', volume: '8 por lado' },
  { name: 'Couch stretch', volume: '45 s por lado' },
  { name: 'Movilidad de tobillo contra pared', volume: '12 por lado' },
  { name: 'Puente de glúteo', volume: '12 reps' },
  { name: 'Dead bug', volume: '8 por lado' },
  { name: 'Sentadilla profunda sostenida', volume: '45–60 s' },
];

const footballWarmup = [
  'Trote suave: 3 minutos.',
  'Skipping bajo: 2 x 20 m.',
  'Desplazamiento lateral: 2 x 20 m.',
  'Zancadas caminando: 8 por lado.',
  'Balanceos de pierna: 10 por lado.',
  'Sentadilla con peso corporal: 10 reps.',
  'Equilibrio a una pierna: 20 s por lado.',
  'Aceleraciones progresivas: 3 x 10–20 m.',
];

const progressMetrics: ProgressMetric[] = [
  {
    metric: 'Peso corporal',
    frequency: '3 mañanas por semana',
    target: 'Subir 0.2–0.4 kg/semana',
  },
  {
    metric: 'Promedio semanal de peso',
    frequency: '1 vez por semana',
    target: 'Ajustar calorías según tendencia',
  },
  {
    metric: 'Cintura a la altura del ombligo',
    frequency: 'Cada 2 semanas',
    target: 'Evitar aumento rápido',
  },
  {
    metric: 'Cargas y repeticiones',
    frequency: 'Cada sesión',
    target: 'Progresar sin romper técnica',
  },
  {
    metric: 'Sueño',
    frequency: 'Diario',
    target: 'Recuperación suficiente',
  },
  {
    metric: 'Dolor articular',
    frequency: 'Diario',
    target: 'No permitir dolor persistente +48 h',
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-24', className)}>
      <div className="mb-5">
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Pill({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'green' | 'amber' | 'red';
}) {
  const styles = {
    default: 'border-white/10 bg-white/10 text-zinc-200',
    green: 'border-lime-400/30 bg-lime-400/10 text-lime-200',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    red: 'border-red-400/30 bg-red-400/10 text-red-200',
  };

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-3 py-1 text-xs font-bold',
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}

function ExerciseTable({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="hidden grid-cols-[1.3fr_0.7fr_0.6fr_1.4fr] gap-4 border-b border-white/10 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 md:grid">
        <span>Ejercicio</span>
        <span>Series</span>
        <span>Descanso</span>
        <span>Clave técnica</span>
      </div>

      <div className="divide-y divide-white/10">
        {exercises.map((exercise) => (
          <div
            key={`${exercise.name}-${exercise.sets}`}
            className="grid gap-3 px-4 py-4 text-sm text-zinc-200 md:grid-cols-[1.3fr_0.7fr_0.6fr_1.4fr] md:gap-4"
          >
            <div>
              <p className="font-bold text-white">{exercise.name}</p>
              <p className="mt-1 text-xs text-zinc-500 md:hidden">
                {exercise.sets} · {exercise.rest}
              </p>
            </div>

            <p className="hidden font-semibold text-lime-200 md:block">
              {exercise.sets}
            </p>

            <p className="hidden text-zinc-300 md:block">{exercise.rest}</p>

            <p className="leading-relaxed text-zinc-400">{exercise.cue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FitnessPlanPage() {
  const [activeView, setActiveView] = useState<ViewKey>('all');

  const activeViewData = useMemo(
    () => views.find((view) => view.key === activeView),
    [activeView],
  );

  const show = (key: ViewKey) => activeView === 'all' || activeView === key;

  const showExercisesOnly = activeView === 'exercises';

  return (
    <main className="min-h-screen bg-[#070a08] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-lime-500/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-[-15%] right-[-10%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <Pill tone="green">Plan fit 12 semanas</Pill>
                <Pill>4 días gym</Pill>
                <Pill>2 sesiones fútbol</Pill>
                <Pill>Responsive</Pill>
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Plan de gimnasio, nutrición y movilidad
                <span className="block bg-gradient-to-r from-lime-300 via-emerald-300 to-white bg-clip-text text-transparent">
                  para ganar músculo sin romper recuperación.
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
                Hombre de 41 años, 187 cm, 81 kg, casi principiante, con fútbol
                de salón lunes y miércoles. El enfoque correcto es fuerza bien
                distribuida, cena obligatoria, carbohidratos suficientes y
                control semanal de progreso.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {profileStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-lime-300">{stat.unit}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-lime-400/20 bg-lime-400/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-lime-300">
                Decisión principal
              </p>
              <h2 className="mt-3 text-3xl font-black text-white">
                4 días de gimnasio, no 5.
              </h2>
              <p className="mt-4 leading-7 text-zinc-300">
                El quinto estímulo ya existe: fútbol de salón. Aumentar a 5
                sesiones de pesas en este momento subiría la fatiga más rápido
                que la ganancia muscular.
              </p>

              <div className="mt-6 rounded-2xl bg-black/30 p-4">
                <p className="text-sm font-bold text-zinc-300">
                  Objetivo de peso
                </p>
                <p className="mt-1 text-2xl font-black text-lime-300">
                  +0.2 a +0.4 kg/semana
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Si en 14 días no sube el promedio, añadir 150–200 kcal/día.
                  Si sube cintura rápido sin fuerza, restar 150–200 kcal/día.
                </p>
              </div>
            </aside>
          </div>
        </header>

        <nav className="sticky top-3 z-20 mt-5 rounded-3xl border border-white/10 bg-[#070a08]/85 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex gap-2 overflow-x-auto p-1">
            {views.map((view) => {
              const isActive = activeView === view.key;

              return (
                <button
                  key={view.key}
                  type="button"
                  onClick={() => setActiveView(view.key)}
                  className={cn(
                    'min-w-fit rounded-2xl px-4 py-3 text-left transition',
                    isActive
                      ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20'
                      : 'bg-white/[0.06] text-zinc-300 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <span className="block text-sm font-black">{view.label}</span>
                  <span
                    className={cn(
                      'block text-xs',
                      isActive ? 'text-black/70' : 'text-zinc-500',
                    )}
                  >
                    {view.description}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
          Vista activa:{' '}
          <strong className="text-lime-300">
            {activeViewData?.label ?? 'Todo'}
          </strong>
          <span className="text-zinc-500"> · </span>
          {activeViewData?.description}
        </div>

        <div className="mt-10 space-y-14">
          {show('explanation') && !showExercisesOnly ? (
            <Section
              id="explicacion"
              eyebrow="Estrategia"
              title="Diagnóstico y lógica del plan"
            >
              <div className="grid gap-5 lg:grid-cols-3">
                <GlassCard className="lg:col-span-2">
                  <h3 className="text-xl font-black text-white">
                    El objetivo no es bajar peso: es ganar músculo con mínima
                    grasa.
                  </h3>
                  <p className="mt-4 leading-8 text-zinc-300">
                    Con 187 cm y 81 kg, el peso está en un rango normal. El
                    problema no es exceso de peso; el problema probable es falta
                    de masa muscular, inconsistencia alimentaria nocturna y
                    progresión irregular en el gimnasio.
                  </p>
                  <p className="mt-4 leading-8 text-zinc-300">
                    La etiqueta “ectomorfo” no debe mandar el programa. Sirve
                    como referencia visual, pero el plan real se ajusta por
                    peso, cintura, cargas, recuperación, sueño y rendimiento en
                    fútbol.
                  </p>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Regla crítica
                  </h3>
                  <p className="mt-4 text-3xl font-black text-lime-300">
                    No saltarse la cena.
                  </p>
                  <p className="mt-4 leading-7 text-zinc-400">
                    Para ganar músculo y recuperarse del fútbol, la cena debe
                    ser parte fija del sistema, no una comida aleatoria.
                  </p>
                </GlassCard>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {macroTargets.map((macro) => (
                  <GlassCard key={macro.label}>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                      {macro.label}
                    </p>
                    <p className="mt-3 text-lg font-black text-white">
                      {macro.value}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </Section>
          ) : null}

          {show('nutrition') && !showExercisesOnly ? (
            <Section
              id="comida"
              eyebrow="Nutrición"
              title="Comida ideal para ganar músculo"
            >
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Macros diarios
                  </h3>

                  <div className="mt-5 space-y-3">
                    {macroTargets.map((macro) => (
                      <div
                        key={macro.label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-black/30 p-4"
                      >
                        <span className="text-sm font-semibold text-zinc-400">
                          {macro.label}
                        </span>
                        <span className="text-right text-sm font-black text-lime-300">
                          {macro.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                    <p className="font-black text-amber-200">
                      Corrección del fin de semana
                    </p>
                    <p className="mt-2 leading-7 text-zinc-300">
                      Máximo 2 comidas libres entre sábado y domingo. No dos
                      días libres completos. Elegir dos: pollo frito, pique
                      macho o salteña. No los tres como hábito.
                    </p>
                  </div>
                </GlassCard>

                <div className="grid gap-5 md:grid-cols-2">
                  {meals.map((meal) => (
                    <GlassCard key={meal.title}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-300">
                            {meal.time}
                          </p>
                          <h3 className="mt-2 text-xl font-black text-white">
                            {meal.title}
                          </h3>
                        </div>
                        {meal.title.includes('Cena') ? (
                          <Pill tone="red">Obligatoria</Pill>
                        ) : null}
                      </div>

                      <p className="mt-3 leading-7 text-zinc-400">
                        {meal.goal}
                      </p>

                      <ul className="mt-4 space-y-3">
                        {meal.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-zinc-300"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  ))}
                </div>
              </div>

              <GlassCard className="mt-5">
                <h3 className="text-xl font-black text-white">
                  Miércoles: día de fútbol de salón de 90 minutos
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-black/30 p-4">
                    <p className="font-black text-lime-300">3–4 h antes</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      180–220 g de proteína + 350–450 g de papa, arroz o pasta
                      cocida + verduras moderadas.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/30 p-4">
                    <p className="font-black text-lime-300">60–90 min antes</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      1 plátano + yogurt griego o pan de avena con queso blanco
                      + agua.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/30 p-4">
                    <p className="font-black text-lime-300">Después</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Cena completa: proteína, carbohidrato abundante, verduras
                      y reposición de agua.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Section>
          ) : null}

          {show('gym') && !showExercisesOnly ? (
            <Section
              id="gym"
              eyebrow="Entrenamiento"
              title="Distribución semanal de gimnasio"
            >
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Semana recomendada
                  </h3>

                  <div className="mt-5 space-y-3">
                    {weeklySchedule.map((item) => (
                      <div
                        key={item.day}
                        className="grid gap-2 rounded-2xl border border-white/10 bg-black/30 p-4 sm:grid-cols-[90px_1fr_auto]"
                      >
                        <p className="font-black text-white">{item.day}</p>
                        <p className="text-sm text-zinc-300">
                          {item.activity}
                        </p>
                        <Pill
                          tone={
                            item.intensity === 'Alta'
                              ? 'red'
                              : item.intensity === 'Fuerte'
                                ? 'amber'
                                : item.intensity === 'Recuperación'
                                  ? 'green'
                                  : 'default'
                          }
                        >
                          {item.intensity}
                        </Pill>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Reglas de intensidad
                  </h3>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/30 p-4">
                      <p className="font-black text-lime-300">Semanas 1–2</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        RIR 3. Terminar cada serie con 3 repeticiones en
                        reserva. Técnica limpia.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/30 p-4">
                      <p className="font-black text-lime-300">Semanas 3–8</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        RIR 2 en básicos. Accesorios pueden llegar a RIR 1.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/30 p-4">
                      <p className="font-black text-lime-300">Semana 9</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        Descarga: reducir volumen 30% y carga 10%.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/30 p-4">
                      <p className="font-black text-lime-300">Semanas 10–12</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        Consolidar progresión. No fallar en ejercicios básicos.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
                    <p className="font-black text-lime-200">
                      Regla de progresión
                    </p>
                    <p className="mt-2 leading-7 text-zinc-300">
                      Cuando completes el rango alto de repeticiones en todas
                      las series con técnica limpia, sube peso la siguiente
                      sesión: 2–5% en tren superior y 5–10% en tren inferior.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </Section>
          ) : null}

          {(show('gym') || showExercisesOnly) && (
            <Section
              id="ejercicios"
              eyebrow="Rutinas"
              title={
                showExercisesOnly
                  ? 'Solo ejercicios del plan'
                  : 'Rutina detallada por día'
              }
            >
              <div className="space-y-6">
                {gymDays.map((day) => (
                  <GlassCard key={day.title}>
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-300">
                          {day.day}
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-white">
                          {day.title}
                        </h3>
                        <p className="mt-2 text-zinc-400">{day.focus}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Pill>{day.duration}</Pill>
                        {day.warning ? <Pill tone="amber">Precaución</Pill> : null}
                      </div>
                    </div>

                    {day.warning ? (
                      <div className="mb-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                        {day.warning}
                      </div>
                    ) : null}

                    <ExerciseTable exercises={day.exercises} />
                  </GlassCard>
                ))}
              </div>
            </Section>
          )}

          {show('mobility') && !showExercisesOnly ? (
            <Section
              id="movilidad"
              eyebrow="Movilidad"
              title="Trabajo en casa, postura y calentamiento"
            >
              <div className="grid gap-5 lg:grid-cols-3">
                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Pausas por trabajo sentado
                  </h3>
                  <p className="mt-3 leading-7 text-zinc-400">
                    Cada 60–90 minutos levantarse 2–3 minutos. Esto no reemplaza
                    al gimnasio; corrige el costo de estar sentado 8 horas.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      '10 sentadillas sin peso.',
                      '15 retracciones escapulares.',
                      '15 elevaciones de talón.',
                      '30 s de estiramiento de flexor de cadera por lado.',
                      '2–3 min de caminata por casa.',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-black/30 p-3 text-sm text-zinc-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Rutina diaria de movilidad
                  </h3>

                  <div className="mt-5 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
                    {mobilityRoutine.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <span className="text-sm font-semibold text-white">
                          {item.name}
                        </span>
                        <span className="text-right text-sm text-lime-300">
                          {item.volume}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Calentamiento para fútbol
                  </h3>

                  <ol className="mt-5 space-y-3">
                    {footballWarmup.map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm text-zinc-300">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-black">
                          {index + 1}
                        </span>
                        <span className="pt-1 leading-6">{item}</span>
                      </li>
                    ))}
                  </ol>
                </GlassCard>
              </div>
            </Section>
          ) : null}

          {show('tracking') && !showExercisesOnly ? (
            <Section
              id="control"
              eyebrow="Seguimiento"
              title="Control de progreso y ajustes"
            >
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Métricas obligatorias
                  </h3>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                    <div className="hidden grid-cols-3 gap-4 border-b border-white/10 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 md:grid">
                      <span>Métrica</span>
                      <span>Frecuencia</span>
                      <span>Objetivo</span>
                    </div>

                    <div className="divide-y divide-white/10">
                      {progressMetrics.map((item) => (
                        <div
                          key={item.metric}
                          className="grid gap-2 px-4 py-4 text-sm md:grid-cols-3 md:gap-4"
                        >
                          <p className="font-bold text-white">{item.metric}</p>
                          <p className="text-zinc-400">{item.frequency}</p>
                          <p className="text-lime-300">{item.target}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-xl font-black text-white">
                    Señales de alerta
                  </h3>

                  <div className="mt-5 space-y-3">
                    {[
                      'Se salta cenas.',
                      'No sube peso en 2 semanas.',
                      'El martes destruye las piernas para el miércoles.',
                      'El fin de semana se convierte en exceso sin control.',
                      'Dolor lumbar, rodilla, aductor u hombro por más de 48 horas.',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
                    <p className="font-black text-lime-200">
                      Señal de que el plan funciona
                    </p>
                    <p className="mt-2 leading-7 text-zinc-300">
                      Sube 0.2–0.4 kg por semana, mejora cargas o repeticiones,
                      la cintura no sube rápido y llega funcional al fútbol del
                      miércoles.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </Section>
          ) : null}

          {activeView === 'all' ? (
            <Section eyebrow="Resumen" title="Decisión final">
              <GlassCard className="border-lime-400/20 bg-lime-400/10">
                <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                  <div>
                    <p className="text-4xl font-black text-lime-300">
                      4 días
                    </p>
                    <p className="mt-2 text-xl font-black text-white">
                      Gym lunes, martes, jueves y viernes.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      'Cena obligatoria todos los días.',
                      'Aproximadamente 3,000 kcal iniciales.',
                      '145–165 g de proteína diaria.',
                      'Carbohidratos suficientes para gym y fútbol.',
                      'Máximo 2 comidas libres el fin de semana.',
                      'Creatina monohidratada 5 g/día.',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-black/30 p-4 text-sm font-semibold text-zinc-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Section>
          ) : null}
        </div>
      </div>
    </main>
  );
}