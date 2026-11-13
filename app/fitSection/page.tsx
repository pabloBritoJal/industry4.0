"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  DAYS,
  blocksOf,
  EXERCISES,
  IMAGE_BASE,
  STORAGE_KEY,
  type DayKey,
  type ExerciseKey,
  type Journal,
  type SetLog,
  type WorkoutLog,
} from "./data";
import { STYLES } from "./styles";
import { findPrevious, formatPrevious, shortDate, suggestion } from "./progress";
import { Guide, SessionNotes, Warmup } from "./guide";

const REST_PRESETS = [60, 90, 120];

const SET_COUNT = 2;
const WEEKDAY_TO_DAY: Partial<Record<number, DayKey>> = { 1: "A", 3: "B", 5: "C" };

const emptySet = (): SetLog => ({ kg: "", reps: "", done: false });
const emptySets = (): [SetLog, SetLog] => [emptySet(), emptySet()];

function todayLocal() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// Sugiere el día del plan según el día de la semana (Lun=A, Mié=B, Vie=C); si no toca, el siguiente.
function suggestedDay(): DayKey {
  const weekday = new Date().getDay();
  if (WEEKDAY_TO_DAY[weekday]) return WEEKDAY_TO_DAY[weekday]!;
  if (weekday === 2 || weekday === 0) return weekday === 0 ? "A" : "B";
  return weekday === 4 ? "C" : "A";
}

// Lectura tolerante: ignora entradas inválidas para no perder el resto del historial.
function parseJournal(raw: string | null): Journal {
  if (!raw) return {};
  const data = JSON.parse(raw);
  if (!data || typeof data !== "object") return {};
  const journal: Journal = {};
  for (const [key, workout] of Object.entries(data as Record<string, unknown>)) {
    if (!workout || typeof workout !== "object") continue;
    const clean: WorkoutLog = {};
    for (const [id, sets] of Object.entries(workout as Record<string, unknown>)) {
      if (!Array.isArray(sets)) continue;
      const pair = emptySets();
      for (let i = 0; i < SET_COUNT; i++) {
        const set = sets[i] as Partial<SetLog> | undefined;
        if (!set) continue;
        pair[i] = {
          kg: typeof set.kg === "string" ? set.kg : "",
          reps: typeof set.reps === "string" ? set.reps : "",
          done: set.done === true,
        };
      }
      clean[id] = pair;
    }
    journal[key] = clean;
  }
  return journal;
}

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export default function FitSection() {
  const [journal, setJournal] = useState<Journal>({});
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [date, setDate] = useState("");
  const [activeDay, setActiveDay] = useState<DayKey>("A");
  const [open, setOpen] = useState<ExerciseKey | null>(null);
  const [restEnd, setRestEnd] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [restFinished, setRestFinished] = useState(false);
  const [pendingReset, setPendingReset] = useState(false);
  const [view, setView] = useState<"plan" | "guide">("plan");
  const [autoRest, setAutoRest] = useState(true);

  useEffect(() => {
    setDate(todayLocal());
    setActiveDay(suggestedDay());
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
    } catch {
      setStorageError(true);
    }
  }, [journal, ready, storageError]);

  useEffect(() => setPendingReset(false), [activeDay, date]);

  useEffect(() => {
    if (restEnd === null) return;
    const tick = () => {
      const value = Math.max(0, Math.ceil((restEnd - Date.now()) / 1000));
      setRemaining(value);
      if (value === 0) {
        setRestEnd(null);
        setRestFinished(true);
        try { navigator.vibrate?.(200); } catch { /* sin vibración */ }
      }
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [restEnd]);

  const day = DAYS.find((d) => d.key === activeDay)!;
  const sessionKey = `${date}:${activeDay}`;
  const session: WorkoutLog = journal[sessionKey] ?? {};
  const target = day.exercises.length * SET_COUNT;
  const completed = day.exercises.reduce(
    (total, item) => total + (session[item.id]?.filter((s) => s.done).length ?? 0),
    0,
  );
  const percent = Math.round((completed / target) * 100);
  const volume = day.exercises.reduce(
    (total, item) =>
      total +
      (session[item.id] ?? []).reduce(
        (sum, s) => sum + (s.done ? (Number(s.kg) || 0) * (Number(s.reps) || 0) : 0),
        0,
      ),
    0,
  );
  const sessionsLogged = useMemo(
    () => Object.values(journal).filter((w) => Object.values(w).some((sets) => sets.some((s) => s.done))).length,
    [journal],
  );

  const update = (id: ExerciseKey, index: 0 | 1, patch: Partial<SetLog>) => {
    if (!ready || !date) return;
    setJournal((current) => {
      const workout = current[sessionKey] ?? {};
      const sets: [SetLog, SetLog] = [...(workout[id] ?? emptySets())];
      sets[index] = { ...sets[index], ...patch };
      return { ...current, [sessionKey]: { ...workout, [id]: sets } };
    });
  };

  const toggleDone = (id: ExerciseKey, index: 0 | 1) => {
    const set = (session[id] ?? emptySets())[index];
    const done = !set.done;
    update(id, index, { done });
    if (done && autoRest) startRest(restFor(id));
  };

  const restFor = (id: ExerciseKey) => day.exercises.find((e) => e.id === id)?.rest ?? 90;
  const startRest = (seconds: number) => {
    setRemaining(seconds);
    setRestFinished(false);
    setRestEnd(Date.now() + seconds * 1000);
  };

  const repeatPrevious = (id: ExerciseKey, previous: { sets: [SetLog, SetLog] }) => {
    previous.sets.forEach((set, i) => update(id, i as 0 | 1, { kg: set.kg, reps: set.reps }));
  };

  const stopRest = () => { setRestEnd(null); setRestFinished(false); };

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
      for (const [id, sets] of Object.entries(workout)) {
        sets.forEach((set, index) => {
          const name = EXERCISES[id as ExerciseKey]?.name ?? id;
          rows.push(
            [sessionDate, sessionDay, name, index + 1, set.kg, set.reps, set.done ? "sí" : "no"]
              .map((value) => `"${String(value).replace(/"/g, '""')}"`)
              .join(","),
          );
        });
      }
    }
    const url = URL.createObjectURL(new Blob(["﻿" + rows.join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "mi-progreso-fullbody.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const showRest = restEnd !== null || restFinished;

  return (
    <main className="fb-app" style={{ "--accent": day.accent } as CSSProperties}>
      <style>{STYLES}</style>
      <div className="fb-shell">
        <header className="fb-header">
          <div>
            <p className="fb-eyebrow">Fuerza + hipertrofia · Plan de 8 semanas</p>
            <h1>Tres días. Todo el cuerpo.</h1>
            <p className="fb-sub">
              Full body en 60 minutos: dos básicos al inicio y cuatro superseries. Dos series de trabajo por
              ejercicio y progreso que puedes medir.
            </p>
            <p className="fb-tags"><span>Superseries</span><span>2 series · 60 min</span><span>1–2 reps del fallo</span></p>
          </div>
        </header>

        <div className="fb-views" role="tablist" aria-label="Sección">
          <button type="button" role="tab" aria-selected={view === "plan"} onClick={() => setView("plan")}>Entrenar</button>
          <button type="button" role="tab" aria-selected={view === "guide"} onClick={() => setView("guide")}>Guía de progreso</button>
        </div>

        {view === "guide" ? <Guide /> : (<>
        <p className="fb-week">
          {["L", "M", "X", "J", "V", "S", "D"].map((label, i) => (
            <span key={label} data-on={[0, 2, 4].includes(i)}>{label}<small>{["A", "", "B", "", "C", "", ""][i] || "·"}</small></span>
          ))}
          <em>Un día de descanso entre sesiones; puedes mover los días conservando el orden.</em>
        </p>

        <nav className="fb-tabs" aria-label="Día de entrenamiento">
          {DAYS.map((d) => {
            const done = Object.values(journal[`${date}:${d.key}`] ?? {}).reduce(
              (n, sets) => n + sets.filter((s) => s.done).length,
              0,
            );
            return (
              <button
                key={d.key}
                type="button"
                className="fb-tab"
                aria-pressed={d.key === activeDay}
                style={{ "--tab": d.accent } as CSSProperties}
                onClick={() => setActiveDay(d.key)}
              >
                <b>{d.key}</b>
                <span>{d.weekday}</span>
                {done > 0 && <i aria-label={`${done} series hechas`}>{done}</i>}
              </button>
            );
          })}
        </nav>

        <header className="fb-day">
          <div>
            <p className="fb-eyebrow">Sesión {activeDay} · {day.weekday}</p>
            <h2>{day.title}</h2>
            <p className="fb-sub">{day.description}</p>
          </div>
          <label className="fb-date">
            <span>Fecha del registro</span>
            <input
              type="date"
              value={date}
              onChange={(e) => e.target.value && setDate(e.target.value)}
              aria-label="Fecha del registro"
            />
          </label>
        </header>

        <section className="fb-summary" aria-label="Resumen de la sesión">
          <div className="fb-progress" role="progressbar" aria-valuemin={0} aria-valuemax={target} aria-valuenow={completed}>
            <span style={{ width: `${percent}%` }} />
          </div>
          <dl>
            <div><dt>Series</dt><dd>{completed}/{target}</dd></div>
            <div><dt>Volumen</dt><dd>{Math.round(volume).toLocaleString("es")} kg</dd></div>
            <div><dt>Sesiones</dt><dd>{sessionsLogged}</dd></div>
          </dl>
        </section>

        {storageError && (
          <p className="fb-alert" role="alert">
            Este navegador no permite guardar datos. Lo que registres se perderá al cerrar la página; exporta el CSV al terminar.
          </p>
        )}

        <Warmup />
        <p className="fb-pairnote">
          <strong>{day.exercises.length} ejercicios · {target} series.</strong> En las superseries (a + b) haz una serie de cada ejercicio y descansa después de la b.
        </p>

        <div className="fb-pairs">
        {blocksOf(day).map((block, blockIndex) => (
        <section key={block[0].label} className="fb-pair" aria-label={block.length > 1 ? `Superserie ${blockIndex + 1}` : `Ejercicio ${blockIndex + 1}`}>
        <p className="fb-pair-head">
          <span>{block.length > 1 ? "Superserie" : "Ejercicio"} {String(parseInt(block[0].label)).padStart(2, "0")}</span>
          <span>{block.length > 1 ? `${block.map((e) => e.label).join(" + ")} · alterna` : "Serie completa"}</span>
        </p>
        <ol className="fb-list">
          {block.map((item) => {
            const position = day.exercises.indexOf(item);
            const info = EXERCISES[item.id];
            const sets = session[item.id] ?? emptySets();
            const previous = ready && date ? findPrevious(journal, date, activeDay, item.id) : null;
            const tip = suggestion(previous, item.reps);
            const isOpen = open === item.id;
            const doneCount = sets.filter((s) => s.done).length;
            return (
              <li key={`${item.id}-${position}`} className="fb-card" data-complete={doneCount === SET_COUNT}>
                <div className="fb-card-head">
                  <span className="fb-index">{item.label}</span>
                  <div className="fb-card-title">
                    <h2>{info.name}</h2>
                    <p>{info.target}</p>
                  </div>
                  <div className="fb-reps">
                    <strong>{SET_COUNT} × {item.reps}</strong>
                    <span>reps · descanso {item.rest} s</span>
                  </div>
                </div>

                {previous ? (
                  <p className="fb-prev">
                    <span>Última vez · {shortDate(previous.date)}</span>
                    {formatPrevious(previous)}
                    <button type="button" onClick={() => repeatPrevious(item.id, previous)}>Repetir</button>
                  </p>
                ) : (
                  <p className="fb-prev fb-prev-empty">Primera vez: elige una carga cómoda.</p>
                )}
                {tip && <p className="fb-tip">↑ {tip}</p>}

                <div className="fb-sets">
                  {sets.map((set, i) => (
                    <div key={i} className="fb-set" data-done={set.done}>
                      <span className="fb-set-n">Serie {i + 1}</span>
                      <label>
                        <input
                          inputMode="decimal"
                          type="text"
                          placeholder={previous?.sets[i]?.kg || "0"}
                          value={set.kg}
                          onChange={(e) => update(item.id, i as 0 | 1, { kg: e.target.value.replace(",", ".") })}
                          aria-label={`${info.name}, serie ${i + 1}, carga en kilos`}
                        />
                        <small>kg</small>
                      </label>
                      <label>
                        <input
                          inputMode="numeric"
                          type="text"
                          placeholder={previous?.sets[i]?.reps || (item.reps.match(/\d+/)?.[0] ?? "")}
                          value={set.reps}
                          onChange={(e) => update(item.id, i as 0 | 1, { reps: e.target.value.replace(/\D/g, "") })}
                          aria-label={`${info.name}, serie ${i + 1}, repeticiones`}
                        />
                        <small>reps</small>
                      </label>
                      <button
                        type="button"
                        className="fb-check"
                        aria-pressed={set.done}
                        aria-label={set.done ? `Desmarcar serie ${i + 1}` : `Completar serie ${i + 1}`}
                        onClick={() => toggleDone(item.id, i as 0 | 1)}
                      >
                        {set.done ? "✓" : ""}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="fb-more"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : item.id)}
                >
                  {isOpen ? "Ocultar técnica" : "Ver técnica"}
                </button>
                {isOpen && (
                  <div className="fb-detail">
                    <div className="fb-images">
                      {[0, 1].map((n) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={n}
                          src={`${IMAGE_BASE}${info.image}/${n}.jpg`}
                          alt={`${info.name}, posición ${n === 0 ? "inicial" : "final"}`}
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <p>{info.cue}</p>
                    <p className="fb-note">{info.note}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        </section>
        ))}
        </div>

        {day.extras && (
          <p className="fb-pairnote"><strong>Si te sobra tiempo:</strong> {day.extras.join(" · ")}, con 45 s de descanso.</p>
        )}

        <section className="fb-rest-setup" aria-label="Descanso">
          <p className="fb-eyebrow">Descanso</p>
          <div>
            {REST_PRESETS.map((s) => (
              <button key={s} type="button" onClick={() => startRest(s)}>{s} s</button>
            ))}
          </div>
          <label>
            <input type="checkbox" checked={autoRest} onChange={(e) => setAutoRest(e.target.checked)} />
            Al completar una serie, iniciar el descanso del ejercicio
          </label>
        </section>

        <SessionNotes />
        </>)}

        <footer className="fb-footer">
          <button type="button" onClick={exportJournal} disabled={!Object.keys(journal).length}>
            Exportar CSV
          </button>
          {pendingReset ? (
            <span className="fb-confirm">
              ¿Borrar la sesión {day.key} del {date}?
              <button type="button" className="fb-danger" onClick={reset}>Sí, borrar</button>
              <button type="button" onClick={() => setPendingReset(false)}>Cancelar</button>
            </span>
          ) : (
            <button type="button" onClick={() => setPendingReset(true)} disabled={!session || !Object.keys(session).length}>
              Reiniciar sesión
            </button>
          )}
        </footer>
      </div>

      {showRest && (
        <div className="fb-rest" role="status" aria-live="polite" data-finished={restFinished}>
          <div>
            <span>{restFinished ? "Descanso terminado" : "Descanso"}</span>
            <strong>{restFinished ? "¡A la siguiente serie!" : clock(remaining)}</strong>
          </div>
          <div className="fb-rest-actions">
            {!restFinished && <button type="button" onClick={() => setRestEnd((e) => (e ?? Date.now()) + 15000)}>+15 s</button>}
            <button type="button" onClick={stopRest}>{restFinished ? "Cerrar" : "Saltar"}</button>
          </div>
        </div>
      )}
    </main>
  );
}
