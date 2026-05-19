"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type TabKey =
  | "all"
  | "strategy"
  | "nutrition"
  | "warmup"
  | "gym"
  | "exercises"
  | "mobility"
  | "tracking";

type Tone = "neutral" | "green" | "amber" | "red" | "blue" | "purple";

// images[0] = posición inicial, images[1] = posición final
type VisualItem = {
  name: string;
  images: string[];
  alt: string;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
};

type Exercise = VisualItem & {
  sets: string;
  rest: string;
  cue: string;
  target: string;
  lumbarNote?: string;
};

type WarmupItem = VisualItem & {
  volume: string;
  cue: string;
};

type GymDay = {
  day: string;
  title: string;
  focus: string;
  duration: string;
  tone: Tone;
  warning?: string;
  warmup: WarmupItem[];
  exercises: Exercise[];
};

const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

function dbImage(path: string) {
  return `${IMAGE_BASE}${path}`;
}

// paths[0] = inicio, paths[1] = final (opcional, cargado con fallback silencioso)
function visual(
  name: string,
  paths: string[],
  alt: string,
  note?: string,
): VisualItem {
  return {
    name,
    images: paths.map(dbImage),
    alt,
    sourceLabel: "Free Exercise DB",
    sourceUrl: dbImage(paths[0]),
    note,
  };
}

function exercise({
  name,
  paths,
  alt,
  sets,
  rest,
  cue,
  target,
  lumbarNote,
  note,
}: {
  name: string;
  paths: string[];
  alt: string;
  sets: string;
  rest: string;
  cue: string;
  target: string;
  lumbarNote?: string;
  note?: string;
}): Exercise {
  return {
    ...visual(name, paths, alt, note),
    sets,
    rest,
    cue,
    target,
    lumbarNote,
  };
}

function warmup({
  name,
  paths,
  alt,
  volume,
  cue,
  note,
}: {
  name: string;
  paths: string[];
  alt: string;
  volume: string;
  cue: string;
  note?: string;
}): WarmupItem {
  return {
    ...visual(name, paths, alt, note),
    volume,
    cue,
  };
}

const tabs: Array<{
  key: TabKey;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    key: "all",
    label: "Todo",
    shortLabel: "Todo",
    description: "Plan completo",
  },
  {
    key: "strategy",
    label: "Estrategia",
    shortLabel: "Plan",
    description: "Objetivo, dolor lumbar y prioridades",
  },
  {
    key: "nutrition",
    label: "Comida",
    shortLabel: "Comida",
    description: "Calorías, macros y reglas",
  },
  {
    key: "warmup",
    label: "Calentamiento",
    shortLabel: "Warm",
    description: "Antes de cada sesión",
  },
  {
    key: "gym",
    label: "Rutina",
    shortLabel: "Gym",
    description: "Semana completa",
  },
  {
    key: "exercises",
    label: "Ejercicios",
    shortLabel: "Ejer.",
    description: "Solo ejercicios con imágenes",
  },
  {
    key: "mobility",
    label: "Movilidad",
    shortLabel: "Mov.",
    description: "Casa, lumbar y fútbol",
  },
  {
    key: "tracking",
    label: "Control",
    shortLabel: "Ctrl.",
    description: "Progreso y ajustes",
  },
];

const profileStats = [
  { label: "Edad", value: "41", unit: "años" },
  { label: "Altura", value: "187", unit: "cm" },
  { label: "Peso", value: "81", unit: "kg" },
  { label: "Sesión gym", value: "50", unit: "min máx." },
];

const macroTargets = [
  { label: "Calorías iniciales", value: "2,950–3,100 kcal/día" },
  { label: "Proteína", value: "145–165 g/día" },
  { label: "Carbohidratos", value: "330–400 g/día" },
  { label: "Grasas", value: "80–105 g/día" },
  { label: "Agua", value: "2.5–3.5 L/día + sudor" },
];

const meals = [
  {
    title: "Desayuno",
    tag: "Mañana",
    goal: "Proteína alta, energía estable y grasas buenas.",
    items: [
      "3 huevos enteros.",
      "100–150 g de claras si ese día falta proteína.",
      "60–80 g de palta.",
      "40–60 g de queso blanco.",
      "2 rebanadas de pan de avena o integral.",
      "Café con leche sin azúcar.",
    ],
  },
  {
    title: "Almuerzo",
    tag: "Mediodía",
    goal: "Comida fuerte para sostener gimnasio y fútbol.",
    items: [
      "180–220 g de pollo, pescado, pavo o carne magra.",
      "300–400 g de papa, camote, arroz, quinoa o pasta cocida.",
      "Ensalada grande.",
      "1 cucharada de aceite de oliva.",
      "1 fruta en días de pierna o fútbol.",
    ],
  },
  {
    title: "Merienda / pre-entreno",
    tag: "Tarde",
    goal: "Carbohidrato útil y proteína antes del entrenamiento.",
    items: [
      "250 g de yogurt griego natural.",
      "1 plátano.",
      "150–250 g de papaya.",
      "40–60 g de avena.",
      "1 nuez de Brasil. No usar varias al día.",
    ],
  },
  {
    title: "Cena obligatoria",
    tag: "Noche",
    goal: "Recuperación muscular. Esta comida no se salta.",
    items: [
      "180–220 g de pollo, pescado, carne magra, huevos o equivalente.",
      "250–350 g de papa, arroz, camote, pasta, quinoa o yuca.",
      "1–2 platos de verduras.",
      "1 cucharada de aceite de oliva o 60 g de palta.",
    ],
  },
];

// ─── Calentamientos ────────────────────────────────────────────────────────────
// paths[0] = posición inicial · paths[1] = posición final (animación automática)

const commonLowerWarmup: WarmupItem[] = [
  warmup({
    name: "Step mill o caminata inclinada",
    paths: ["Step_Mill/0.jpg", "Step_Mill/1.jpg"],
    alt: "Step mill — cardio suave de calentamiento",
    volume: "3 min",
    cue: "Ritmo cómodo. Solo subir temperatura, no cansarse.",
  }),
  warmup({
    name: "Cat stretch / cat-camel",
    paths: ["Cat_Stretch/0.jpg", "Cat_Stretch/1.jpg"],
    alt: "Cat-camel — movilidad de columna en cuadrupedia",
    volume: "6–8 reps",
    cue: "Mover columna suave. No forzar rangos dolorosos.",
  }),
  warmup({
    name: "Puente de glúteo",
    paths: ["Butt_Lift_Bridge/0.jpg", "Butt_Lift_Bridge/1.jpg"],
    alt: "Puente de glúteo — activación glúteo mayor",
    volume: "12 reps",
    cue: "Apretar glúteos arriba. No arquear lumbar.",
  }),
  warmup({
    name: "Hip circles en cuadrupedia",
    paths: ["Hip_Circles_prone/0.jpg", "Hip_Circles_prone/1.jpg"],
    alt: "Hip circles en cuadrupedia — movilidad de cadera",
    volume: "6 por lado",
    cue: "Círculos lentos, pelvis estable.",
  }),
  warmup({
    name: "Step-down sin peso",
    paths: ["Step-up_with_Knee_Raise/0.jpg", "Step-up_with_Knee_Raise/1.jpg"],
    alt: "Referencia de caja — ejecutar como step-down controlado",
    volume: "6 por lado",
    cue: "Bajada lenta. Usar apoyo con la mano si hace falta.",
    note: "Imagen de referencia: la ejecución es step-DOWN (bajar), no step-up explosivo. Caja 15–25 cm.",
  }),
];

const commonUpperWarmup: WarmupItem[] = [
  warmup({
    name: "Step mill o caminata inclinada",
    paths: ["Step_Mill/0.jpg", "Step_Mill/1.jpg"],
    alt: "Step mill — cardio suave de calentamiento",
    volume: "3 min",
    cue: "Subir temperatura sin agotar piernas.",
  }),
  warmup({
    name: "Shoulder circles",
    paths: ["Shoulder_Circles/0.jpg", "Shoulder_Circles/1.jpg"],
    alt: "Círculos de hombro — movilidad escapular",
    volume: "10 hacia atrás + 10 hacia adelante",
    cue: "Mover hombros sin elevar costillas.",
  }),
  warmup({
    name: "Arm circles",
    paths: ["Arm_Circles/0.jpg", "Arm_Circles/1.jpg"],
    alt: "Círculos de brazos — activación de hombro",
    volume: "10 por dirección",
    cue: "Controlado, sin dolor anterior de hombro.",
  }),
  warmup({
    name: "Jalón al pecho muy liviano",
    paths: [
      "Close-Grip_Front_Lat_Pulldown/0.jpg",
      "Close-Grip_Front_Lat_Pulldown/1.jpg",
    ],
    alt: "Jalón cerrado en máquina — activación de dorsales",
    volume: "1 x 15",
    cue: "Activación, no fatiga. Codos hacia costillas.",
  }),
  warmup({
    name: "Reverse fly muy liviano",
    paths: ["Reverse_Machine_Flyes/0.jpg", "Reverse_Machine_Flyes/1.jpg"],
    alt: "Reverse fly en máquina — activación deltoides posterior",
    volume: "1 x 15",
    cue: "Preparar deltoide posterior y espalda alta.",
  }),
];

// ─── Días de gimnasio ──────────────────────────────────────────────────────────

const gymDays: GymDay[] = [
  // ── LUNES: Torso A ──────────────────────────────────────────────────────────
  {
    day: "Lunes",
    title: "Torso A",
    focus: "Dorsales, espalda media, hombro lateral y trapecio",
    duration: "45–50 min",
    tone: "blue",
    warning:
      "El fútbol de 20 minutos debe quedar recreativo o técnico. No convertirlo en una guerra de sprints.",
    warmup: commonUpperWarmup,
    exercises: [
      exercise({
        name: "Jalón al pecho agarre neutro/cerrado",
        paths: [
          "Close-Grip_Front_Lat_Pulldown/0.jpg",
          "Close-Grip_Front_Lat_Pulldown/1.jpg",
        ],
        alt: "Jalón cerrado en máquina — posición inicial y final",
        sets: "3 x 8–12",
        rest: "90 s",
        target: "Dorsales",
        cue: "Codos hacia costillas. Pecho alto sin arquear lumbar.",
        lumbarNote:
          "Mantén pelvis neutra y evita inclinarte hacia atrás para hacer trampa.",
      }),
      exercise({
        name: "Remo con pecho apoyado",
        paths: ["Lying_T-Bar_Row/0.jpg", "Lying_T-Bar_Row/1.jpg"],
        alt: "Remo T-bar con pecho apoyado — posición inicial y final",
        sets: "3 x 8–12",
        rest: "90 s",
        target: "Espalda media + dorsales",
        cue: "Pausar atrás. Tirar con codos, no con cuello.",
        lumbarNote: "Prioritario porque descarga la zona lumbar.",
      }),
      exercise({
        name: "Press de pecho en máquina",
        paths: ["Leverage_Chest_Press/0.jpg", "Leverage_Chest_Press/1.jpg"],
        alt: "Press de pecho en máquina leverage — posición inicial y final",
        sets: "2 x 8–12",
        rest: "90 s",
        target: "Pecho mantenimiento",
        cue: "Escápulas estables. No buscar máximo.",
        lumbarNote: "Espalda pegada al respaldo.",
      }),
      exercise({
        // Reemplazado: Side_Lateral_Raise (mancuerna) → Cable_Seated_Lateral_Raise
        name: "Elevaciones laterales en cable",
        paths: [
          "Cable_Seated_Lateral_Raise/0.jpg",
          "Cable_Seated_Lateral_Raise/1.jpg",
        ],
        alt: "Elevación lateral sentado en cable — posición inicial y final",
        sets: "3 x 12–20",
        rest: "60 s",
        target: "Deltoide lateral",
        cue: "Subir controlado hasta línea de hombro. Tensión constante del cable.",
        lumbarNote: "Sentado con respaldo. Cero balanceo de tronco.",
      }),
      exercise({
        name: "Encogimientos en máquina",
        paths: [
          "Calf-Machine_Shoulder_Shrug/0.jpg",
          "Calf-Machine_Shoulder_Shrug/1.jpg",
        ],
        alt: "Encogimiento de hombros en máquina — posición inicial y final",
        sets: "2 x 10–15",
        rest: "60 s",
        target: "Trapecio",
        cue: "Subir hombros verticalmente. Pausa arriba.",
        lumbarNote: "No arquear espalda ni sacar cuello hacia adelante.",
      }),
    ],
  },

  // ── MARTES: Glúteo / Pierna A ───────────────────────────────────────────────
  {
    day: "Martes",
    title: "Glúteo / Pierna A",
    focus: "Glúteo fuerte sin destruir piernas antes del fútbol largo",
    duration: "45–50 min",
    tone: "green",
    warning:
      "Este día no se entrena a muerte. El miércoles hay fútbol de salón de 90 minutos.",
    warmup: commonLowerWarmup,
    exercises: [
      exercise({
        name: "Hip thrust",
        paths: ["Barbell_Hip_Thrust/0.jpg", "Barbell_Hip_Thrust/1.jpg"],
        alt: "Hip thrust con barra — posición inicial (abajo) y final (arriba)",
        sets: "4 x 8–12",
        rest: "2 min",
        target: "Glúteo mayor",
        cue: "Pausa arriba 1 segundo. Costillas abajo, pelvis neutra.",
        lumbarNote: "Si se siente en lumbar, baja carga y corrige técnica.",
      }),
      exercise({
        name: "Glute-focused step-down",
        paths: [
          "Step-up_with_Knee_Raise/0.jpg",
          "Step-up_with_Knee_Raise/1.jpg",
        ],
        alt: "Referencia de caja — ejecutar como step-down unilateral",
        sets: "3 x 8–10 por pierna",
        rest: "90 s",
        target: "Glúteo medio + control pélvico",
        cue: "Bajada de 3 segundos. Ligera inclinación desde la cadera. Rodilla alineada.",
        lumbarNote: "Caja baja de 15–25 cm. Usar apoyo con la mano al inicio.",
        note: "Imagen de referencia: la ejecución es step-DOWN (bajar con control excéntrico), no step-up explosivo.",
      }),
      exercise({
        name: "Prensa con pies altos",
        paths: ["Leg_Press/0.jpg", "Leg_Press/1.jpg"],
        alt: "Prensa de piernas en máquina — posición inicial y final",
        sets: "2 x 10–12",
        rest: "90 s",
        target: "Glúteos + pierna",
        cue: "Pies algo más altos. Empujar con talón/medio pie.",
        lumbarNote: "Espalda pegada al respaldo. No despegar cadera abajo.",
      }),
      exercise({
        name: "Curl femoral sentado",
        paths: ["Seated_Leg_Curl/0.jpg", "Seated_Leg_Curl/1.jpg"],
        alt: "Curl femoral en máquina sentado — posición inicial y final",
        sets: "2 x 10–15",
        rest: "75 s",
        target: "Isquiosurales",
        cue: "Pausa al contraer. Volver lento.",
        lumbarNote: "Buena opción porque entrena isquios sin bisagra lumbar.",
      }),
      exercise({
        name: "Pallof press en cable",
        paths: ["Pallof_Press/0.jpg", "Pallof_Press/1.jpg"],
        alt: "Pallof press en cable — posición inicial y final",
        sets: "2 x 10–12 por lado",
        rest: "45–60 s",
        target: "Core anti-rotación",
        cue: "Costillas abajo. No girar tronco.",
        lumbarNote: "Clave para estabilidad lumbar y pelvis.",
      }),
    ],
  },

  // ── JUEVES: Torso B ─────────────────────────────────────────────────────────
  {
    day: "Jueves",
    title: "Torso B",
    focus: "Hombros, dorsales y espalda alta para verte menos estrecho",
    duration: "45–50 min",
    tone: "purple",
    warmup: commonUpperWarmup,
    exercises: [
      exercise({
        name: "Jalón al pecho agarre amplio",
        paths: ["Wide-Grip_Lat_Pulldown/0.jpg", "Wide-Grip_Lat_Pulldown/1.jpg"],
        alt: "Jalón amplio en máquina — posición inicial y final",
        sets: "3 x 6–10",
        rest: "2 min",
        target: "Dorsales",
        cue: "Controlar la bajada. No jalar con cuello.",
        lumbarNote: "Evita inclinarte demasiado hacia atrás.",
      }),
      exercise({
        name: "Remo alto en máquina con apoyo",
        paths: ["Leverage_High_Row/0.jpg", "Leverage_High_Row/1.jpg"],
        alt: "Leverage high row en máquina — posición inicial y final",
        sets: "3 x 8–12",
        rest: "90 s",
        target: "Espalda alta + dorsales",
        cue: "Codos hacia atrás y abajo. Pausa corta.",
        lumbarNote: "Usar máquina y apoyo para no cargar lumbar.",
      }),
      exercise({
        name: "Press de hombro en máquina con respaldo",
        paths: [
          "Leverage_Shoulder_Press/0.jpg",
          "Leverage_Shoulder_Press/1.jpg",
        ],
        alt: "Press de hombro en máquina leverage — posición inicial y final",
        sets: "2 x 8–10",
        rest: "90 s",
        target: "Deltoide anterior/lateral",
        cue: "No bloquear agresivo arriba. Control total.",
        lumbarNote: "Glúteos y espalda pegados al respaldo.",
      }),
      exercise({
        name: "Elevación lateral en cable sentado",
        paths: [
          "Cable_Seated_Lateral_Raise/0.jpg",
          "Cable_Seated_Lateral_Raise/1.jpg",
        ],
        alt: "Elevación lateral en cable sentado — posición inicial y final",
        sets: "3 x 12–20",
        rest: "60 s",
        target: "Deltoide lateral",
        cue: "Tensión constante. Subir hasta línea de hombro.",
        lumbarNote: "No balancear el tronco.",
      }),
      exercise({
        name: "Reverse pec-deck",
        paths: ["Reverse_Machine_Flyes/0.jpg", "Reverse_Machine_Flyes/1.jpg"],
        alt: "Reverse pec-deck en máquina — posición inicial y final",
        sets: "3 x 12–20",
        rest: "60 s",
        target: "Deltoide posterior + trapecio medio",
        cue: "Abrir sin encoger cuello. Pausa atrás.",
        lumbarNote: "Pecho apoyado, abdomen firme.",
      }),
    ],
  },

  // ── VIERNES: Glúteo / Pierna B ──────────────────────────────────────────────
  {
    day: "Viernes",
    title: "Glúteo / Pierna B",
    focus: "Glúteo fuerte, estabilidad pélvica y soporte lumbar",
    duration: "45–50 min",
    tone: "amber",
    warning:
      "Este día puede ser más intenso porque hay más margen de recuperación antes del siguiente fútbol largo.",
    warmup: commonLowerWarmup,
    exercises: [
      exercise({
        name: "Hip thrust pesado controlado",
        paths: ["Barbell_Hip_Thrust/0.jpg", "Barbell_Hip_Thrust/1.jpg"],
        alt: "Hip thrust con barra — posición inicial (abajo) y final (arriba)",
        sets: "4 x 6–10",
        rest: "2 min",
        target: "Glúteo mayor",
        cue: "Más pesado que martes, pero sin dolor lumbar.",
        lumbarNote: "No hiperextender arriba. Pelvis neutra.",
      }),
      exercise({
        name: "Glute-focused step-down",
        paths: [
          "Step-up_with_Knee_Raise/0.jpg",
          "Step-up_with_Knee_Raise/1.jpg",
        ],
        alt: "Referencia de caja — ejecutar como step-down unilateral",
        sets: "3 x 10–12 por pierna",
        rest: "90 s",
        target: "Glúteo medio + control de rodilla",
        cue: "Tocar suave abajo. No impulsarse con la pierna de apoyo.",
        lumbarNote: "Caja baja. Control antes que carga.",
        note: "Imagen de referencia: la ejecución es step-DOWN (bajar con control excéntrico), no step-up explosivo.",
      }),
      exercise({
        name: "Curl femoral sentado",
        paths: ["Seated_Leg_Curl/0.jpg", "Seated_Leg_Curl/1.jpg"],
        alt: "Curl femoral en máquina sentado — posición inicial y final",
        sets: "2 x 10–15",
        rest: "75 s",
        target: "Isquiosurales",
        cue: "Control excéntrico. Pausa al cerrar.",
        lumbarNote: "Protege lumbar frente a bisagras pesadas.",
      }),
      exercise({
        name: "Aductor en máquina",
        paths: ["Thigh_Adductor/0.jpg", "Thigh_Adductor/1.jpg"],
        alt: "Máquina de aductores — posición inicial y final",
        sets: "2 x 12–15",
        rest: "60 s",
        target: "Aductores + pelvis",
        cue: "Sin rebotes. Cerrar con control.",
        lumbarNote: "Mantén espalda pegada al respaldo.",
      }),
      exercise({
        name: "Plancha lateral",
        paths: ["Side_Bridge/0.jpg", "Side_Bridge/1.jpg"],
        alt: "Plancha lateral (side bridge) — posición bajada y levantada",
        sets: "2 x 25–40 s por lado",
        rest: "45 s",
        target: "Core lateral",
        cue: "Cadera alta. Línea recta hombro-cadera-tobillo.",
        lumbarNote: "Debe sentirse en lateral del abdomen, no en lumbar.",
      }),
    ],
  },
];

// ─── Horario semanal ───────────────────────────────────────────────────────────

const weeklySchedule = [
  {
    day: "Lunes",
    activity: "Torso A + fútbol 20 min",
    intensity: "Moderada",
    tone: "blue" as Tone,
  },
  {
    day: "Martes",
    activity: "Glúteo / Pierna A",
    intensity: "Controlada",
    tone: "green" as Tone,
  },
  {
    day: "Miércoles",
    activity: "Movilidad + fútbol de salón 90 min",
    intensity: "Alta",
    tone: "red" as Tone,
  },
  {
    day: "Jueves",
    activity: "Torso B",
    intensity: "Progresiva",
    tone: "purple" as Tone,
  },
  {
    day: "Viernes",
    activity: "Glúteo / Pierna B",
    intensity: "Fuerte",
    tone: "amber" as Tone,
  },
  {
    day: "Sábado",
    activity: "Caminata suave + movilidad",
    intensity: "Baja",
    tone: "neutral" as Tone,
  },
  {
    day: "Domingo",
    activity: "Descanso real",
    intensity: "Recuperación",
    tone: "green" as Tone,
  },
];

// ─── Movilidad ─────────────────────────────────────────────────────────────────

const mobilityRoutine: WarmupItem[] = [
  warmup({
    name: "Cat stretch / cat-camel",
    paths: ["Cat_Stretch/0.jpg", "Cat_Stretch/1.jpg"],
    alt: "Cat-camel — movilidad de columna en cuadrupedia",
    volume: "8 reps",
    cue: "Movimiento lento para columna. No perseguir dolor.",
  }),
  warmup({
    name: "Puente de glúteo",
    paths: ["Butt_Lift_Bridge/0.jpg", "Butt_Lift_Bridge/1.jpg"],
    alt: "Puente de glúteo — activación glúteo mayor",
    volume: "12 reps",
    cue: "Activar glúteo sin extensión lumbar.",
  }),
  warmup({
    name: "Hip circles en cuadrupedia",
    paths: ["Hip_Circles_prone/0.jpg", "Hip_Circles_prone/1.jpg"],
    alt: "Hip circles en cuadrupedia — movilidad de cadera",
    volume: "8 por lado",
    cue: "Pelvis estable.",
  }),
  warmup({
    name: "Standing hip circles",
    paths: ["Standing_Hip_Circles/0.jpg", "Standing_Hip_Circles/1.jpg"],
    alt: "Círculos de cadera de pie — movilidad de cadera",
    volume: "8 por lado",
    cue: "Usar apoyo con la mano.",
  }),
  warmup({
    name: "Side bridge",
    paths: ["Side_Bridge/0.jpg", "Side_Bridge/1.jpg"],
    alt: "Side bridge — core lateral",
    volume: "20–30 s por lado",
    cue: "Cadera alta. Respirar normal.",
  }),
];

// ─── Seguimiento ───────────────────────────────────────────────────────────────

const progressMetrics = [
  {
    metric: "Peso corporal",
    frequency: "3 mañanas por semana",
    target: "Subir 0.2–0.4 kg/semana",
  },
  {
    metric: "Cintura",
    frequency: "Cada 2 semanas",
    target: "No aumentar rápido",
  },
  {
    metric: "Dolor lumbar",
    frequency: "Durante y 24 h después del gym",
    target: "No pasar de 3/10 ni irradiar a pierna",
  },
  {
    metric: "Hip thrust",
    frequency: "Martes y viernes",
    target: "Subir reps o carga sin sentir lumbar",
  },
  {
    metric: "Step-down",
    frequency: "Martes y viernes",
    target: "Mejorar control de rodilla y pelvis",
  },
  {
    metric: "Hombro / dorsales",
    frequency: "Lunes y jueves",
    target: "Progresar sin dolor de cuello",
  },
];

const removedExercises = [
  "Peso muerto convencional.",
  "Romanian deadlift con barra.",
  "Sentadilla trasera pesada.",
  "Remo inclinado con barra.",
  "Good mornings.",
  "Press militar pesado de pie.",
  "Farmer carry pesado.",
];

// ─── Computed ──────────────────────────────────────────────────────────────────

const allMainExercises = gymDays.flatMap((day) =>
  day.exercises.map((item) => ({
    ...item,
    day: day.day,
    dayTitle: day.title,
  })),
);

const allWarmups = gymDays.flatMap((day) =>
  day.warmup.map((item) => ({
    ...item,
    day: day.day,
    dayTitle: day.title,
  })),
);

// ─── Utilidades ────────────────────────────────────────────────────────────────

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ─── Componentes base ──────────────────────────────────────────────────────────

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const styles: Record<Tone, string> = {
    neutral: "border-white/10 bg-white/10 text-zinc-200",
    green: "border-lime-400/30 bg-lime-400/10 text-lime-100",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-100",
    red: "border-red-400/30 bg-red-400/10 text-red-100",
    blue: "border-sky-400/30 bg-sky-400/10 text-sky-100",
    purple: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wide",
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
        "min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 backdrop-blur md:p-6",
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
        "rounded-2xl border text-left font-black transition active:scale-[0.98]",
        compact
          ? "min-w-[76px] snap-start px-3 py-2 text-center text-xs"
          : "w-full px-3 py-3 md:px-4",
        active
          ? "border-lime-300 bg-lime-300 text-black shadow-lg shadow-lime-400/20"
          : "border-white/10 bg-white/[0.07] text-zinc-200 hover:bg-white/10",
      )}
    >
      <span className="block leading-none">
        {compact ? tab.shortLabel : tab.label}
      </span>
      {!compact ? (
        <span
          className={cx(
            "mt-1 block text-[11px] font-semibold leading-snug",
            active ? "text-black/65" : "text-zinc-500",
          )}
        >
          {tab.description}
        </span>
      ) : null}
    </button>
  );
}

// ─── ReferenceImage ────────────────────────────────────────────────────────────
// Anima automáticamente entre posición inicial y final (images[0] → images[1]).
// Si images[1] falla al cargar, se degrada silenciosamente a imagen única.

function ReferenceImage({
  item,
  className,
}: {
  item: VisualItem;
  className?: string;
}) {
  const [frame, setFrame] = useState(0);
  const [secondFailed, setSecondFailed] = useState(false);

  // Solo anima si existe el segundo frame y cargó sin error
  const hasAnimation = item.images.length > 1 && !secondFailed;

  useEffect(() => {
    if (!hasAnimation) return;
    const timer = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 1400);
    return () => clearInterval(timer);
  }, [hasAnimation]);

  const safeFrame = hasAnimation ? frame : 0;

  return (
    <div
      className={cx(
        "overflow-hidden rounded-2xl border border-white/10 bg-zinc-950",
        className,
      )}
    >
      {/* Contenedor de imagen con animación de fade */}
      <div className="relative flex aspect-[4/3] items-center justify-center bg-white">
        {/* Frame 0 — posición inicial */}
        <img
          src={item.images[0]}
          alt={hasAnimation ? `${item.alt} — posición inicial` : item.alt}
          loading="lazy"
          className={cx(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-500",
            safeFrame === 0 ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Frame 1 — posición final (se carga silenciosamente) */}
        {item.images[1] && (
          <img
            src={item.images[1]}
            alt={`${item.alt} — posición final`}
            loading="lazy"
            onError={() => {
              setSecondFailed(true);
              setFrame(0);
            }}
            className={cx(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-500",
              safeFrame === 1 ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        {/* Badge INICIO / FINAL */}
        {hasAnimation && (
          <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-lime-300">
              {safeFrame === 0 ? "Inicio" : "Final"}
            </span>
          </div>
        )}

        {/* Dots de navegación (clicables) */}
        {hasAnimation && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
            {[0, 1].map((i) => (
              <button
                key={i}
                type="button"
                aria-label={
                  i === 0 ? "Ver posición inicial" : "Ver posición final"
                }
                onClick={() => setFrame(i)}
                className={cx(
                  "h-1.5 rounded-full bg-white/90 transition-all duration-300",
                  i === safeFrame ? "w-6 opacity-100" : "w-1.5 opacity-40",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer con fuente */}
      <div className="border-t border-white/10 bg-black/40 px-3 py-2">
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-bold text-lime-300 underline-offset-4 hover:underline"
        >
          Fuente: {item.sourceLabel}
        </a>
      </div>
    </div>
  );
}

// ─── ExerciseCard ──────────────────────────────────────────────────────────────

function ExerciseCard({
  exercise,
  compact = false,
  dayLabel,
}: {
  exercise: Exercise;
  compact?: boolean;
  dayLabel?: string;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-black/25">
      <ReferenceImage item={exercise} />

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {dayLabel ? <Badge tone="blue">{dayLabel}</Badge> : null}
          <Badge tone="green">{exercise.sets}</Badge>
          <Badge>{exercise.rest}</Badge>
        </div>

        <h3 className="mt-3 text-lg font-black leading-tight text-white">
          {exercise.name}
        </h3>

        <p className="mt-1 text-sm font-bold text-lime-300">
          {exercise.target}
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-300">{exercise.cue}</p>

        {exercise.lumbarNote ? (
          <div className="mt-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm leading-6 text-amber-100">
            <strong>Lumbar:</strong> {exercise.lumbarNote}
          </div>
        ) : null}

        {exercise.note && !compact ? (
          <p className="mt-3 text-xs leading-5 text-zinc-500">
            ⚠ {exercise.note}
          </p>
        ) : null}
      </div>
    </article>
  );
}

// ─── WarmupCard ────────────────────────────────────────────────────────────────

function WarmupCard({
  item,
  dayLabel,
}: {
  item: WarmupItem;
  dayLabel?: string;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-black/25">
      <ReferenceImage item={item} />

      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {dayLabel ? <Badge tone="blue">{dayLabel}</Badge> : null}
          <Badge tone="green">{item.volume}</Badge>
        </div>

        <h3 className="mt-3 text-lg font-black leading-tight text-white">
          {item.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-300">{item.cue}</p>

        {item.note ? (
          <p className="mt-3 text-xs leading-5 text-zinc-500">⚠ {item.note}</p>
        ) : null}
      </div>
    </article>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────

export default function FitnessPlanPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const activeTabData = useMemo(
    () => tabs.find((tab) => tab.key === activeTab),
    [activeTab],
  );

  const isVisible = (key: TabKey) => activeTab === "all" || activeTab === key;

  const changeTab = (key: TabKey) => {
    setActiveTab(key);
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
        {/* Header */}
        <header className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur md:rounded-[2.5rem] md:p-8 lg:p-10">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge tone="green">Plan 12 semanas</Badge>
                <Badge>4 días gym</Badge>
                <Badge>50 min máximo</Badge>
                <Badge tone="amber">Lumbar protegido</Badge>
              </div>

              <h1 className="max-w-4xl text-[2rem] font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Rutina ajustada para glúteos,
                <span className="block bg-gradient-to-r from-lime-300 via-emerald-300 to-white bg-clip-text text-transparent">
                  hombros, dorsales y espalda alta.
                </span>
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base md:text-lg md:leading-8">
                Plan de 4 días para alguien con dolor lumbar crónico, poco
                tiempo real de gimnasio y objetivo claro: dejar de verse
                delgado, construir glúteos funcionales y mejorar la estructura
                visual del torso sin meter ejercicios innecesarios.
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
                Menos ejercicios, más foco.
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                Cada sesión tiene calentamiento y solo 5 ejercicios principales.
                Hip thrust y glute-focused step-down van dos veces por semana.
                No hay RDL con barra, peso muerto ni remos inclinados.
              </p>

              <div className="mt-5 rounded-2xl bg-black/30 p-4">
                <p className="text-sm font-bold text-zinc-300">
                  Regla de dolor lumbar
                </p>
                <p className="mt-1 text-2xl font-black text-lime-300">
                  0–3/10 tolerable
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Si el dolor sube, irradia a la pierna o empeora al día
                  siguiente, ese ejercicio se reduce o sale.
                </p>
              </div>
            </Card>
          </div>
        </header>

        {/* Navegación */}
        <section className="mt-4 rounded-[1.6rem] border border-white/10 bg-[#090d09]/90 p-3 shadow-xl shadow-black/25 backdrop-blur md:sticky md:top-3 md:z-40">
          <p className="mb-3 px-1 text-[11px] font-black uppercase tracking-[0.22em] text-zinc-500">
            Mostrar contenido
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
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
          Vista activa:{" "}
          <strong className="text-lime-300">
            {activeTabData?.label ?? "Todo"}
          </strong>
          <span className="text-zinc-500"> · </span>
          {activeTabData?.description}
        </div>

        {/* Contenido */}
        <div className="mt-8 space-y-12 md:mt-12 md:space-y-16">
          {/* Estrategia */}
          {isVisible("strategy") && activeTab !== "exercises" ? (
            <Section eyebrow="Estrategia" title="Ajuste realista del plan">
              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <h3 className="text-xl font-black leading-tight text-white md:text-2xl">
                    El plan anterior estaba demasiado cargado para 50 minutos y
                    para una espalda lumbar sensible.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base md:leading-8">
                    Ahora la rutina queda enfocada: glúteos dos veces por
                    semana, torso ancho dos veces por semana, calentamiento
                    obligatorio y cero ejercicios que exijan demasiado a la zona
                    lumbar sin necesidad.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="text-3xl font-black text-lime-300">2x</p>
                      <p className="mt-1 text-sm font-bold text-white">
                        Hip thrust semanal
                      </p>
                    </div>
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="text-3xl font-black text-lime-300">2x</p>
                      <p className="mt-1 text-sm font-bold text-white">
                        Step-down semanal
                      </p>
                    </div>
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="text-3xl font-black text-lime-300">5</p>
                      <p className="mt-1 text-sm font-bold text-white">
                        Ejercicios por día
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border-red-400/20 bg-red-400/10">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-200">
                    Ejercicios fuera
                  </p>
                  <ul className="mt-4 space-y-3">
                    {removedExercises.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-red-100"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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

          {/* Nutrición */}
          {isVisible("nutrition") && activeTab !== "exercises" ? (
            <Section
              eyebrow="Nutrición"
              title="Comida para dejar de verte flaco"
            >
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
                      Regla de fin de semana
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      Máximo 2 comidas libres entre sábado y domingo. Elegir
                      dos: pollo frito, pique macho o salteña. No los tres como
                      hábito.
                    </p>
                  </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  {meals.map((meal) => (
                    <Card
                      key={meal.title}
                      className={
                        meal.title.includes("Cena")
                          ? "border-lime-400/25 bg-lime-400/10"
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
                        {meal.title.includes("Cena") ? (
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
            </Section>
          ) : null}

          {/* Calentamiento */}
          {isVisible("warmup") && activeTab !== "exercises" ? (
            <Section eyebrow="Calentamiento" title="Antes de cada sesión">
              <div className="grid gap-4 lg:grid-cols-2">
                {gymDays.map((day) => (
                  <Card key={`${day.day}-warmup`}>
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-lime-300">
                          {day.day}
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-white">
                          {day.title}
                        </h3>
                      </div>
                      <Badge tone={day.tone}>5–7 min</Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {day.warmup.map((item) => (
                        <WarmupCard
                          key={`${day.day}-${item.name}`}
                          item={item}
                        />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          ) : null}

          {/* Rutina */}
          {isVisible("gym") && activeTab !== "exercises" ? (
            <Section eyebrow="Rutina" title="Semana completa">
              <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                <Card>
                  <h3 className="text-xl font-black text-white">
                    Distribución semanal
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
                    Reglas de ejecución
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">Duración real</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        45–50 minutos. Si se acaba el tiempo, no se agregan
                        extras.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">
                        Intensidad inicial
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        RIR 3 semanas 1–2. Luego RIR 2 en básicos.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">
                        Glúteos prioridad
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        Hip thrust y step-down dos veces por semana.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-black/25 p-4">
                      <p className="font-black text-lime-300">
                        Torso prioridad
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">
                        Dorsales, hombro lateral/posterior y trapecio.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                    <p className="font-black text-amber-100">
                      Regla lumbar obligatoria
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-300">
                      Dolor lumbar durante un ejercicio significa bajar carga,
                      reducir rango o detener ese ejercicio. No se compensa con
                      ego.
                    </p>
                  </div>
                </Card>
              </div>

              <div className="mt-6 space-y-6">
                {gymDays.map((day) => (
                  <Card key={day.title}>
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
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
                        <Badge tone={day.tone}>{day.duration}</Badge>
                        {day.warning ? (
                          <Badge tone="amber">Precaución</Badge>
                        ) : null}
                      </div>
                    </div>

                    {day.warning ? (
                      <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                        {day.warning}
                      </div>
                    ) : null}

                    <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
                        Calentamiento
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {day.warmup.map((item) => (
                          <div
                            key={`${day.day}-${item.name}-mini`}
                            className="rounded-2xl bg-white/[0.05] p-3"
                          >
                            <p className="text-sm font-black text-white">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs font-bold text-lime-300">
                              {item.volume}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                      {day.exercises.map((item) => (
                        <ExerciseCard
                          key={`${day.day}-${item.name}`}
                          exercise={item}
                          compact
                        />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Section>
          ) : null}

          {/* Galería de ejercicios */}
          {activeTab === "exercises" ? (
            <Section
              eyebrow="Ejercicios"
              title="Ejercicios principales con imágenes"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allMainExercises.map((item) => (
                  <ExerciseCard
                    key={`${item.day}-${item.name}`}
                    exercise={item}
                    dayLabel={`${item.day} · ${item.dayTitle}`}
                  />
                ))}
              </div>
            </Section>
          ) : null}

          {/* Galería de calentamientos */}
          {activeTab === "warmup" ? (
            <Section
              eyebrow="Galería"
              title="Todos los ejercicios de calentamiento"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allWarmups.map((item) => (
                  <WarmupCard
                    key={`${item.day}-${item.name}-gallery`}
                    item={item}
                    dayLabel={`${item.day} · ${item.dayTitle}`}
                  />
                ))}
              </div>
            </Section>
          ) : null}

          {/* Movilidad */}
          {isVisible("mobility") && activeTab !== "exercises" ? (
            <Section eyebrow="Movilidad" title="Casa, lumbar y fútbol">
              <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <Card>
                  <h3 className="text-xl font-black text-white">
                    Pausas por trabajo sentado
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    Cada 60–90 minutos levántate 2–3 minutos. No es cardio; es
                    higiene de movimiento para una espalda que pasa demasiadas
                    horas sentada.
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      "10 sentadillas sin peso.",
                      "15 retracciones escapulares.",
                      "15 elevaciones de talón.",
                      "30 s de estiramiento de flexor de cadera por lado.",
                      "2–3 min de caminata por casa.",
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

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {mobilityRoutine.map((item) => (
                    <WarmupCard key={`mobility-${item.name}`} item={item} />
                  ))}
                </div>
              </div>
            </Section>
          ) : null}

          {/* Seguimiento */}
          {isVisible("tracking") && activeTab !== "exercises" ? (
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
                      "Dolor lumbar 4/10 o más durante el ejercicio.",
                      "Dolor irradiado hacia glúteo, pierna o pie.",
                      "El dolor lumbar empeora al día siguiente.",
                      "El step-down genera colapso de rodilla o pelvis.",
                      "El hip thrust se siente más en lumbar que en glúteos.",
                      "No sube el peso corporal en 2 semanas.",
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
                      Sube 0.2–0.4 kg por semana, el hip thrust progresa, el
                      step-down se ve más estable, la cintura no sube rápido y
                      el dolor lumbar no aumenta.
                    </p>
                  </div>
                </Card>
              </div>
            </Section>
          ) : null}

          {/* Resumen final */}
          {activeTab === "all" ? (
            <Section eyebrow="Resumen" title="Decisión final">
              <Card className="border-lime-400/20 bg-lime-400/10">
                <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr]">
                  <div>
                    <p className="text-5xl font-black text-lime-300">4 días</p>
                    <p className="mt-2 text-xl font-black leading-tight text-white">
                      Lunes, martes, jueves y viernes. Máximo 50 minutos.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Hip thrust martes y viernes.",
                      "Glute-focused step-down martes y viernes.",
                      "Dorsales y hombros dos veces por semana.",
                      "Sin peso muerto, RDL ni remo inclinado por ahora.",
                      "Calentamiento obligatorio antes de cada sesión.",
                      "Cena obligatoria para ganar masa.",
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

      {/* Nav móvil */}
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
