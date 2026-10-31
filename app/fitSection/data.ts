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
  dips: {
    name: "Fondos en paralelas",
    target: "Pecho · tríceps",
    image: "Dips_-_Chest_Version",
    cue: "Baja con control hasta una profundidad cómoda para tus hombros. Usa asistencia o lastre para alcanzar el rango indicado.",
    note: "Registra lastre con signo + y asistencia con signo −. Con tu peso corporal, escribe 0.",
  },
  curl: {
    name: "Curl femoral sentado",
    target: "Isquiotibiales",
    image: "Seated_Leg_Curl",
    cue: "Ajusta el eje de la máquina a tu rodilla. Mantén la pelvis apoyada y controla el regreso.",
    note: "Elige una carga que permita completar todo el recorrido cómodo.",
  },
  press: {
    name: "Prensa de piernas",
    target: "Cuádriceps · glúteos",
    image: "Leg_Press",
    cue: "Mantén la espalda y la pelvis apoyadas. Baja sin despegar la cadera y empuja sin rebotes.",
    note: "Usa la misma máquina y posición de pies para comparar cargas.",
  },
  row: {
    name: "Remo con pecho apoyado",
    target: "Espalda media · dorsales",
    image: "Lying_T-Bar_Row",
    cue: "Mantén el pecho en el apoyo. Lleva los codos hacia atrás sin levantar los hombros ni tirar con el cuello.",
    note: "Puedes usar una máquina de remo con apoyo de pecho equivalente.",
  },
  incline: {
    name: "Press inclinado con mancuernas",
    target: "Pecho superior · tríceps",
    image: "Incline_Dumbbell_Press",
    cue: "Mantén las escápulas estables y las muñecas sobre los codos. Baja de forma controlada.",
    note: "Anota el peso de una mancuerna y conserva ese criterio en tus registros.",
  },
  calves: {
    name: "Elevación de pantorrillas",
    target: "Pantorrillas",
    image: "Seated_Calf_Raise",
    cue: "Recorre el rango cómodo completo. Haz una breve pausa arriba y abajo, sin rebotar.",
    note: "Mantén la misma variante de máquina para medir el progreso.",
  },
  extension: {
    name: "Extensión de cuádriceps",
    target: "Cuádriceps",
    image: "Leg_Extensions",
    cue: "Alinea la rodilla con el eje de la máquina. Extiende con control y evita lanzar la carga.",
    note: "Mantén la cadera apoyada durante toda la serie.",
  },
  lateral: {
    name: "Elevaciones laterales",
    target: "Hombro lateral",
    image: "Side_Lateral_Raise",
    cue: "Eleva los brazos hasta una altura cómoda cercana a los hombros. Evita impulsarte con el tronco.",
    note: "Con mancuernas, registra el peso de una sola.",
  },
  thrust: {
    name: "Hip thrust en máquina",
    target: "Glúteos",
    image: "Barbell_Hip_Thrust",
    cue: "Sube extendiendo la cadera. Contrae glúteos arriba sin arquear la espalda.",
    note: "Las imágenes muestran la variante con barra. Prioriza máquina; puedes usar puente de glúteo con carga.",
  },
  face: {
    name: "Face pull",
    target: "Hombro posterior · espalda alta",
    image: "Face_Pull",
    cue: "Lleva la cuerda hacia la cara con control. Mantén el tronco estable y evita encoger el cuello.",
    note: "Prioriza un recorrido controlado antes de aumentar la carga.",
  },
  pulldown: {
    name: "Jalón al pecho",
    target: "Dorsales · bíceps",
    image: "Wide-Grip_Lat_Pulldown",
    cue: "Lleva los codos hacia abajo. Acerca la barra al pecho sin balancearte ni llevarla detrás de la cabeza.",
    note: "Utiliza un agarre cómodo y conserva la misma variante.",
  },
  shoulder: {
    name: "Press militar en máquina",
    target: "Hombros · tríceps",
    image: "Leverage_Shoulder_Press",
    cue: "Ajusta el asiento y mantén la espalda apoyada. Empuja sin arquear la zona lumbar.",
    note: "La profundidad debe ser cómoda para el hombro.",
  },
  adductor: {
    name: "Aductores en máquina",
    target: "Cara interna del muslo",
    image: "Thigh_Adductor",
    cue: "Cierra las piernas de forma controlada. Regresa sin dejar caer la carga ni forzar la apertura.",
    note: "Ajusta el rango a una posición cómoda de cadera.",
  },
  crunch: {
    name: "Crunch abdominal en polea",
    target: "Abdominales",
    image: "Cable_Crunch",
    cue: "Acerca las costillas a la pelvis. Mantén la cadera relativamente estable y evita tirar solo con los brazos.",
    note: "También puedes usar una máquina de crunch abdominal.",
  },
  biceps: {
    name: "Curl de bíceps con mancuernas",
    target: "Bíceps",
    image: "Dumbbell_Bicep_Curl",
    cue: "Mantén los codos estables y controla la bajada. Evita impulsarte con el tronco.",
    note: "Registra el peso de una mancuerna.",
  },
} as const;

export type Prescription = { id: ExerciseKey; reps: string };
export type Day = {
  key: DayKey;
  weekday: string;
  title: string;
  description: string;
  accent: string;
  exercises: Prescription[];
};
export const DAYS: Day[] = [
  {
    key: "A",
    weekday: "Lunes",
    title: "Construye tu fuerza.",
    description: "Más carga en fondos y prensa. Control en cada repetición.",
    accent: "#c6f36b",
    exercises: [
      { id: "dips", reps: "6–8" },
      { id: "curl", reps: "10–15" },
      { id: "press", reps: "6–10" },
      { id: "row", reps: "6–10" },
      { id: "incline", reps: "8–12" },
      { id: "calves", reps: "10–20" },
      { id: "extension", reps: "10–15" },
      { id: "lateral", reps: "12–20" },
      { id: "thrust", reps: "8–12" },
      { id: "face", reps: "12–20" },
    ],
  },
  {
    key: "B",
    weekday: "Miércoles",
    title: "Espalda y hombros.",
    description: "Tirón vertical, press militar y trabajo completo de piernas.",
    accent: "#a9caff",
    exercises: [
      { id: "dips", reps: "8–12" },
      { id: "curl", reps: "10–15" },
      { id: "press", reps: "10–15" },
      { id: "pulldown", reps: "8–12" },
      { id: "shoulder", reps: "8–12" },
      { id: "calves", reps: "10–20" },
      { id: "extension", reps: "10–15" },
      { id: "lateral", reps: "12–20" },
      { id: "adductor", reps: "12–20" },
      { id: "crunch", reps: "10–20" },
    ],
  },
  {
    key: "C",
    weekday: "Viernes",
    title: "Completa la semana.",
    description: "Énfasis en pecho y espalda, con glúteos y bíceps al cierre.",
    accent: "#d5b4ff",
    exercises: [
      { id: "dips", reps: "10–15" },
      { id: "curl", reps: "10–15" },
      { id: "press", reps: "8–12" },
      { id: "row", reps: "8–12" },
      { id: "incline", reps: "8–12" },
      { id: "calves", reps: "10–20" },
      { id: "pulldown", reps: "8–12" },
      { id: "lateral", reps: "12–20" },
      { id: "thrust", reps: "10–15" },
      { id: "biceps", reps: "10–15" },
    ],
  },
];
