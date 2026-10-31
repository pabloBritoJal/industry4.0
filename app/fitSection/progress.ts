import type { DayKey, ExerciseKey, Journal, SetLog } from "./data";

export type Previous = { date: string; sets: [SetLog, SetLog] };

const hasData = (set: SetLog) => set.kg !== "" || set.reps !== "";

// Última sesión anterior a `date` del mismo día (A/B/C) con datos de este ejercicio.
export function findPrevious(
  journal: Journal,
  date: string,
  day: DayKey,
  id: ExerciseKey,
): Previous | null {
  const dates = Object.keys(journal)
    .filter((key) => key.endsWith(`:${day}`) && key.slice(0, 10) < date)
    .map((key) => key.slice(0, 10))
    .sort()
    .reverse();
  for (const d of dates) {
    const sets = journal[`${d}:${day}`]?.[id];
    if (sets?.some(hasData)) return { date: d, sets };
  }
  return null;
}

// Si ambas series de la última vez llegaron al máximo del rango, toca subir carga.
export function suggestion(previous: Previous | null, range: string) {
  if (!previous) return null;
  const max = Number(range.split("–").pop());
  if (!max) return null;
  const reachedMax = previous.sets.every((set) => Number(set.reps) >= max);
  return reachedMax ? "Llegaste al máximo del rango: sube la carga al mínimo." : null;
}

export function formatPrevious(previous: Previous) {
  return previous.sets
    .map((set) => `${set.kg || "–"} kg × ${set.reps || "–"}`)
    .join("  ·  ");
}

export function shortDate(iso: string) {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}
