// Datos del plan: ejercicios y sesiones.
export type DayKey = "A" | "B" | "C";
export type ExerciseKey = keyof typeof EXERCISES;
export type SetLog = { kg: string; reps: string; done: boolean };
export type WorkoutLog = Record<string, [SetLog, SetLog]>;
export type Journal = Record<string, WorkoutLog>;
export const STORAGE_KEY = "pablo-fullbody-v1";
export const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

export const EXERCISES = {
  press: {
    name: "Prensa de piernas",
    target: "Cuádriceps · glúteos",
    image: "Leg_Press",
    cue: "Mantén la espalda y la pelvis apoyadas. Baja sin despegar la cadera y empuja sin rebotes.",
    note: "Usa la misma máquina y posición de pies para comparar cargas.",
  },
  thrust: {
    name: "Hip thrust",
    target: "Glúteos",
    image: "Barbell_Hip_Thrust",
    cue: "Sube extendiendo la cadera. Contrae glúteos arriba sin arquear la espalda.",
    note: "Las imágenes muestran la variante con barra. Prioriza máquina; puedes usar puente de glúteo con carga.",
  },
  incline: {
    name: "Press inclinado con mancuernas",
    target: "Pecho superior · tríceps",
    image: "Incline_Dumbbell_Press",
    cue: "Mantén las escápulas estables y las muñecas sobre los codos. Baja de forma controlada.",
    note: "Anota el peso de una mancuerna y conserva ese criterio en tus registros.",
  },
  curl: {
    name: "Curl femoral sentado",
    target: "Isquiotibiales",
    image: "Seated_Leg_Curl",
    cue: "Ajusta el eje de la máquina a tu rodilla. Mantén la pelvis apoyada y controla el regreso.",
    note: "Elige una carga que permita completar todo el recorrido cómodo.",
  },
  face: {
    name: "Face pull",
    target: "Hombro posterior · espalda alta",
    image: "Face_Pull",
    cue: "Lleva la cuerda hacia la cara con control. Mantén el tronco estable y evita encoger el cuello.",
    note: "Prioriza un recorrido controlado antes de aumentar la carga.",
  },
  row: {
    name: "Remo con pecho apoyado",
    target: "Espalda media · dorsales",
    image: "Lying_T-Bar_Row",
    cue: "Mantén el pecho en el apoyo. Lleva los codos hacia atrás sin levantar los hombros ni tirar con el cuello.",
    note: "Puedes usar una máquina de remo con apoyo de pecho equivalente.",
  },
  lateral: {
    name: "Elevaciones laterales",
    target: "Hombro lateral",
    image: "Side_Lateral_Raise",
    cue: "Eleva los brazos hasta una altura cómoda cercana a los hombros. Evita impulsarte con el tronco.",
    note: "Con mancuernas, registra el peso de una sola.",
  },
  extension: {
    name: "Extensión de cuádriceps",
    target: "Cuádriceps",
    image: "Leg_Extensions",
    cue: "Alinea la rodilla con el eje de la máquina. Extiende con control y evita lanzar la carga.",
    note: "Mantén la cadera apoyada durante toda la serie.",
  },
  pulldown: {
    name: "Jalón al pecho",
    target: "Dorsales · bíceps",
    image: "Wide-Grip_Lat_Pulldown",
    cue: "Lleva los codos hacia abajo. Acerca la barra al pecho sin balancearte ni llevarla detrás de la cabeza.",
    note: "Utiliza un agarre cómodo y conserva la misma variante.",
  },
  squat: {
    name: "Sentadilla (goblet o barra)",
    target: "Cuádriceps · glúteos",
    image: "Barbell_Squat",
    cue: "Pies a la anchura de los hombros, tronco firme. Baja con control hasta una profundidad cómoda y sube empujando el suelo.",
    note: "Usa la misma profundidad en cada sesión para comparar cargas.",
  },
  rdl: {
    name: "Peso muerto rumano",
    target: "Isquiotibiales · glúteos",
    image: "Romanian_Deadlift",
    cue: "Lleva la cadera hacia atrás con rodillas ligeramente flexionadas. Mantén la espalda neutra y la barra pegada a las piernas.",
    note: "Baja hasta sentir el estiramiento de isquiotibiales, sin redondear la espalda.",
  },
  bench: {
    name: "Press banca con mancuernas",
    target: "Pecho · tríceps",
    image: "Dumbbell_Bench_Press",
    cue: "Escápulas juntas y apoyadas, muñecas sobre los codos. Baja las mancuernas con control hasta el pecho y empuja sin despegar la cadera.",
    note: "Registra el peso de una sola mancuerna.",
  },
  cableRow: {
    name: "Remo sentado en polea",
    target: "Espalda media · dorsales",
    image: "Seated_Cable_Rows",
    cue: "Pecho abierto y tronco estable. Lleva los codos atrás sin encoger los hombros ni balancearte.",
    note: "Mantén el mismo agarre para comparar cargas.",
  },
  dbShoulder: {
    name: "Press militar sentado con mancuernas",
    target: "Hombros · tríceps",
    image: "Dumbbell_Shoulder_Press",
    cue: "Empuja las mancuernas sin arquear la zona lumbar. Baja de forma controlada hasta una altura cómoda para el hombro.",
    note: "Registra el peso de una sola mancuerna.",
  },
  ez: {
    name: "Curl con barra Z",
    target: "Bíceps",
    image: "EZ-Bar_Curl",
    cue: "Codos pegados al cuerpo y estables. Controla la bajada y evita impulsarte con el tronco.",
    note: "Registra el peso total de la barra.",
  },
  pushdown: {
    name: "Extensión de tríceps en polea",
    target: "Tríceps",
    image: "Triceps_Pushdown",
    cue: "Codos fijos a los costados. Extiende por completo y regresa sin dejar que la carga tire de los hombros.",
    note: "Mantén el mismo accesorio (cuerda o barra).",
  },
  oneRow: {
    name: "Remo con mancuerna a una mano",
    target: "Espalda media · dorsales",
    image: "One-Arm_Dumbbell_Row",
    cue: "Apoya mano y rodilla, espalda neutra. Lleva el codo hacia la cadera sin rotar el tronco.",
    note: "Repeticiones indicadas por brazo; registra el peso de la mancuerna.",
  },
  neutral: {
    name: "Dominadas asistidas o jalón agarre neutro",
    target: "Dorsales · bíceps",
    image: "Close-Grip_Front_Lat_Pulldown",
    cue: "Lleva los codos hacia abajo y acerca el agarre al pecho sin balancearte.",
    note: "Conserva la misma variante y el mismo agarre en todas las sesiones. Registra la asistencia con signo −.",
  },
  dipsChoice: {
    name: "Fondos asistidos o press de pecho en máquina",
    target: "Pecho · tríceps",
    image: "Dips_-_Chest_Version",
    cue: "Baja con control hasta una profundidad cómoda para tus hombros. Usa asistencia o lastre para alcanzar el rango indicado.",
    note: "Registra la asistencia con signo −. Si usas la máquina, mantén siempre el mismo ajuste de asiento.",
  },
  hammer: {
    name: "Curl martillo",
    target: "Bíceps · braquial",
    image: "Hammer_Curls",
    cue: "Muñecas neutras y codos estables. Sube sin impulso y baja con control.",
    note: "Registra el peso de una sola mancuerna.",
  },
  standingCalf: {
    name: "Pantorrillas de pie",
    target: "Pantorrillas",
    image: "Standing_Calf_Raises",
    cue: "Recorre el rango completo. Haz una breve pausa arriba y abajo, sin rebotar.",
    note: "Mantén la misma variante de máquina para medir el progreso.",
  },
  bulgarian: {
    name: "Sentadilla búlgara",
    target: "Cuádriceps · glúteos",
    image: "Split_Squat_with_Dumbbells",
    cue: "Pie trasero elevado, tronco erguido. Baja verticalmente con control y empuja con la pierna delantera.",
    note: "Repeticiones por pierna; empieza siempre por la más débil.",
  },
  hyper: {
    name: "Hiperextensión a 45°",
    target: "Lumbares · glúteos · isquiotibiales",
    image: "Hyperextensions_Back_Extensions",
    cue: "Sube hasta alinear el tronco con las piernas, sin hiperextender la zona lumbar. Baja con control.",
    note: "Añade carga solo cuando domines el recorrido.",
  },
  chestMachine: {
    name: "Press de pecho en máquina",
    target: "Pecho · tríceps",
    image: "Leverage_Chest_Press",
    cue: "Espalda apoyada y escápulas estables. Empuja sin bloquear de golpe los codos y regresa con control.",
    note: "Mantén la misma máquina y altura de asiento.",
  },
  wide: {
    name: "Jalón al pecho agarre ancho",
    target: "Dorsales · bíceps",
    image: "Wide-Grip_Lat_Pulldown",
    cue: "Lleva los codos hacia abajo. Acerca la barra al pecho sin balancearte ni llevarla detrás de la cabeza.",
    note: "Utiliza un agarre cómodo y conserva la misma variante.",
  },
  fly: {
    name: "Aperturas en polea",
    target: "Pecho",
    image: "Cable_Crossover",
    cue: "Codos ligeramente flexionados. Cierra los brazos con control frente al pecho y regresa sin perder la tensión.",
    note: "Elige una carga que permita completar todo el recorrido.",
  },
  lyingCurl: {
    name: "Curl femoral tumbado",
    target: "Isquiotibiales",
    image: "Lying_Leg_Curls",
    cue: "Mantén la pelvis apoyada. Flexiona con control y regresa sin dejar caer la carga.",
    note: "Usa la misma máquina para comparar cargas.",
  },
  inclineCurl: {
    name: "Curl inclinado con mancuernas",
    target: "Bíceps",
    image: "Incline_Dumbbell_Curl",
    cue: "Espalda apoyada en el banco inclinado, codos hacia atrás. Estira por completo y sube sin impulso.",
    note: "Registra el peso de una sola mancuerna.",
  },
  overhead: {
    name: "Extensión de tríceps sobre la cabeza",
    target: "Tríceps",
    image: "Cable_Rope_Overhead_Triceps_Extension",
    cue: "Codos apuntando al frente y estables. Extiende por completo y regresa hasta sentir el estiramiento.",
    note: "Mantén el mismo accesorio y la misma posición.",
  },
} as const;

// label: "1", "2" = ejercicio solo; "3a" + "3b" = superserie (se alternan).
// rest: segundos de descanso tras completar una serie de ese ejercicio.
export type Prescription = { id: ExerciseKey; reps: string; label: string; rest: number };
export type Day = {
  key: DayKey;
  weekday: string;
  title: string;
  description: string;
  accent: string;
  exercises: Prescription[];
  extras?: string[];
};

const rx = (id: ExerciseKey, reps: string, label: string, rest: number): Prescription => ({ id, reps, label, rest });

export const DAYS: Day[] = [
  {
    key: "A",
    weekday: "Lunes",
    title: "Construye tu fuerza.",
    description: "Sentadilla y peso muerto rumano; después cuatro superseries de torso, piernas y brazos.",
    accent: "#c6f36b",
    exercises: [
      rx("squat", "6–8", "1", 150),
      rx("rdl", "8–10", "2", 120),
      rx("bench", "8–10", "3a", 45),
      rx("cableRow", "10–12", "3b", 90),
      rx("dbShoulder", "8–10", "4a", 45),
      rx("pulldown", "10–12", "4b", 90),
      rx("extension", "12–15", "5a", 45),
      rx("lateral", "12–15", "5b", 90),
      rx("ez", "10–12", "6a", 45),
      rx("pushdown", "10–12", "6b", 90),
    ],
    extras: ["Pantorrillas 2 × 12–15", "Plancha 2 × 40 s"],
  },
  {
    key: "B",
    weekday: "Miércoles",
    title: "Empuja. Tira. Progresa.",
    description: "Prensa y hip thrust; trabajo unilateral, fondos y pantorrillas.",
    accent: "#a9caff",
    exercises: [
      rx("press", "8–10", "1", 120),
      rx("thrust", "8–10", "2", 120),
      rx("incline", "8–10", "3a", 45),
      rx("oneRow", "10–12 por brazo", "3b", 90),
      rx("neutral", "6–8", "4a", 45),
      rx("dipsChoice", "8–10", "4b", 90),
      rx("curl", "10–12", "5a", 45),
      rx("face", "12–15", "5b", 90),
      rx("hammer", "10–12", "6a", 45),
      rx("standingCalf", "12–15", "6b", 90),
    ],
  },
  {
    key: "C",
    weekday: "Viernes",
    title: "Completa la semana.",
    description: "Búlgara, hiperextensión y cuatro superseries de torso y accesorios.",
    accent: "#d5b4ff",
    exercises: [
      rx("bulgarian", "8–10 por pierna", "1", 120),
      rx("hyper", "10–12", "2", 90),
      rx("chestMachine", "8–10", "3a", 45),
      rx("row", "10–12", "3b", 90),
      rx("wide", "10–12", "4a", 45),
      rx("fly", "12–15", "4b", 90),
      rx("lyingCurl", "10–12", "5a", 45),
      rx("lateral", "12–15", "5b", 90),
      rx("inclineCurl", "10–12", "6a", 45),
      rx("overhead", "10–12", "6b", 90),
    ],
    extras: ["Pantorrillas 2 × 12–15", "Plancha 2 × 40 s"],
  },
];

// Agrupa por número de label: [["1"], ["2"], ["3a","3b"], ...]. Un grupo de 2 es una superserie.
export function blocksOf(day: Day): Prescription[][] {
  const groups: Prescription[][] = [];
  for (const item of day.exercises) {
    const last = groups[groups.length - 1];
    if (last && parseInt(last[0].label) === parseInt(item.label)) last.push(item);
    else groups.push([item]);
  }
  return groups;
}
