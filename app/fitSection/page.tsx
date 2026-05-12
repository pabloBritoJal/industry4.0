"use client"
// app/training-plan/page.tsx

const workouts = [
  {
    day: "Lunes",
    title: "Upper A + Fútbol",
    exercises: [
      ["Press inclinado con mancuernas", "4x6–8", "https://weighttraining.guide/exercises/incline-dumbbell-bench-press/"],
      ["Remo pecho apoyado en máquina", "4x8–10", "#"],
      ["Jalón al pecho agarre supino", "3x10–12", "#"],
      ["Press hombro máquina", "3x8–10", "#"],
      ["Elevaciones laterales", "3x12–15", "#"],
      ["Curl mancuerna alternado", "2x10–12", "#"],
      ["Tríceps polea barra V", "2x10–12", "#"],
    ],
  },
  {
    day: "Martes",
    title: "Lower A",
    exercises: [
      ["Sentadilla hack", "4x8–10", "https://weighttraining.guide/exercises/hack-squat/"],
      ["Hip thrust", "4x8–10", "https://weighttraining.guide/exercises/hip-thrust/"],
      ["Curl femoral sentado", "3x10–12", "#"],
      ["Elevación de talones de pie", "4x12–15", "#"],
      ["McGill Curl-Up", "3x10", "#"],
      ["Bird Dog", "3x10/lado", "https://getfitcraft.com/exercises/bird-dogs"],
      ["Side Plank", "3x30–45s", "#"],
    ],
  },
  {
    day: "Jueves",
    title: "Upper B",
    exercises: [
      ["Press pecho máquina vertical", "4x8–10", "#"],
      ["Remo unilateral", "4x10", "#"],
      ["Jalón neutro", "3x10–12", "#"],
      ["Peck deck", "3x12", "#"],
      ["Elevaciones laterales", "3x15", "#"],
      ["Curl banco inclinado", "2x12", "#"],
      ["Tríceps cuerda", "2x12", "#"],
    ],
  },
  {
    day: "Viernes",
    title: "Lower B",
    exercises: [
      ["Prensa inclinada", "4x10", "#"],
      ["Peso muerto rumano mancuernas", "3x8–10", "#"],
      ["Split squat búlgaro", "3x10/lado", "#"],
      ["Curl femoral", "3x12", "#"],
      ["Gemelos sentado", "4x15", "#"],
      ["Pallof Press", "3x12", "https://www.puregym.com/exercises/abs/pallof-press/"],
      ["Farmer Walk", "3 rondas", "#"],
    ],
  },
];

const metrics = [
  "Peso corporal 3 veces por semana al despertar",
  "Promedio semanal objetivo: +0.3 a +0.5 kg",
  "Fotos cada 2 semanas: frente, perfil y espalda",
  "Registro de cargas: peso, repeticiones y ejercicio",
  "Dolor lumbar escala 1–10",
  "Energía en fútbol y recuperación",
];

const macros = [
  ["Calorías", "3000 kcal"],
  ["Proteína", "180 g"],
  ["Grasas", "80 g"],
  ["Carbohidratos", "360–380 g"],
];

export default function TrainingPlanPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.35),transparent_34rem),linear-gradient(135deg,#020617_0%,#0f172a_48%,#111827_100%)]" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur md:p-10">
            <span className="mb-5 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              Plan 8 semanas · Hipertrofia + fútbol + lumbar
            </span>

            <h1 className="max-w-5xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
              Plan físico para ganar masa muscular sin destruir la espalda
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Hombre, 41 años, 187 cm, 80 kg, principiante en fuerza, trabajo
              sedentario, fútbol 2 veces por semana y dolor lumbar crónico.
            </p>
          </div>

          <aside className="flex rounded-[2rem] border border-blue-300/20 bg-slate-900/80 p-6 shadow-2xl backdrop-blur md:p-8">
            <div className="my-auto">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                Expectativa real
              </p>
              <p className="mt-3 text-6xl font-black tracking-tight text-white sm:text-7xl">
                +3 a +5 kg
              </p>
              <p className="mt-4 leading-7 text-slate-300">
                En 8 semanas si entrenas, comes y duermes con consistencia real.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <InfoCard
            variant="danger"
            title="Diagnóstico honesto"
            text="No estás condenado por genética. Estás comiendo poco, tienes poca masa muscular y falta estructura de fuerza. Saltarte la cena es el error principal."
          />
          <InfoCard
            title="Objetivo realista"
            text="Verte menos delgado, subir fuerza, mejorar postura, estabilizar la zona lumbar y recuperar mejor para el fútbol."
          />
          <InfoCard
            title="Lo que no pasará"
            text="No vas a verte enorme en 8 semanas. Sí puedes cambiar claramente la dirección de tu físico."
          />
        </section>

        <section className="mt-12">
          <SectionHeader
            title="Semana de entrenamiento"
            description="4 sesiones de gimnasio de 50 minutos + fútbol lunes y miércoles."
          />

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {workouts.map((workout) => (
              <article
                key={workout.day}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur"
              >
                <div className="bg-gradient-to-br from-blue-600/60 to-cyan-400/10 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                    {workout.day}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    {workout.title}
                  </h3>
                </div>

                <ul className="divide-y divide-white/10">
                  {workout.exercises.map(([name, reps, link]) => (
                    <li
                      key={name}
                      className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-bold text-white">{name}</p>
                        <p className="mt-1 text-sm text-slate-400">{reps}</p>
                      </div>

                      {link !== "#" && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="w-fit rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-200 transition hover:border-blue-300/60 hover:bg-blue-500/20"
                        >
                          Ver referencia
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur md:p-8">
          <SectionHeader
            title="Nutrición"
            description="El problema no es falta de proteína. Es falta de calorías totales."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {macros.map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-3xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <MenuCard
              title="Menú 1"
              items={[
                "4 huevos, avena, banana, tostadas y café con leche.",
                "Pollo, arroz, verduras y aceite de oliva.",
                "Yogurt griego, granola, fruta y nueces.",
                "Carne o pollo, papa/arroz, palta y verduras.",
                "Antes de dormir: leche o yogurt con fruta.",
              ]}
            />

            <MenuCard
              title="Menú 2"
              items={[
                "Omelette, pan integral, queso y fruta.",
                "Pasta con carne magra y parmesano.",
                "Batido de leche, avena, banana y mantequilla de maní.",
                "Arroz, pollo y verduras salteadas.",
                "Snack nocturno: yogurt griego, miel y nueces.",
              ]}
            />
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur md:p-8">
            <h2 className="text-3xl font-black tracking-tight">Métricas semanales</h2>
            <ul className="mt-6 space-y-4">
              {metrics.map((item) => (
                <li key={item} className="flex gap-3 border-b border-white/10 pb-4 text-slate-300">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-black text-emerald-950">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-emerald-400/20 bg-emerald-950/30 p-6 shadow-2xl backdrop-blur md:p-8">
            <h2 className="text-3xl font-black tracking-tight">Empieza hoy</h2>

            <ol className="mt-6 space-y-4">
              {[
                "Cena completa hoy: proteína + carbohidrato + grasa.",
                "Compra creatina, avena, arroz, huevos, pollo, yogurt, fruta y nueces.",
                "Mañana pésate al despertar.",
                "Registra cargas desde la primera sesión.",
                "Duerme mínimo 7 horas.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3 border-b border-white/10 pb-4 text-slate-200">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-emerald-950">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function InfoCard({
  title,
  text,
  variant,
}: {
  title: string;
  text: string;
  variant?: "danger";
}) {
  return (
    <article
      className={[
        "rounded-[2rem] border bg-slate-900/80 p-6 shadow-2xl backdrop-blur md:p-7",
        variant === "danger" ? "border-red-400/30" : "border-white/10",
      ].join(" ")}
    >
      <h2 className="text-xl font-black text-white">{title}</h2>
      <p className="mt-3 leading-7 text-slate-300">{text}</p>
    </article>
  );
}

function MenuCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl">
      <h3 className="text-2xl font-black text-white">{title}</h3>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-white/[0.04] px-4 py-3 text-slate-300">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}