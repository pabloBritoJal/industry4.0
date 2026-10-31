"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import {
  DAYS,
  EXERCISES,
  IMAGE_BASE,
  STORAGE_KEY,
  type DayKey,
  type ExerciseKey,
  type Journal,
  type Prescription,
  type SetLog,
  type WorkoutLog,
} from "./data";
import { STYLES } from "./styles";
import {
  findPrevious,
  formatPrevious,
  shortDate,
  suggestion,
  type Previous,
} from "./progress";


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
  previous,
  onUpdate,
  onRest,
}: {
  item: Prescription;
  index: number;
  sets: [SetLog, SetLog];
  previous: Previous | null;
  onUpdate: (set: 0 | 1, patch: Partial<SetLog>) => void;
  onRest: (seconds: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const exercise = EXERCISES[item.id];
  const complete = sets.every((set) => set.done);
  const tip = suggestion(previous, item.reps);
  const isEmpty = sets.every((set) => !set.kg && !set.reps);
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
      {previous && (
        <div className="fb-previous">
          <span>
            Última vez · {shortDate(previous.date)}: {formatPrevious(previous)}
          </span>
          {isEmpty && (
            <button
              type="button"
              onClick={() =>
                previous.sets.forEach((set, i) =>
                  onUpdate(i as 0 | 1, { kg: set.kg, reps: set.reps }),
                )
              }
            >
              Repetir
            </button>
          )}
          {tip && <strong>{tip}</strong>}
        </div>
      )}
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
  const [autoRest, setAutoRest] = useState(true);
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
    // Pide al navegador no borrar estos datos al liberar espacio.
    navigator.storage?.persist?.().catch(() => {});
  }, []);
  useEffect(() => {
    // Mantiene la pantalla encendida mientras entrenas.
    let lock: WakeLockSentinel | null = null;
    const request = () =>
      navigator.wakeLock?.request("screen").then((l) => (lock = l), () => {});
    request();
    const onVisible = () => document.visibilityState === "visible" && request();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      lock?.release().catch(() => {});
    };
  }, []);
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
        navigator.vibrate?.([200, 100, 200]);
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
    if (autoRest && patch.done === true) startRest(90);
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
  const backupJournal = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(journal)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `respaldo-fullbody-${todayLocal()}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const restoreJournal = async (file: File | undefined) => {
    if (!file) return;
    try {
      const restored = parseJournal(await file.text());
      setJournal((current) => ({ ...current, ...restored }));
      setSaveLabel("Respaldo restaurado");
    } catch {
      setSaveLabel("No se pudo leer el respaldo");
    }
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
            CSV <Arrow />
          </button>
          <button type="button" onClick={backupJournal} disabled={!ready}>
            Respaldo
          </button>
          <label className="fb-restore">
            Restaurar
            <input
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                restoreJournal(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
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
                            previous={findPrevious(
                              journal,
                              date,
                              activeDay,
                              item.id,
                            )}
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
                  <label className="fb-auto-rest">
                    <input
                      type="checkbox"
                      checked={autoRest}
                      onChange={(event) => setAutoRest(event.target.checked)}
                    />
                    Iniciar 90 s al completar una serie
                  </label>
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

