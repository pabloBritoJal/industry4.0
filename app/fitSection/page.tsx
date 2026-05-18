'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';

type TabKey =
  | 'all'
  | 'diagnosis'
  | 'nutrition'
  | 'gym'
  | 'exercises'
  | 'mobility'
  | 'tracking';

type Tone = 'neutral' | 'green' | 'amber' | 'red' | 'blue';

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

const tabs: Array<{
  key: TabKey;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    key: 'all',
    label: 'Todo',
    shortLabel: 'Todo',
    description: 'Plan completo',
  },
  {
    key: 'diagnosis',
    label: 'Diagnóstico',
    shortLabel: 'Diag.',
    description: 'Explicación y estrategia',
  },
  {
    key: 'nutrition',
    label: 'Comida',
    shortLabel: 'Comida',
    description: 'Calorías, macros y comidas',
  },
  {
    key: 'gym',
    label: 'Gym',
    shortLabel: 'Gym',
    description: 'Rutina semanal',
  },
  {
    key: 'exercises',
    label: 'Ejercicios',
    shortLabel: 'Ejer.',
    description: 'Solo ejercicios',
  },
  {
    key: 'mobility',
    label: 'Movilidad',
    shortLabel: 'Mov.',
    description: 'Casa y fútbol',
  },
  {
    key: 'tracking',
    label: 'Control',
    shortLabel: 'Ctrl.',
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
  { label: 'Calorías', value: '2,950–3,100 kcal/día' },
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
    tone: 'blue' as Tone,
  },
  {
    day: 'Martes',
    activity: 'Tren inferior A',
    intensity: 'Controlada',
    tone: 'neutral' as Tone,
  },
  {
    day: 'Miércoles',
    activity: 'Movilidad + fútbol de salón 90 min',
    intensity: 'Alta',
    tone: 'red' as Tone,
  },
  {
    day: 'Jueves',
    activity: 'Tren superior B',
    intensity: 'Progresiva',
    tone: 'green' as Tone,
  },
  {
    day: 'Viernes',
    activity: 'Tren inferior B',
    intensity: 'Fuerte',
    tone: 'amber' as Tone,
  },
  {
    day: 'Sábado',
    activity: 'Caminata suave + movilidad',
    intensity: 'Baja',
    tone: 'neutral' as Tone,
  },
  {
    day: 'Domingo',
    activity: 'Descanso real',
    intensity: 'Recuperación',
    tone: 'green' as Tone,
  },
];

const meals = [
  {
    title: 'Desayuno',
    tag: 'Mañana',
    goal: 'Proteína alta, energía estable y grasas buenas.',
    items: [
      '3 huevos enteros.',
      '100–150 g de claras si falta proteína.',
      '60–80 g de palta.',
      '40–60 g de queso blanco.',
      '2 rebanadas de pan de avena o integral.',
      'Café con leche sin azúcar.',
    ],
  },
  {
    title: 'Almuerzo',
    tag: 'Mediodía',
    goal: 'Comida fuerte para sostener gimnasio y fútbol.',
    items: [
      '180–220 g de pollo, pescado, pavo o carne magra.',
      '300–400 g de papa, camote, arroz, quinoa o pasta cocida.',
      'Ensalada grande.',
      '1 cucharada de aceite de oliva.',
      '1 fruta en días de pierna o fútbol.',
    ],
  },
  {
    title: 'Merienda / pre-entreno',
    tag: 'Tarde',
    goal: 'Carbohidrato útil y proteína antes del entrenamiento.',
    items: [
      '250 g de yogurt griego natural.',
      '1 plátano.',
      '150–250 g de papaya.',
      '40–60 g de avena.',
      '1 nuez de Brasil. No usar varias al día.',
    ],
  },
  {
    title: 'Cena obligatoria',
    tag: 'Noche',
    goal: 'Recuperación muscular. No debe saltarse.',
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
      'El fútbol de 20 minutos debe quedar recreativo o técnico. No convertirlo en una guerra de sprints.',
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
        cue: 'Codos hacia costillas.',
      },
      {
        name: 'Press de hombro en máquina',
        sets: '2 x 8–10',
        rest: '90 s',
        cue: 'Sin dolor de hombro.',
      },
      {
        name: 'Face pull',
        sets: '2 x 12–20',
        rest: '60 s',
        cue: 'Hombro posterior y control.',
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
        cue: 'Abdomen firme.',
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
        cue: 'Recorrido controlado.',
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
        cue: 'Rodilla estable.',
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
        cue: 'Rodilla apoyada, tensión controlada.',
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
        cue: 'Estirar bien.',
      },
      {
        name: 'Farmer carry',
        sets: '3 x 30–40 m',
        rest: '60–90 s',
        cue: 'Tronco firme.',
      },
    ],
  },
  {
    day: 'Viernes',
    title: 'Tren inferior B',
    focus: 'Pierna más fuerte, glúteo e isquios',
    duration: '60–75 min',
    warning:
      'Este día puede ser más intenso porque hay más margen de recuperación antes del siguiente fútbol largo.',
    exercises: [
      {
        name: 'Hip thrust',
        sets: '3 x 6–10',
        rest: '2–3 min',
        cue: 'Pausa arriba, sin hiperextender lumbar.',
      },
      {
        name: 'Sentadilla goblet pesada o hack squat',
        sets: '3 x 8–10',
        rest: '2 min',
        cue: 'Técnica antes que carga.',
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
        cue: 'No colapsar rodilla.',
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
        name: 'Nordic hamstring asistido desde semana 3',
        sets: '2 x 4–6',
        rest: '90 s',
        cue: 'Parcial, técnico, sin fallo.',
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

const progressMetrics = [
  {
    metric: 'Peso corporal',
    frequency: '3 mañanas por semana',
    target: 'Subir 0.2–0.4 kg/semana',
  },
  {
    metric: 'Promedio semanal',
    frequency: '1 vez por semana',
    target: 'Ajustar calorías según tendencia',
  },
  {
    metric: 'Cintura',
    frequency: 'Cada 2 semanas',
    target: 'Evitar subida rápida',
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

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const styles: Record<Tone, string> = {
    neutral: 'border-white/10 bg-white/10 text-zinc-200',
    green: 'border-lime-400/30 bg-lime-400/10 text-lime-200',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-100',
    red: 'border-red-400/30 bg-red-400/10 text-red-100',
    blue: 'border-sky-400/30 bg-sky-400/10 text-sky-100',
  };

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wide',
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 backdrop-blur md:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <div className="mb-4 md:mb-6">
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-lime-300">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-black leading-tight tracking-tight text-white md:text-4xl">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function TabButton({
  tab,
  active,
  onClick,
  compact = false,
}: {
  tab: (typeof tabs)[number];
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'rounded-2xl border text-left font-black transition active:scale-[0.98]',
        compact
          ? 'min-w-[74px] snap-start px-3 py-2 text-center text-xs'
          : 'w-full px-3 py-3 md:px-4',
        active
          ? 'border-lime-300 bg-lime-300 text-black shadow-lg shadow-lime-400/20'
          : 'border-white/10 bg-white/[0.07] text-zinc-200 hover:bg-white/10',
      )}
    >
      <span className="block leading-none">
        {compact ? tab.shortLabel : tab.label}
      </span>

      {!compact ? (
        <span
          className={cx(
            'mt-1 block text-[11px] font-semibold leading-snug',
            active ? 'text-black/65' : 'text-zinc-500',
          )}
        >
          {tab.description}
        </span>
      ) : null}
    </button>
  );
}

function ExerciseList({ exercises }: { exercises: Exercise[] }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {exercises.map((exercise) => (
          <div
            key={`${exercise.name}-${exercise.sets}`}
            className="rounded-2xl border border-white/10 bg-black/25 p-4"
          >
            <p className="text-base font-black leading-snug text-white">
              {exercise.name}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="green">{exercise.sets}</Badge>
              <Badge>{exercise.rest}</Badge>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {exercise.cue}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-white/10 md:block">
        <div className="grid grid-cols-[1.2fr_0.55fr_0.55fr_1.4fr] gap-4 border-b border-white/10 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
          <span>Ejercicio</span>
          <span>Series</span>
          <span>Descanso</span>
          <span>Clave técnica</span>
        </div>

        <div className="divide-y divide-white/10">
          {exercises.map((exercise) => (
            <div
              key={`${exercise.name}-${exercise.sets}`}
              className="grid grid-cols-[1.2fr_0.55fr_0.55fr_1.4fr] gap-4 px-4 py-4 text-sm"
            >
              <p className="font-bold text-white">{exercise.name}</p>
              <p className="font-black text-lime-300">{exercise.sets}</p>
              <p className="text-zinc-300">{exercise.rest}</p>
              <p className="leading-6 text-zinc-400">{exercise.cue}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function FitnessPlanPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const contentRef = useRef<HTMLDivElement | null>(null);

  const activeTabData = useMemo(
    () => tabs.find((tab) => tab.key === activeTab),
    [activeTab],
  );

  const isVisible = (key: TabKey) => activeTab === 'all' || activeTab === key;

  const changeTab = (key: TabKey) => {
    setActiveTab(key);

    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060806] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lime-500/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl md:h-96 md:w-96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-3 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-4 sm:px-5 md:px-8 md:pb-12">
        <header className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur md:rounded-[2.5rem] md:p-8 lg:p-10">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge tone="green">Plan fit 12 semanas</Badge>
                <Badge>4 días gym</Badge>
                <Badge>2 fútbol</Badge>
              </div>

              <h1 className="max-w-4xl text-[2rem] font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Plan de gimnasio, nutrición y movilidad
                <span className="block bg-gradient-to-r from-lime-300 via-emerald-300 to-white bg-clip-text text-transparent">
                  para ganar músculo sin romper recuperación.
                </span>
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base md:text-lg md:leading-8">
                Hombre de 41 años, 187 cm, 81 kg, casi principiante, con fútbol
                de salón lunes y miércoles. El enfoque correcto es fuerza bien
                distribuida, cena obligatoria, carbohidratos suficientes y
                control semanal de progreso.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {profileStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-0 rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-black text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm font-bold text-lime-300">
                      {stat.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-lime-400/20 bg-lime-400/10">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-lime-300">
                Decisión principal
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
                4 días de gimnasio, no 5.
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                El quinto estímulo ya existe: fútbol de salón. Aumentar a 5
                sesiones de pesas en este momento subiría la fatiga más rápido
                que la ganancia muscular.
              </p>

              <div className="mt-5 rounded-2xl bg-black/30 p-4">
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
            </Card>
          </div>
        </header>

        <section className="mt-4 rounded-[1.6rem] border border-white/10 bg-[#090d09]/90 p-3 shadow-xl shadow-black/25 backdrop-blur md:sticky md:top-3 md:z-40">
          <p className="mb-3 px-1 text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500">
            Mostrar contenido
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                tab={tab}
                active={activeTab === tab.key}
                onClick={() => changeTab(tab.key)}
              />
            ))}
          </div>
        </section>

        <div
          ref={contentRef}
          className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-zinc-300"
        >
          Vista activa:{' '}
          <strong className="text-lime-300">
            {activeTabData?.label ?? 'Todo'}
          </strong>
          <span className="text-zinc-500"> · </span>
          {activeTabData?.description}
        </div>

        <div className="mt-8 space-y-12 md:mt-12 md:space-y-16">
          {isVisible('diagnosis') && activeTab !== 'exercises' ? (
            <Section eyebrow="Estrategia" title="Diagnóstico y lógica del plan">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <h3 className="text-xl font-black leading-tight text-white md:text-2xl">
                    El objetivo no es bajar peso: es ganar músculo con mínima
                    grasa.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base md:leading-8">
                    Con 187 cm y 81 kg, el peso está en rango normal. El
                    problema probable no es exceso de peso, sino falta de masa
                    muscular, cena irregular y progresión inconsistente en el
                    gimnasio.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base md:leading-8">
                    La etiqueta “ectomorfo” sirve como referencia visual, pero
                    no debe mandar el programa. El plan se ajusta por peso,
                    cintura, cargas, sueño, recuperación y rendimiento en
                    fútbol.
                  </p>
                </Card>

                <Card className="border-red-400/20 bg-red-400/10">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-200">
                    Punto crítico
                  </p>

                  <h3 className="mt-3 text-3xl font-black leading-tight text-white">
                    No saltarse la cena.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    Para ganar músculo y recuperarse del fútbol, la cena debe
                    ser parte fija del sistema, no una comida aleatoria.
                  </p>
                </Card>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {macroTargets.map((macro) => (
                  <Card key={macro.label}>
                    <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                      {macro.label}
                    </p>
                    <p className="mt-2 text-lg font-black leading-snug text-white">
                      {macro.value}
                    </p>
                  </Card>
                ))}
              </div>
            </Section>
          ) : null}

          {isVisible('nutrition') && activeTab !== 'exercises' ? (
            <Section eyebrow="Nutrición" title="Comida ideal">
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <Card>
                  <h3 className="text-xl font-black text-white">
                    Objetivos diarios
                  </h3>

                  <div className="mt-4 space-y-3">
                    {macroTargets.map((macro) => (
                      <div
                        key={macro.label}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4"
                      >
                        <p className="text-xs font-black uppercase tracking-wider text-zinc-500">
                          {macro.label}
                        </p>
                        <p className="mt-1 text-base font-black text-lime-300">
                          {macro.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                    <p className="font-black text-amber-100">
                      Fin de semana
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      Máximo 2 comidas libres entre sábado y domingo. Elegir dos:
                      pollo frito, pique macho o salteña. No los tres como
                      hábito.
                    </p>
                  </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  {meals.map((meal) => (
                    <Card
                      key={meal.title}
                      className={
                        meal.title.includes('Cena')
                          ? 'border-lime-400/25 bg-lime-400/10'
                          : undefined
                      }
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-lime-300">
                            {meal.tag}
                          </p>
                          <h3 className="mt-2 text-xl font-black leading-tight text-white">
                            {meal.title}
                          </h3>
                        </div>

                        {meal.title.includes('Cena') ? (
                          <Badge tone="green">Fija</Badge>
                        ) : null}
                      </div>

                      <p className="mt-3 text-sm leading-6 text-zinc-400">
                        {meal.goal}
                      </p>

                      <ul className="mt-4 space-y-3">
                        {meal.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-zinc-300"
                          >
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lime-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="mt-4">
                <h3 className="text-xl font-black text-white">
                  Miércoles: fútbol de salón de 90 minutos
                </h3>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="font-black text-lime-300">3–4 h antes</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      180–220 g de proteína + 350–450 g de papa, arroz o pasta
                      cocida + verduras moderadas.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="font-black text-lime-300">60–90 min antes</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      1 plátano + yogurt griego o pan de avena con queso blanco
                      + agua.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="font-black text-lime-300">Después</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Cena completa: proteína, carbohidrato, verduras y agua.
                    </p>
                  </div>
                </div>
              </Card>
            </Section>
          ) : null}

          {isVisible('gym') && activeTab !== 'exercises' ? (
            <Section eyebrow="Entrenamiento" title="Distribución semanal">
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <Card>
                  <h3 className="text-xl font-black text-white">
                    Semana recomendada
                  </h3>

                  <div className="mt-4 space-y-3">
                    {weeklySchedule.map((item) => (
                      <div
                        key={item.day}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-black text-white">{item.day}</p>
                          <Badge tone={item.tone}>{item.intensity}</Badge>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          {item.activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-black text-white">
                    Reglas de intensidad
                  </h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">Semanas 1–2</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        RIR 3. Terminar cada serie con 3 repeticiones en
                        reserva.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">Semanas 3–8</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        RIR 2 en básicos. Accesorios pueden llegar a RIR 1.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">Semana 9</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        Descarga: reducir volumen 30% y carga 10%.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">Semanas 10–12</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        Consolidar progresión. No fallar en básicos.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
                    <p className="font-black text-lime-200">
                      Regla de progresión
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      Cuando completes el rango alto de repeticiones en todas
                      las series con técnica limpia, sube peso la siguiente
                      sesión: 2–5% en tren superior y 5–10% en tren inferior.
                    </p>
                  </div>
                </Card>
              </div>
            </Section>
          ) : null}

          {(isVisible('gym') || activeTab === 'exercises') && (
            <Section
              eyebrow="Rutinas"
              title={
                activeTab === 'exercises'
                  ? 'Solo ejercicios del plan'
                  : 'Rutina detallada por día'
              }
            >
              <div className="space-y-4 md:space-y-6">
                {gymDays.map((day) => (
                  <Card key={day.title}>
                    <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-lime-300">
                          {day.day}
                        </p>
                        <h3 className="mt-2 text-2xl font-black leading-tight text-white">
                          {day.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          {day.focus}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge>{day.duration}</Badge>
                        {day.warning ? <Badge tone="amber">Precaución</Badge> : null}
                      </div>
                    </div>

                    {day.warning ? (
                      <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                        {day.warning}
                      </div>
                    ) : null}

                    <ExerciseList exercises={day.exercises} />
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {isVisible('mobility') && activeTab !== 'exercises' ? (
            <Section eyebrow="Movilidad" title="Casa, postura y fútbol">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card>
                  <h3 className="text-xl font-black text-white">
                    Pausas por trabajo sentado
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Cada 60–90 minutos levantarse 2–3 minutos. Esto no reemplaza
                    al gimnasio; corrige el costo de estar sentado 8 horas.
                  </p>

                  <div className="mt-4 space-y-3">
                    {[
                      '10 sentadillas sin peso.',
                      '15 retracciones escapulares.',
                      '15 elevaciones de talón.',
                      '30 s de estiramiento de flexor de cadera por lado.',
                      '2–3 min de caminata por casa.',
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-black/25 p-3 text-sm leading-6 text-zinc-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-black text-white">
                    Rutina diaria
                  </h3>

                  <div className="mt-4 space-y-3">
                    {mobilityRoutine.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4"
                      >
                        <span className="text-sm font-bold text-white">
                          {item.name}
                        </span>
                        <span className="text-right text-sm font-black text-lime-300">
                          {item.volume}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-black text-white">
                    Calentamiento fútbol
                  </h3>

                  <ol className="mt-4 space-y-3">
                    {footballWarmup.map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm text-zinc-300">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-300 text-xs font-black text-black">
                          {index + 1}
                        </span>
                        <span className="pt-1 leading-6">{item}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            </Section>
          ) : null}

          {isVisible('tracking') && activeTab !== 'exercises' ? (
            <Section eyebrow="Seguimiento" title="Control de progreso">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <Card>
                  <h3 className="text-xl font-black text-white">
                    Métricas obligatorias
                  </h3>

                  <div className="mt-4 space-y-3">
                    {progressMetrics.map((item) => (
                      <div
                        key={item.metric}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4"
                      >
                        <p className="font-black text-white">{item.metric}</p>

                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                              Frecuencia
                            </p>
                            <p className="mt-1 text-sm leading-6 text-zinc-300">
                              {item.frequency}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
                              Objetivo
                            </p>
                            <p className="mt-1 text-sm leading-6 text-lime-300">
                              {item.target}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-xl font-black text-white">
                    Señales de alerta
                  </h3>

                  <div className="mt-4 space-y-3">
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

                  <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
                    <p className="font-black text-lime-200">
                      Señal de que funciona
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      Sube 0.2–0.4 kg por semana, mejora cargas o repeticiones,
                      la cintura no sube rápido y llega funcional al fútbol del
                      miércoles.
                    </p>
                  </div>
                </Card>
              </div>
            </Section>
          ) : null}

          {activeTab === 'all' ? (
            <Section eyebrow="Resumen" title="Decisión final">
              <Card className="border-lime-400/20 bg-lime-400/10">
                <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr]">
                  <div>
                    <p className="text-5xl font-black text-lime-300">
                      4 días
                    </p>
                    <p className="mt-2 text-xl font-black leading-tight text-white">
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
                        className="rounded-2xl bg-black/25 p-4 text-sm font-bold leading-6 text-zinc-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </Section>
          ) : null}
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#060806]/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md snap-x gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              active={activeTab === tab.key}
              onClick={() => changeTab(tab.key)}
              compact
            />
          ))}
        </div>
      </nav>
    </main>
  );
}