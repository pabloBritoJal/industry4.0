// Contenido editorial del plan: calentamiento, reglas, tiempo y progresión (texto original de la rutina).

export function Warmup() {
  return (
    <div className="fb-warmup">
      <div>
        <strong>Calentamiento · 8 min</strong>
        <ul>
          <li>5 min de bici o elíptica.</li>
          <li>1 min de movilidad de cadera y hombros.</li>
          <li>2 series de aproximación del ejercicio 1: 10 reps con el 50% del peso, luego 5 reps con el 75%.</li>
        </ul>
      </div>
    </div>
  );
}

export function SessionNotes() {
  return (
    <div className="fb-notes">
      <section>
        <p className="fb-eyebrow">Superseries (a / b)</p>
        <ol>
          <li><span>01</span><div>Serie a<strong>Una serie de trabajo.</strong></div></li>
          <li><span>02</span><div>Descansa<strong>45 segundos.</strong></div></li>
          <li><span>03</span><div>Serie b<strong>Una serie de trabajo.</strong></div></li>
          <li><span>04</span><div>Descansa y repite<strong>90 segundos; segunda ronda.</strong></div></li>
        </ol>
      </section>
      <section>
        <p className="fb-eyebrow">Esfuerzo y ritmo</p>
        <p><strong>Esfuerzo:</strong> termina cada serie a 1–2 repeticiones del fallo.</p>
        <p><strong>Ritmo:</strong> baja el peso en 2–3 segundos y súbelo con control.</p>
      </section>
    </div>
  );
}

const TIME = [
  ["Calentamiento", "8"],
  ["Ejercicios 1 y 2", "9"],
  ["4 superseries (unos 8 min cada una)", "32"],
  ["Cambios de máquina y extra opcional", "6–10"],
  ["Total", "55–60"],
];

const STEPS = [
  {
    title: "Sube peso.",
    text: "Cuando hagas el número más alto del rango en las 2 series, sube el peso la siguiente sesión. Por ejemplo, si haces 10 y 10 en un rango de 8–10, sube 2,5 kg con barra o pasa a la siguiente mancuerna.",
  },
  {
    title: "Semanas 1–2.",
    text: "Termina a 3 repeticiones del fallo mientras aprendes la técnica.",
  },
  {
    title: "Semanas 3–6.",
    text: "Termina a 1–2 repeticiones del fallo. En los ejercicios pequeños (bíceps, tríceps, laterales), la última serie puede llegar casi al fallo.",
  },
  {
    title: "Semana 7: descarga.",
    text: "1 sola serie por ejercicio, con el mismo peso.",
  },
  {
    title: "Después.",
    text: "Repite el ciclo de 6 semanas, empezando con los pesos que ya alcanzaste.",
  },
];

export function Guide() {
  return (
    <section className="fb-guide" aria-labelledby="fb-guide-title">
      <p className="fb-eyebrow">Cómo progresar</p>
      <h2 id="fb-guide-title">Haz que cada semana cuente.</h2>

      <div className="fb-steps">
        {STEPS.map((step, i) => (
          <article key={step.title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="fb-volume">
        <p className="fb-eyebrow">Tiempo por sesión</p>
        {TIME.map(([name, value], i) => (
          <div className="fb-volume-row" key={name}>
            <div><strong>{name}</strong></div>
            <span>{value}<small> min</small></span>
          </div>
        ))}
      </div>

      <div className="fb-warmup">
        <div>
          <strong>Series semanales por músculo</strong>
          <p>
            Pecho 10, espalda 12, cuádriceps 8, femorales 8, glúteos 8–10, hombros 8 y brazos 6–8. Está dentro del
            rango recomendado por la evidencia.
          </p>
        </div>
      </div>
    </section>
  );
}
