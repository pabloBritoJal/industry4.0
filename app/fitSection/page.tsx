"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";

// Reemplazo completo de app/page.tsx. Solo requiere React y Next.js.
type DayKey = "A" | "B" | "C";
type ExerciseKey = keyof typeof EXERCISES;
type SetLog = { kg: string; reps: string; done: boolean };
type WorkoutLog = Record<string, [SetLog, SetLog]>;
type Journal = Record<string, WorkoutLog>;
const STORAGE_KEY = "pablo-fullbody-v1";
const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

const EXERCISES = {
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

type Prescription = { id: ExerciseKey; reps: string };
type Day = {
  key: DayKey;
  weekday: string;
  title: string;
  description: string;
  accent: string;
  exercises: Prescription[];
};
const DAYS: Day[] = [
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

function todayLocal() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function emptySet(): SetLog {
  return { kg: "", reps: "", done: false };
}
function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}
function parseJournal(raw: string | null): Journal {
  if (!raw) return {};
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  const journal: Journal = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (
      !/^\d{4}-\d{2}-\d{2}:[ABC]$/.test(key) ||
      !value ||
      typeof value !== "object" ||
      Array.isArray(value)
    )
      continue;
    const workout: WorkoutLog = {};
    for (const [id, sets] of Object.entries(value)) {
      if (
        !Object.hasOwn(EXERCISES, id) ||
        !Array.isArray(sets) ||
        sets.length !== 2
      )
        continue;
      if (
        sets.every(
          (set) =>
            set &&
            typeof set.kg === "string" &&
            typeof set.reps === "string" &&
            typeof set.done === "boolean",
        )
      )
        workout[id] = sets as [SetLog, SetLog];
    }
    journal[key] = workout;
  }
  return journal;
}

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={down ? { transform: "rotate(90deg)" } : undefined}
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Check() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Reference({
  exercise,
}: {
  exercise: (typeof EXERCISES)[ExerciseKey];
}) {
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  return (
    <div className="fb-reference">
      <div className="fb-reference-images">
        {[0, 1].map((frame) => (
          <figure key={frame}>
            <div>
              {failed[frame] ? (
                <span className="fb-image-fallback">
                  Referencia no disponible
                </span>
              ) : (
                <img
                  src={`${IMAGE_BASE}${exercise.image}/${frame}.jpg`}
                  alt={`${exercise.name}: ${frame === 0 ? "posición inicial" : "posición final"}`}
                  loading="lazy"
                  onError={() =>
                    setFailed((current) => ({ ...current, [frame]: true }))
                  }
                />
              )}
            </div>
            <figcaption>
              {frame === 0 ? "01 / Inicio" : "02 / Final"}
            </figcaption>
          </figure>
        ))}
      </div>
      <a
        href={`https://github.com/yuhonas/free-exercise-db/tree/main/exercises/${exercise.image}`}
        target="_blank"
        rel="noreferrer"
      >
        Referencia: Free Exercise DB ↗
      </a>
    </div>
  );
}

function ExerciseRow({
  item,
  index,
  sets,
  onUpdate,
  onRest,
}: {
  item: Prescription;
  index: number;
  sets: [SetLog, SetLog];
  onUpdate: (set: 0 | 1, patch: Partial<SetLog>) => void;
  onRest: (seconds: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const exercise = EXERCISES[item.id];
  const complete = sets.every((set) => set.done);
  return (
    <article className={`fb-exercise${complete ? " is-complete" : ""}`}>
      <div className="fb-exercise-main">
        <span className="fb-exercise-number">
          {complete ? <Check /> : String(index + 1).padStart(2, "0")}
        </span>
        <button
          type="button"
          className="fb-exercise-heading"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={detailsId}
        >
          <span className="fb-muscle">{exercise.target}</span>
          <span className="fb-exercise-name">{exercise.name}</span>
          <span className="fb-details-link">
            {expanded ? "Ocultar técnica" : "Ver técnica e imágenes"}{" "}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </span>
        </button>
        <div className="fb-prescription">
          <strong>
            2 <span>×</span> {item.reps}
          </strong>
          <small>series × repeticiones</small>
        </div>
      </div>
      <div className="fb-set-grid">
        {sets.map((set, setIndex) => (
          <div className={`fb-set${set.done ? " is-done" : ""}`} key={setIndex}>
            <span className="fb-set-label">S{setIndex + 1}</span>
            <label>
              <span className="fb-sr-only">
                {exercise.name}, serie {setIndex + 1}, carga en kilos
              </span>
              <input
                aria-label={`${exercise.name}, serie ${setIndex + 1}, carga en kilos`}
                inputMode="decimal"
                type="text"
                maxLength={12}
                placeholder="kg"
                value={set.kg}
                onChange={(event) =>
                  onUpdate(setIndex as 0 | 1, { kg: event.target.value })
                }
              />
              <span aria-hidden="true">kg</span>
            </label>
            <label>
              <span className="fb-sr-only">
                {exercise.name}, serie {setIndex + 1}, repeticiones realizadas
              </span>
              <input
                aria-label={`${exercise.name}, serie ${setIndex + 1}, repeticiones realizadas`}
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                placeholder="reps"
                value={set.reps}
                onChange={(event) =>
                  onUpdate(setIndex as 0 | 1, { reps: event.target.value })
                }
              />
              <span aria-hidden="true">reps</span>
            </label>
            <button
              type="button"
              className="fb-check"
              aria-label={`${set.done ? "Desmarcar" : "Completar"} serie ${setIndex + 1} de ${exercise.name}`}
              aria-pressed={set.done}
              onClick={() => onUpdate(setIndex as 0 | 1, { done: !set.done })}
            >
              <Check />
            </button>
          </div>
        ))}
      </div>
      {expanded && (
        <div id={detailsId} className="fb-exercise-details">
          <div>
            <p className="fb-eyebrow">La ejecución</p>
            <p>{exercise.cue}</p>
            <p className="fb-exercise-note">{exercise.note}</p>
            <div className="fb-rest-shortcuts">
              <span>Iniciar descanso</span>
              {[60, 90, 120].map((seconds) => (
                <button
                  type="button"
                  key={seconds}
                  onClick={() => onRest(seconds)}
                >
                  {seconds} s
                </button>
              ))}
            </div>
          </div>
          <Reference exercise={exercise} />
        </div>
      )}
    </article>
  );
}

export default function FitnessPlanPage() {
  const [activeDay, setActiveDay] = useState<DayKey>("A");
  const [view, setView] = useState<"routine" | "guide">("routine");
  const [date, setDate] = useState("");
  const [journal, setJournal] = useState<Journal>({});
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [restEnd, setRestEnd] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [restFinished, setRestFinished] = useState(false);
  const [pendingReset, setPendingReset] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Preparando registro…");

  useEffect(() => {
    setDate(todayLocal());
    try {
      setJournal(parseJournal(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready || storageError) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(journal));
      setSaveLabel("Guardado en este navegador");
    } catch {
      setStorageError(true);
    }
  }, [journal, ready, storageError]);
  useEffect(() => {
    setPendingReset(false);
  }, [activeDay, date]);
  useEffect(() => {
    if (restEnd === null) return;
    const tick = () => {
      const value = Math.max(0, Math.ceil((restEnd - Date.now()) / 1000));
      setRemaining(value);
      if (value === 0) {
        setRestEnd(null);
        setRestFinished(true);
      }
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [restEnd]);

  const day = DAYS.find((candidate) => candidate.key === activeDay)!;
  const sessionKey = `${date}:${activeDay}`;
  const session = journal[sessionKey] ?? {};
  const completed = day.exercises.reduce(
    (total, item) =>
      total + (session[item.id]?.filter((set) => set.done).length ?? 0),
    0,
  );
  const progress = (completed / 20) * 100;
  const update = (id: ExerciseKey, set: 0 | 1, patch: Partial<SetLog>) => {
    if (!ready || !date) return;
    setJournal((current) => {
      const workout = current[sessionKey] ?? {};
      const sets: [SetLog, SetLog] = [
        ...(workout[id] ?? [emptySet(), emptySet()]),
      ];
      sets[set] = { ...sets[set], ...patch };
      return { ...current, [sessionKey]: { ...workout, [id]: sets } };
    });
  };
  const startRest = (seconds: number) => {
    setRemaining(seconds);
    setRestFinished(false);
    setRestEnd(Date.now() + seconds * 1000);
  };
  const reset = () => {
    setJournal((current) => {
      const next = { ...current };
      delete next[sessionKey];
      return next;
    });
    setPendingReset(false);
  };
  const exportJournal = () => {
    const rows = ["fecha,dia,ejercicio,serie,carga_kg,repeticiones,completada"];
    for (const [key, workout] of Object.entries(journal).sort()) {
      const [sessionDate, sessionDay] = key.split(":");
      for (const [id, sets] of Object.entries(workout))
        sets.forEach((set, index) => {
          const name = EXERCISES[id as ExerciseKey]?.name ?? id;
          rows.push(
            [
              sessionDate,
              sessionDay,
              name,
              index + 1,
              set.kg,
              set.reps,
              set.done ? "sí" : "no",
            ]
              .map((value) => `"${String(value).replace(/"/g, '""')}"`)
              .join(","),
          );
        });
    }
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + rows.join("\r\n")], {
        type: "text/csv;charset=utf-8",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mi-progreso-fullbody.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main
      className="fb-app"
      style={{ "--accent": day.accent } as CSSProperties}
    >
      <style>{STYLES}</style>
      <div className="fb-shell">
        <header className="fb-topbar">
          <a className="fb-brand" href="#plan" aria-label="Ir a mi plan">
            <span className="fb-brand-symbol" aria-hidden="true">
              f.
            </span>{" "}
            FULL BODY<span className="fb-brand-tag">/ PABLO</span>
          </a>
          <div className="fb-topbar-right">
            <span className="fb-status-dot" /> PLAN PERSONAL · 8 SEMANAS
          </div>
        </header>

        <section className="fb-hero" id="plan">
          <div className="fb-hero-copy">
            <p className="fb-eyebrow">
              <span /> FUERZA + HIPERTROFIA
            </p>
            <h1>
              Tres días.
              <br />
              <em>Todo el cuerpo.</em>
            </h1>
            <p className="fb-hero-description">
              Una hora para entrenar con intención. Fondos en cada sesión, dos
              series de trabajo y progreso que puedes medir.
            </p>
            <div className="fb-hero-tags">
              <span>Fondos × 3</span>
              <span>Sin sentadillas</span>
              <span>Sin peso muerto</span>
            </div>
          </div>
          <div className="fb-hero-aside">
            <div className="fb-hero-outline" aria-hidden="true">
              3
            </div>
            <span className="fb-hero-aside-label">
              TU SEMANA DE ENTRENAMIENTO
            </span>
            <div className="fb-week-strip">
              {["L", "M", "X", "J", "V", "S", "D"].map((label, index) => (
                <span
                  key={index}
                  className={[0, 2, 4].includes(index) ? "is-training" : ""}
                >
                  {label}
                  <small>
                    {index === 0
                      ? "A"
                      : index === 2
                        ? "B"
                        : index === 4
                          ? "C"
                          : "·"}
                  </small>
                </span>
              ))}
            </div>
            <p>
              Un día de descanso entre sesiones.
              <br />
              Puedes mover los días conservando el orden.
            </p>
          </div>
        </section>

        <section className="fb-stats" aria-label="Resumen del programa">
          {[
            ["03", "sesiones / semana"],
            ["10", "ejercicios / sesión"],
            ["02", "series / ejercicio"],
            ["60", "minutos objetivo"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <nav className="fb-view-nav" aria-label="Secciones del plan">
          <button
            type="button"
            className={view === "routine" ? "is-active" : ""}
            aria-pressed={view === "routine"}
            onClick={() => setView("routine")}
          >
            Mi rutina <span>01</span>
          </button>
          <button
            type="button"
            className={view === "guide" ? "is-active" : ""}
            aria-pressed={view === "guide"}
            onClick={() => setView("guide")}
          >
            Cómo progresar <span>02</span>
          </button>
          <button
            type="button"
            className="fb-export"
            onClick={exportJournal}
            disabled={!ready}
          >
            Exportar registro <Arrow />
          </button>
        </nav>

        {view === "routine" ? (
          <>
            <div
              className="fb-day-tabs"
              role="group"
              aria-label="Seleccionar sesión"
            >
              {DAYS.map((candidate) => (
                <button
                  type="button"
                  key={candidate.key}
                  aria-pressed={activeDay === candidate.key}
                  className={activeDay === candidate.key ? "is-active" : ""}
                  onClick={() => setActiveDay(candidate.key)}
                >
                  <span className="fb-day-letter">{candidate.key}</span>
                  <span>
                    <strong>Día {candidate.key}</strong>
                    <small>{candidate.weekday}</small>
                  </span>
                  <Arrow />
                </button>
              ))}
            </div>
            <div className="fb-workout-layout">
              <section className="fb-workout" aria-labelledby="fb-day-title">
                <div className="fb-workout-header">
                  <div>
                    <p className="fb-eyebrow">SESIÓN {activeDay} / FULL BODY</p>
                    <h2 id="fb-day-title">{day.title}</h2>
                    <p>{day.description}</p>
                  </div>
                  <label className="fb-date">
                    <span>Fecha del registro</span>
                    <input
                      type="date"
                      aria-label="Fecha del registro"
                      value={date}
                      onChange={(event) => {
                        if (event.target.value) setDate(event.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="fb-warmup">
                  <span aria-hidden="true">↗</span>
                  <div>
                    <strong>Primero, prepara el movimiento.</strong>
                    <p>
                      8–10 min: cardio suave y series progresivas de fondos y
                      prensa. Las aproximaciones no cuentan dentro de las dos
                      series.
                    </p>
                  </div>
                </div>
                <div className="fb-pair-explanation">
                  <strong>10 ejercicios · 20 series</strong>
                  <span>
                    Alterna dos ejercicios por pareja. Cada fila es un
                    ejercicio.
                  </span>
                </div>
                <div className="fb-exercises">
                  {Array.from({ length: 5 }, (_, pair) => (
                    <div className="fb-pair" key={`${activeDay}-${pair}`}>
                      <div className="fb-pair-heading">
                        <span>PAREJA {String(pair + 1).padStart(2, "0")}</span>
                        <span>
                          Ejercicios {pair * 2 + 1} + {pair * 2 + 2}
                        </span>
                      </div>
                      {day.exercises
                        .slice(pair * 2, pair * 2 + 2)
                        .map((item, offset) => (
                          <ExerciseRow
                            key={`${activeDay}-${item.id}`}
                            item={item}
                            index={pair * 2 + offset}
                            sets={session[item.id] ?? [emptySet(), emptySet()]}
                            onUpdate={(set, patch) =>
                              update(item.id, set, patch)
                            }
                            onRest={startRest}
                          />
                        ))}
                    </div>
                  ))}
                </div>
                <div className="fb-session-footer">
                  <span
                    className={storageError ? "fb-storage-error" : ""}
                    role="status"
                  >
                    {storageError
                      ? "El guardado local no está disponible. Exporta antes de cerrar."
                      : saveLabel}
                  </span>
                  {pendingReset ? (
                    <div>
                      <span>¿Borrar solo esta fecha y día?</span>
                      <button type="button" onClick={reset}>
                        Sí, borrar
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingReset(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPendingReset(true)}
                      disabled={
                        !ready || !session || Object.keys(session).length === 0
                      }
                    >
                      Limpiar esta sesión
                    </button>
                  )}
                </div>
              </section>
              <aside className="fb-sidebar">
                <section className="fb-progress-card">
                  <p className="fb-eyebrow">TU SESIÓN</p>
                  <div className="fb-progress-value">
                    <strong>
                      {completed}
                      <span>/20</span>
                    </strong>
                    <span>
                      SERIES
                      <br />
                      COMPLETADAS
                    </span>
                  </div>
                  <div
                    className="fb-progress-track"
                    role="progressbar"
                    aria-label="Series completadas"
                    aria-valuemin={0}
                    aria-valuemax={20}
                    aria-valuenow={completed}
                  >
                    <span style={{ width: `${progress}%` }} />
                  </div>
                  <p>
                    {completed === 20
                      ? "Sesión completada. Revisa tus cargas y recupera."
                      : "Marca cada serie al terminar. Tus registros se separan por fecha y día A/B/C."}
                  </p>
                </section>
                <section className="fb-timer">
                  <div className="fb-timer-heading">
                    <p className="fb-eyebrow">DESCANSO</p>
                    <span
                      className={restEnd ? "fb-status-dot" : "fb-idle-dot"}
                    />
                  </div>
                  <div
                    className="fb-timer-number"
                    role="timer"
                    aria-label={`${remaining} segundos de descanso`}
                  >
                    {formatTime(remaining)}
                  </div>
                  <p role="status">
                    {restFinished
                      ? "Descanso terminado. Cuando estés listo, sigue."
                      : restEnd
                        ? "Recupera para la siguiente serie."
                        : "Elige un descanso para comenzar."}
                  </p>
                  <div className="fb-timer-buttons">
                    {[60, 90, 120].map((seconds) => (
                      <button
                        type="button"
                        key={seconds}
                        onClick={() => startRest(seconds)}
                      >
                        {seconds} s
                      </button>
                    ))}
                  </div>
                  {restEnd !== null && (
                    <button
                      type="button"
                      className="fb-stop-timer"
                      onClick={() => {
                        setRestEnd(null);
                        setRemaining(0);
                        setRestFinished(false);
                      }}
                    >
                      Cancelar descanso
                    </button>
                  )}
                </section>
                <section className="fb-rules">
                  <p className="fb-eyebrow">ENTRE CADA SERIE</p>
                  <ol>
                    <li>
                      <span>01</span>
                      <div>
                        Primer ejercicio<strong>Una serie de trabajo.</strong>
                      </div>
                    </li>
                    <li>
                      <span>02</span>
                      <div>
                        Descansa<strong>60 segundos.</strong>
                      </div>
                    </li>
                    <li>
                      <span>03</span>
                      <div>
                        Segundo ejercicio<strong>Una serie de trabajo.</strong>
                      </div>
                    </li>
                    <li>
                      <span>04</span>
                      <div>
                        Descansa y repite
                        <strong>90 segundos; segunda ronda.</strong>
                      </div>
                    </li>
                  </ol>
                  <p>
                    En parejas de accesorios puedes usar 30–60 s entre
                    ejercicios si mantienes técnica y repeticiones.
                  </p>
                </section>
                <section className="fb-time-note">
                  <p className="fb-eyebrow">EL LÍMITE ES UNA HORA</p>
                  <strong>Calidad antes que prisa.</strong>
                  <p>
                    20 series requieren cambios ágiles y equipos disponibles.
                    Intercambia parejas completas si hay esperas. A los 60 min,
                    termina y deja registrado lo pendiente.
                  </p>
                </section>
              </aside>
            </div>
          </>
        ) : (
          <section className="fb-guide" aria-labelledby="fb-guide-title">
            <div className="fb-guide-intro">
              <p className="fb-eyebrow">OCHO SEMANAS CON DIRECCIÓN</p>
              <h2 id="fb-guide-title">Haz que cada semana cuente.</h2>
              <p>
                Conserva los ejercicios y compara cada sesión con el mismo día
                de la semana. La carga de fondos del día A puede ser distinta a
                la del día C.
              </p>
            </div>
            <div className="fb-guide-grid">
              <article>
                <span className="fb-guide-number">01</span>
                <h3>Encuentra tu carga.</h3>
                <p>
                  Primera semana: termina cada serie pudiendo hacer unas 3
                  repeticiones más con buena técnica. Después, trabaja
                  habitualmente con 1–2 repeticiones en reserva.
                </p>
                <strong>Dos series de trabajo por ejercicio.</strong>
              </article>
              <article>
                <span className="fb-guide-number">02</span>
                <h3>Completa el rango.</h3>
                <p>
                  Si el objetivo es 8–12, progresa con el mismo peso hasta
                  conseguir 12 y 12 manteniendo el margen y la técnica
                  previstos.
                </p>
                <strong>Ejemplo: 10 / 9 → 11 / 10 → 12 / 12.</strong>
              </article>
              <article>
                <span className="fb-guide-number">03</span>
                <h3>Aumenta lo mínimo.</h3>
                <p>
                  Cuando completes el máximo en ambas series, usa el incremento
                  más pequeño disponible. En fondos puedes reducir la asistencia
                  o añadir lastre.
                </p>
                <strong>La siguiente sesión puede volver a 8–10 reps.</strong>
              </article>
              <article>
                <span className="fb-guide-number">04</span>
                <h3>Ajusta la recuperación.</h3>
                <p>
                  Si el rendimiento cae durante dos sesiones comparables y
                  sigues fatigado, reduce una semana a una serie por ejercicio
                  con 3–4 repeticiones en reserva. Después retoma.
                </p>
                <strong>El fallo muscular no es obligatorio.</strong>
              </article>
            </div>
            <div className="fb-volume">
              <div>
                <p className="fb-eyebrow">VOLUMEN SEMANAL</p>
                <h3>El trabajo se acumula.</h3>
                <p>
                  Las series compartidas entre músculos no se cuentan aquí como
                  si fueran equivalentes a una serie directa para todos ellos.
                </p>
              </div>
              <div>
                {[
                  ["Pecho", "10", "Fondos + press inclinado"],
                  ["Cuádriceps", "10", "Prensa + extensiones"],
                  ["Espalda", "8", "Remo + jalón"],
                  ["Isquiotibiales", "6", "Curl femoral"],
                  ["Hombro lateral", "6", "Elevaciones laterales"],
                  ["Pantorrillas", "6", "Elevaciones de pantorrilla"],
                ].map(([name, value, note]) => (
                  <div className="fb-volume-row" key={name}>
                    <div>
                      <strong>{name}</strong>
                      <small>{note}</small>
                    </div>
                    <span>
                      {value}
                      <small>series</small>
                    </span>
                  </div>
                ))}
                <p className="fb-volume-extra">
                  Glúteos: 4 series de hip thrust más su participación en
                  prensa. También hay press militar, face pull, bíceps,
                  aductores y abdomen.
                </p>
              </div>
            </div>
            <div className="fb-guide-note">
              <strong>Controla el movimiento.</strong>
              <p>
                En fondos, usa una profundidad cómoda para el hombro. En prensa,
                conserva la pelvis apoyada. El dolor articular requiere ajustar
                carga, recorrido o ejercicio.
              </p>
            </div>
          </section>
        )}
        <footer className="fb-footer">
          <span>FULL BODY / PABLO</span>
          <span>3 días · 2 series · progreso constante</span>
          <a
            href="https://todoculturismo.net/rutina-full-body-de-3-dias-principiantes/"
            target="_blank"
            rel="noreferrer"
          >
            Rutina de referencia ↗
          </a>
        </footer>
      </div>
    </main>
  );
}

const STYLES = `
.fb-app{--accent:#c6f36b;--bg:#0c0e0c;--panel:#141714;--border:#2b302b;--muted:#a3aaa1;min-height:100vh;background:var(--bg);color:#f0f1ea;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color-scheme:dark;padding:0 28px;isolation:isolate}
.fb-app *{box-sizing:border-box}.fb-app button,.fb-app input{font:inherit}.fb-app button,.fb-app a,.fb-app input{touch-action:manipulation}.fb-app button{cursor:pointer;color:inherit}.fb-app button:disabled{opacity:.4;cursor:default}.fb-app button:focus-visible,.fb-app a:focus-visible,.fb-app input:focus-visible{outline:2px solid var(--accent);outline-offset:4px}.fb-app a{color:inherit}.fb-app p,.fb-app h1,.fb-app h2,.fb-app h3,.fb-app figure{margin:0}.fb-app button{border:0;background:none}.fb-shell{max-width:1320px;margin:0 auto}.fb-topbar{min-height:91px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);gap:20px}.fb-brand{display:flex;align-items:center;gap:13px;font-size:14px;font-weight:800;letter-spacing:.13em;text-decoration:none}.fb-brand-symbol{display:grid;place-items:center;background:var(--accent);color:#17200e;width:34px;height:34px;border-radius:9px;font-size:27px;font-weight:900;letter-spacing:-.1em;padding-right:4px}.fb-brand-tag{color:var(--muted);font-size:11px;font-weight:500;letter-spacing:.12em}.fb-topbar-right{display:flex;align-items:center;gap:9px;font-size:10px;color:var(--muted);letter-spacing:.15em}.fb-status-dot,.fb-idle-dot{height:6px;width:6px;display:inline-block;border-radius:50%;background:var(--accent);flex-shrink:0}.fb-idle-dot{background:#666}.fb-hero{display:grid;grid-template-columns:1.5fr 1fr;gap:60px;padding:62px 0 50px;scroll-margin-top:20px}.fb-eyebrow{font-size:10px;font-weight:700;letter-spacing:.17em;color:var(--muted)}.fb-hero .fb-eyebrow{color:var(--accent);display:flex;align-items:center;gap:8px}.fb-hero .fb-eyebrow>span{height:5px;width:5px;background:var(--accent);border-radius:50%}.fb-hero h1{font-size:clamp(48px,5.7vw,79px);line-height:1.03;letter-spacing:-.055em;font-weight:800;margin:22px 0}.fb-hero h1 em{font-style:normal;color:var(--accent)}.fb-hero-description{max-width:445px;font-size:15px;line-height:1.8;color:var(--muted)}.fb-hero-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:25px}.fb-hero-tags span{padding:5px 10px;border:1px solid #343a30;border-radius:5px;font-size:10px;color:#c8cebf}.fb-hero-aside{position:relative;display:flex;justify-content:flex-end;flex-direction:column;overflow:hidden;padding:24px 28px;border:1px solid var(--border);border-radius:12px;background:linear-gradient(145deg,#1a2016,#101310);min-height:285px}.fb-hero-outline{position:absolute;right:20px;top:-104px;font-size:350px;line-height:1.1;font-weight:900;letter-spacing:-.08em;color:transparent;-webkit-text-stroke:1px #3d4a30;opacity:.7;pointer-events:none}.fb-hero-aside-label{position:relative;font-size:9px;letter-spacing:.15em;color:#b8c1ae;margin-bottom:14px}.fb-week-strip{position:relative;display:flex;gap:7px;justify-content:space-between}.fb-week-strip>span{display:flex;flex:1;align-items:center;flex-direction:column;gap:6px;padding:11px 0 8px;border:1px solid #343b2c;background:#161a14;border-radius:6px;color:#8d9685;font-size:11px}.fb-week-strip small{font-size:10px}.fb-week-strip>span.is-training{border-color:var(--accent);background:var(--accent);color:#14200c;font-weight:800}.fb-hero-aside>p{position:relative;margin-top:17px;color:var(--muted);font-size:11px;line-height:1.8}.fb-stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);border-radius:10px;background:#121512}.fb-stats>div{display:flex;align-items:center;gap:15px;padding:24px 27px;border-right:1px solid var(--border)}.fb-stats>div:last-child{border:0}.fb-stats strong{font-size:35px;font-weight:500;line-height:1;letter-spacing:-.06em}.fb-stats span{max-width:90px;font-size:11px;color:var(--muted)}.fb-view-nav{display:flex;align-items:center;gap:30px;border-bottom:1px solid var(--border);margin-top:29px}.fb-view-nav>button{position:relative;padding:18px 0;font-size:12px;color:var(--muted)}.fb-view-nav>button.is-active{color:#f1f2eb}.fb-view-nav>button.is-active:after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--accent)}.fb-view-nav button>span{font-size:9px;color:#89947d;padding-left:7px}.fb-view-nav .fb-export{display:flex;align-items:center;gap:9px;margin-left:auto;font-size:11px}.fb-day-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:29px 0 36px}.fb-day-tabs>button{display:flex;align-items:center;gap:15px;background:#131613;border:1px solid var(--border);border-radius:8px;padding:17px 19px;text-align:left;transition:border-color .15s,background .15s}.fb-day-tabs>button:hover{border-color:#647258}.fb-day-tabs>button.is-active{border-color:var(--accent);background:#1b2315}.fb-day-letter{display:grid;place-items:center;width:35px;height:38px;border:1px solid #394033;border-radius:5px;color:#c6cebc;font-size:19px}.fb-day-tabs .is-active .fb-day-letter{background:var(--accent);color:#15200d;border-color:var(--accent)}.fb-day-tabs button>span:nth-child(2){display:flex;flex-direction:column}.fb-day-tabs strong{font-size:12px}.fb-day-tabs small{font-size:10px;color:var(--muted);margin-top:2px}.fb-day-tabs svg{margin-left:auto;color:var(--muted)}.fb-workout-layout{display:grid;grid-template-columns:minmax(0,1fr) 285px;gap:30px;align-items:start}.fb-workout-header{display:flex;align-items:center;justify-content:space-between;gap:20px}.fb-workout-header h2{font-size:30px;letter-spacing:-.035em;line-height:1.2;margin:8px 0 9px}.fb-workout-header>div>p:last-child{font-size:12px;color:var(--muted)}.fb-date{display:flex;flex-direction:column;gap:6px;flex-shrink:0;font-size:9px;color:var(--muted)}.fb-date input{min-height:38px;max-width:155px;border:1px solid var(--border);border-radius:5px;background:#151915;color:#e0e5d9;padding:7px 9px;font-size:11px}.fb-warmup{margin:23px 0 24px;display:flex;gap:13px;padding:15px 17px;background:#171c13;border:1px solid #303d22;border-radius:7px}.fb-warmup>span{color:var(--accent);font-size:22px;line-height:1}.fb-warmup strong{font-size:11px;color:#d6e6bc}.fb-warmup p{font-size:11px;color:#a9b59b;line-height:1.8;margin-top:4px}.fb-pair-explanation{display:flex;justify-content:space-between;gap:10px;font-size:10px;margin-bottom:18px;color:var(--muted)}.fb-pair-explanation strong{color:#c9d0c3}.fb-pair{margin-bottom:20px;border:1px solid var(--border);border-radius:9px;overflow:hidden;background:#121512}.fb-pair-heading{display:flex;justify-content:space-between;padding:10px 15px;background:#1c2119;color:#b7c2aa;font-size:9px;letter-spacing:.11em}.fb-pair-heading>span:last-child{color:#929e85;letter-spacing:.02em}.fb-exercise{padding:19px 18px}.fb-exercise+.fb-exercise{border-top:1px solid var(--border)}.fb-exercise.is-complete{background:#172012}.fb-exercise-main{display:flex;align-items:center;gap:15px}.fb-exercise-number{font-size:12px;font-variant-numeric:tabular-nums;color:#859279;min-width:23px}.is-complete .fb-exercise-number{color:var(--accent)}.fb-exercise-heading{display:flex;align-items:flex-start;flex:1;min-width:0;flex-direction:column;text-align:left;padding:0}.fb-muscle{font-size:9px;color:#9caa8f;letter-spacing:.04em}.fb-exercise-name{font-size:15px;font-weight:600;line-height:1.4;margin:4px 0}.fb-details-link{font-size:9px;color:#8e9985;display:flex;gap:8px;align-items:center}.fb-details-link>span{font-size:13px;color:var(--accent)}.fb-prescription{text-align:right;flex-shrink:0}.fb-prescription strong{font-size:17px;font-weight:500;font-variant-numeric:tabular-nums}.fb-prescription strong span{font-size:12px;color:#7e8a74;margin:0 3px}.fb-prescription small{display:block;color:#89957f;font-size:8px;margin-top:3px}.fb-set-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:17px 0 0 38px}.fb-set{display:flex;align-items:center;gap:7px;min-width:0;border:1px solid #30372b;border-radius:6px;padding:6px 7px;background:#0e120d}.fb-set-label{font-size:9px;color:#98a88a;min-width:16px}.fb-set label{display:flex;align-items:center;gap:2px;min-width:0;flex:1}.fb-set input{width:100%;min-width:0;height:30px;border:0;border-radius:3px;background:#1b2117;color:#f0f3e9;padding:4px 5px;font-size:12px;text-align:center;-moz-appearance:textfield}.fb-set input::-webkit-inner-spin-button,.fb-set input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.fb-set input::placeholder{color:#75816a;font-size:10px}.fb-set label>span:last-child{font-size:8px;color:#7f8a75}.fb-check{width:32px;min-width:32px;height:32px;display:grid;place-items:center;border:1px solid #3a4531!important;border-radius:5px;color:#67735c!important}.is-done .fb-check{background:var(--accent)!important;color:#17240c!important;border-color:var(--accent)!important}.fb-check:hover{border-color:var(--accent)!important}.fb-exercise-details{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0 0 38px;padding-top:18px;border-top:1px solid var(--border)}.fb-exercise-details>div>p:nth-child(2){font-size:12px;color:#c8d0c1;line-height:1.8;margin-top:9px}.fb-exercise-note{margin-top:10px!important;font-size:10px;color:#a6b298;line-height:1.7}.fb-reference-images{display:grid;grid-template-columns:1fr 1fr;gap:6px}.fb-reference-images figure>div{background:#f6f6f2;aspect-ratio:1;border-radius:5px;overflow:hidden;display:grid;place-items:center}.fb-reference img{width:100%;height:100%;object-fit:contain}.fb-reference figcaption{font-size:8px;color:#9da991;margin-top:5px;letter-spacing:.05em}.fb-reference>a{display:inline-block;font-size:8px;color:#97a788;margin-top:7px;text-underline-offset:3px}.fb-image-fallback{font-size:9px;color:#555;padding:10px;text-align:center}.fb-rest-shortcuts{display:flex;gap:5px;align-items:center;flex-wrap:wrap;margin-top:15px}.fb-rest-shortcuts>span{font-size:9px;color:var(--muted);margin-right:4px}.fb-rest-shortcuts button{font-size:10px;border:1px solid #3b4930;border-radius:4px;padding:5px 7px;color:#c9dfb5}.fb-sidebar{display:flex;flex-direction:column;gap:17px;position:sticky;top:22px}.fb-sidebar>section{border:1px solid var(--border);border-radius:9px;padding:21px;background:#131713}.fb-progress-card .fb-eyebrow{color:#b4c2a5}.fb-progress-value{display:flex;align-items:center;justify-content:space-between;margin:13px 0 16px}.fb-progress-value>strong{font-size:50px;font-weight:500;letter-spacing:-.065em;line-height:1}.fb-progress-value>strong>span{font-size:25px;color:#75806d;margin-left:3px;letter-spacing:-.04em}.fb-progress-value>span{font-size:8px;color:#a4b297;letter-spacing:.08em}.fb-progress-track{height:4px;background:#333d2c;border-radius:3px;overflow:hidden}.fb-progress-track>span{display:block;height:100%;background:var(--accent);transition:width .2s}.fb-progress-card>p:last-child{font-size:10px;color:#a2b095;line-height:1.8;margin-top:13px}.fb-timer-heading{display:flex;align-items:center;justify-content:space-between}.fb-timer-number{font-size:54px;letter-spacing:-.055em;line-height:1.1;margin:17px 0 9px;font-weight:400;font-variant-numeric:tabular-nums}.fb-timer>p{color:#9ca990;font-size:10px;min-height:30px}.fb-timer-buttons{display:flex;gap:7px;margin-top:15px}.fb-timer-buttons>button{flex:1;border:1px solid #3a4631;border-radius:5px;padding:9px 4px;font-size:11px;background:#1d2518}.fb-timer-buttons>button:hover,.fb-rest-shortcuts>button:hover{border-color:var(--accent)}.fb-stop-timer{font-size:9px;color:var(--muted)!important;text-decoration:underline;margin-top:12px;padding:3px 0}.fb-rules ol{list-style:none;padding:0;margin:19px 0 0;display:flex;flex-direction:column;gap:16px}.fb-rules li{display:flex;gap:12px;align-items:flex-start}.fb-rules li>span{font-size:9px;color:#7f906e;border:1px solid #35442b;border-radius:50%;width:23px;height:23px;display:grid;place-items:center;flex-shrink:0}.fb-rules li>div{font-size:11px;line-height:1.5;color:#d5ddcd}.fb-rules li strong{font-size:10px;font-weight:400;display:block;color:#96a789;margin-top:2px}.fb-rules>p{font-size:10px;color:#9cac90;line-height:1.8;margin-top:20px;padding-top:14px;border-top:1px solid var(--border)}.fb-time-note{background:transparent!important}.fb-time-note>strong{font-size:16px;display:block;margin:10px 0}.fb-time-note>p:last-child{font-size:11px;color:#a1ad98;line-height:1.8}.fb-session-footer{display:flex;justify-content:space-between;align-items:center;gap:15px;font-size:10px;color:#97a58b;flex-wrap:wrap}.fb-session-footer button{font-size:10px;padding:6px 0;color:#adb7a4;text-decoration:underline;text-underline-offset:3px}.fb-session-footer>div{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.fb-storage-error{color:#f2bd81}.fb-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 0;margin-top:55px;border-top:1px solid var(--border);font-size:9px;color:#839078;letter-spacing:.05em}.fb-footer>a{text-decoration:none}.fb-footer>a:hover{text-decoration:underline}.fb-guide{padding-top:38px}.fb-guide-intro{max-width:690px}.fb-guide-intro h2{font-size:38px;letter-spacing:-.04em;line-height:1.15;margin:13px 0 18px}.fb-guide-intro>p:last-child{font-size:14px;color:var(--muted);line-height:1.8}.fb-guide-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:30px 0}.fb-guide-grid article{border:1px solid var(--border);border-radius:10px;padding:27px;background:#131713}.fb-guide-number{font-size:11px;color:var(--accent)}.fb-guide-grid h3{font-size:23px;letter-spacing:-.03em;margin:16px 0 12px}.fb-guide-grid p{font-size:13px;line-height:1.9;color:var(--muted)}.fb-guide-grid article>strong{display:block;font-size:11px;color:#d1e7bc;margin-top:17px;font-weight:500}.fb-volume{display:grid;grid-template-columns:1fr 1fr;gap:70px;padding:30px 0}.fb-volume h3{font-size:30px;letter-spacing:-.04em;margin:12px 0}.fb-volume>div>p:last-child{font-size:12px;color:var(--muted);line-height:1.9}.fb-volume-row{display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--border)}.fb-volume-row:first-child{padding-top:0}.fb-volume-row strong{font-size:13px;font-weight:500}.fb-volume-row small{display:block;font-size:10px;color:var(--muted);margin-top:3px}.fb-volume-row>span{font-size:25px;color:var(--accent);line-height:1;text-align:right}.fb-volume-row>span small{font-size:8px;margin-top:6px}.fb-volume-extra{margin-top:18px!important}.fb-guide-note{border-left:2px solid var(--accent);padding:15px 20px;background:#182013;margin-top:20px}.fb-guide-note>strong{font-size:13px}.fb-guide-note>p{font-size:12px;line-height:1.8;color:var(--muted);margin-top:7px}.fb-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
@media(min-width:1500px){.fb-app{padding-left:50px;padding-right:50px}}
@media(max-width:1050px){.fb-workout-layout{grid-template-columns:minmax(0,1fr) 245px;gap:20px}.fb-stats>div{padding:22px 18px;gap:12px}.fb-stats strong{font-size:30px}.fb-stats span{font-size:10px}.fb-hero{gap:35px}.fb-exercise-name{font-size:14px}.fb-workout-header{align-items:flex-start;flex-direction:column;gap:15px}.fb-date{flex-direction:row;align-items:center;gap:12px}.fb-sidebar>section{padding:18px}.fb-set-grid{margin-left:0}.fb-exercise-details{margin-left:0}.fb-hero-aside{padding:22px}.fb-pair-explanation{flex-direction:column;gap:4px}}
@media(max-width:800px){.fb-app{padding:0 20px}.fb-topbar{min-height:75px}.fb-topbar-right{font-size:8px;letter-spacing:.08em}.fb-brand-tag{display:none}.fb-hero{padding:38px 0 30px;gap:25px;grid-template-columns:1.3fr 1fr}.fb-hero h1{font-size:49px}.fb-hero-description{font-size:12px}.fb-hero-aside{min-height:250px;padding:17px}.fb-week-strip{gap:4px}.fb-week-strip>span{font-size:9px}.fb-hero-aside-label{font-size:8px}.fb-hero-aside>p{font-size:9px}.fb-hero-outline{font-size:280px;top:-65px}.fb-stats>div{flex-direction:column;align-items:flex-start;gap:8px;padding:18px}.fb-stats span{max-width:none}.fb-workout-layout{grid-template-columns:minmax(0,1fr)}.fb-sidebar{position:static;display:grid;grid-template-columns:1fr 1fr;gap:15px}.fb-rules{grid-row:span 2}.fb-sidebar .fb-progress-card{grid-column:1 / -1}.fb-progress-card .fb-progress-value{margin:8px 0 12px}.fb-progress-card .fb-progress-value>strong{font-size:40px}.fb-sidebar .fb-time-note{grid-column:1 / -1}.fb-workout-header{flex-direction:row;align-items:center}.fb-date{flex-direction:column;align-items:flex-start;gap:6px}.fb-day-tabs{margin-bottom:28px}.fb-exercise-name{font-size:16px}.fb-set-grid{margin-left:38px}.fb-volume{gap:35px}.fb-footer{margin-top:35px}}
@media(max-width:540px){.fb-app{padding:0 14px}.fb-topbar{min-height:69px}.fb-brand{font-size:11px;gap:8px}.fb-brand-symbol{width:30px;height:30px;font-size:24px}.fb-topbar-right{max-width:115px;font-size:8px;line-height:1.7;gap:7px;letter-spacing:.06em}.fb-hero{grid-template-columns:1fr;gap:24px;padding:30px 0 24px}.fb-hero h1{font-size:51px;margin:17px 0}.fb-hero-description{font-size:13px;max-width:340px}.fb-hero-tags{margin-top:18px;gap:6px}.fb-hero-tags span{font-size:9px}.fb-hero-aside{min-height:0;padding:17px}.fb-hero-outline{font-size:230px;right:10px;top:-60px}.fb-week-strip{max-width:360px;gap:6px}.fb-week-strip>span{font-size:10px;gap:3px;padding:7px 0}.fb-hero-aside-label{font-size:8px;margin-bottom:11px}.fb-hero-aside>p{font-size:10px;margin-top:11px}.fb-stats>div{padding:14px 9px;gap:7px}.fb-stats strong{font-size:27px}.fb-stats span{font-size:8px;line-height:1.6}.fb-view-nav{gap:18px;margin-top:17px}.fb-view-nav>button{font-size:11px;padding:15px 0}.fb-view-nav button>span{display:none}.fb-view-nav .fb-export{font-size:9px;gap:5px}.fb-export svg{width:14px}.fb-day-tabs{gap:7px;margin:20px 0 26px}.fb-day-tabs>button{padding:12px 9px;gap:8px;border-radius:6px}.fb-day-letter{width:25px;height:31px;font-size:16px}.fb-day-tabs strong{font-size:10px}.fb-day-tabs small{font-size:8px}.fb-day-tabs svg{display:none}.fb-workout-header{flex-direction:column;align-items:flex-start;gap:13px}.fb-workout-header h2{font-size:28px}.fb-workout-header>div>p:last-child{font-size:11px;line-height:1.8}.fb-date{flex-direction:row;align-items:center;gap:11px}.fb-date input{max-width:150px}.fb-warmup{margin-top:18px;padding:12px;gap:10px}.fb-warmup p{font-size:10px}.fb-warmup strong{font-size:10px}.fb-pair-explanation{font-size:9px;margin-bottom:14px}.fb-pair{margin-bottom:15px}.fb-pair-heading{font-size:8px;padding:9px 12px}.fb-exercise{padding:16px 12px}.fb-exercise-main{gap:9px}.fb-exercise-number{font-size:11px;min-width:21px}.fb-exercise-name{font-size:13px;margin:4px 0;max-width:205px}.fb-muscle{font-size:8px}.fb-details-link{font-size:8px;gap:5px}.fb-prescription strong{font-size:15px}.fb-prescription small{font-size:7px;max-width:74px}.fb-prescription strong span{margin:0 1px;font-size:10px}.fb-set-grid{margin-left:0;gap:7px;margin-top:14px}.fb-set{gap:4px;padding:5px}.fb-set-label{font-size:8px;min-width:13px}.fb-set label{gap:2px}.fb-set label>span:last-child{font-size:7px}.fb-set input{height:31px;font-size:11px;padding:4px 2px}.fb-check{min-width:30px;width:30px;height:34px}.fb-exercise-details{grid-template-columns:1fr;gap:16px;margin-top:16px}.fb-reference-images{max-width:310px}.fb-reference-images figure>div{aspect-ratio:1.2}.fb-sidebar{gap:12px}.fb-sidebar>section{padding:16px}.fb-timer-number{font-size:42px}.fb-timer-buttons{gap:4px;flex-wrap:wrap}.fb-timer-buttons>button{font-size:10px;min-width:35px}.fb-rules li{gap:8px}.fb-rules li>div{font-size:10px}.fb-rules li strong{font-size:9px}.fb-rules>p{font-size:9px}.fb-session-footer{font-size:9px;align-items:flex-start}.fb-session-footer button{font-size:9px}.fb-footer{align-items:flex-start;gap:12px;flex-wrap:wrap;font-size:8px;padding:23px 0}.fb-footer>span:nth-child(2){display:none}.fb-guide{padding-top:25px}.fb-guide-intro h2{font-size:31px}.fb-guide-intro>p:last-child{font-size:12px}.fb-guide-grid{grid-template-columns:1fr;gap:12px;margin:24px 0}.fb-guide-grid article{padding:21px}.fb-guide-grid h3{font-size:22px;margin:11px 0}.fb-guide-grid p{font-size:12px}.fb-volume{grid-template-columns:1fr;gap:25px;padding:20px 0}.fb-volume h3{font-size:27px}.fb-guide-note{padding:14px}.fb-guide-note>p{font-size:11px}}
@media(prefers-reduced-motion:reduce){.fb-app *{scroll-behavior:auto!important;transition:none!important}}
@media print{.fb-app{background:#fff;color:#111;padding:0;--accent:#111}.fb-sidebar,.fb-hero-aside,.fb-view-nav,.fb-set-grid,.fb-details-link,.fb-date,.fb-session-footer,.fb-footer,.fb-day-tabs{display:none!important}.fb-hero{padding:15px 0}.fb-hero h1{font-size:35px}.fb-hero h1 em{color:#111}.fb-workout-layout{display:block}.fb-stats,.fb-pair,.fb-exercise,.fb-warmup{background:#fff;color:#111;border-color:#ccc}.fb-pair{break-inside:avoid}.fb-pair-heading{background:#eee;color:#111}.fb-exercise-name,.fb-prescription,.fb-muscle,.fb-workout-header p,.fb-warmup p,.fb-warmup strong{color:#222}.fb-hero-tags span{color:#333}.fb-exercise{padding:12px}.fb-stats>div{padding:12px}.fb-workout-header{margin-top:20px}.fb-hero-description,.fb-eyebrow,.fb-stats span,.fb-pair-explanation{color:#444}}
`;
