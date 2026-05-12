"use client";
import React from "react";
import {
  Dumbbell,
  Activity,
  ShieldAlert,
  Zap,
  Calendar,
  Utensils,
} from "lucide-react";

export default function AntiFlacoProgram() {
  return (
    <main className="px-4 py-8 max-w-4xl mx-auto bg-gray-50 min-h-screen text-gray-900 font-sans">
      {/* HEADER - PERFIL REFINADO */}
      <section className="text-center mb-12 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-600">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Protocolo de Volumen{" "}
          <span className="text-blue-600">Ecto-Power 40+</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            187 cm / 80-82 kg
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            Objetivo: Dejar de parecer `&quot;`enfermo`&quot;`
          </span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs">
            LUMBAR: Carga Axial Zero
          </span>
        </div>
      </section>

      {/* RESTRICCIONES CRÍTICAS */}
      <section className="mb-10 bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg shadow-sm">
        <div className="flex items-center mb-3">
          <ShieldAlert className="text-red-600 mr-2" />
          <h2 className="text-xl font-bold text-red-800">
            Regla de Oro: Tu Espalda no es una Grúa
          </h2>
        </div>
        <p className="text-red-900 text-sm leading-relaxed">
          Para eliminar el dolor crónico,{" "}
          <strong>prohibido arquear la espalda</strong>. En todos los ejercicios
          de pie, contrae el glúteo y el abdomen. Si un ejercicio duele en la
          zona lumbar, se aborta inmediatamente.
        </p>
      </section>

      {/* CALENDARIO SEMANAL AJUSTADO */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="mr-2 text-blue-600" /> Distribución Semanal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { d: "Lunes", t: "Gym (Hombros) + Fútbol corto", c: "bg-blue-700" },
            {
              d: "Martes",
              t: "Piernas (Cuádriceps focus)",
              c: "bg-indigo-600",
            },
            {
              d: "Miércoles",
              t: "Fútbol largo (Descanso Gym)",
              c: "bg-green-600",
            },
            {
              d: "Jueves",
              t: "Torso (Pecho/Espalda/Tríceps)",
              c: "bg-purple-600",
            },
            {
              d: "Viernes",
              t: "Brazos + Pierna (Posterior)",
              c: "bg-orange-600",
            },
          ].map((day, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
            >
              <div
                className={`${day.c} text-white text-center py-2 text-xs font-bold uppercase`}
              >
                {day.d}
              </div>
              <div className="p-4 text-center text-xs font-semibold text-gray-700 min-h-[60px] flex items-center justify-center">
                {day.t}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOQUES DE ENTRENAMIENTO */}
      <div className="space-y-8">
        <RoutineBlock
          day="Lunes"
          title="Ancho de Hombros (Pre-Fútbol)"
          notes="Entreno rápido de 40 min para no llegar fundido al partido."
          exercises={[
            {
              name: "Elevaciones Laterales Manc.",
              sets: "4 x 15-20",
              notes: "El ejercicio que te quita lo 'flaco'.",
            },
            {
              name: "Press Mancuernas Sentado",
              sets: "3 x 10",
              notes: "Respaldo a 90°. No arquees lumbares.",
            },
            {
              name: "Curl Martillo (Manc)",
              sets: "3 x 12",
              notes: "Para grosor de antebrazo y brazo.",
            },
            {
              name: "Face Pulls (Cuerda)",
              sets: "3 x 15",
              notes: "Postura erguida para el partido.",
            },
          ]}
        />

        <RoutineBlock
          day="Martes"
          title="Piernas: Cuádriceps y Estabilidad"
          notes="Sin peso en la espalda para proteger lumbares."
          exercises={[
            {
              name: "Prensa de Piernas",
              sets: "4 x 12",
              notes: "Pies a media altura. Baja controlado.",
            },
            {
              name: "Extensiones de Cuádriceps",
              sets: "3 x 15",
              notes: "Sostén 1 seg la contracción arriba.",
            },
            {
              name: "Zancadas (Lunges) Estáticas",
              sets: "3 x 12/p",
              notes: "Mancuernas a los lados, torso recto.",
            },
            {
              name: "Plancha Abdominal",
              sets: "3 x 45s",
              notes: "Core sólido = Espalda sin dolor.",
            },
          ]}
        />

        <RoutineBlock
          day="Jueves"
          title="Torso: Llenando la Camiseta"
          notes="Enfoque en pecho superior y densidad de espalda."
          exercises={[
            {
              name: "Press Inclinado (Manc)",
              sets: "3 x 10",
              notes: "Para que el pecho no se vea 'caído'.",
            },
            {
              name: "Remo Apoyado en Banco",
              sets: "3 x 10-12",
              notes: "Pecho en el banco, cero estrés lumbar.",
            },
            {
              name: "Jalón al Pecho (Neutro)",
              sets: "3 x 12",
              notes: "Manos enfrentadas. Tira con los codos.",
            },
            {
              name: "Tríceps Polea (Cuerda)",
              sets: "4 x 15",
              notes: "Bombeo máximo. El tríceps hace el brazo grande.",
            },
          ]}
        />

        <RoutineBlock
          day="Viernes"
          title="Brazos y Detalle Posterior"
          notes="Día estético para terminar la semana."
          exercises={[
            {
              name: "Curl de Bíceps Barra Z",
              sets: "3 x 12",
              notes: "Controla la bajada, no balancees.",
            },
            {
              name: "Press Francés (Manc)",
              sets: "3 x 12",
              notes: "Tríceps. Baja hacia las orejas.",
            },
            {
              name: "Curl Femoral Tumbado",
              sets: "4 x 12",
              notes: "Protección de rodilla para el fútbol.",
            },
            {
              name: "Hiperextensiones a 45°",
              sets: "3 x 15",
              notes: "Glúteo apretado. Clave para salud lumbar.",
            },
            {
              name: "Elevaciones Laterales",
              sets: "3 x 15",
              notes: "Recordatorio de volumen lateral.",
            },
          ]}
        />
      </div>

      {/* PROTOCOLO DE NUTRICIÓN ADAPTADO */}
      <section className="mt-16 bg-white p-8 rounded-2xl shadow-2xl border-2 border-blue-500">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
          <Utensils className="mr-2 text-blue-600" /> Nutrición `&quot;`Modo
          Tanque`&quot;`
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-blue-800 mb-2">
                Tus Comidas (Ajustadas)
              </h3>
              <ul className="text-sm space-y-3 text-gray-700">
                <li>
                  <strong>Desayuno:</strong> Sube a 4 huevos + Pan de avena
                  (porción doble).
                </li>
                <li>
                  <strong>Almuerzo:</strong> 250g Pollo/Carne + 2 Papas grandes
                  + Oliva.
                </li>
                <li>
                  <strong>Merienda:</strong> Fruta/Yogur +{" "}
                  <strong>Añadir 1 scoop de Proteína</strong>.
                </li>
                <li>
                  <strong className="text-red-600 font-bold italic">
                    CENA (EL SECRETO):
                  </strong>{" "}
                  Debes cenar sólido. 200g Pescado/Pollo + 1.5 tazas Arroz +
                  Palta.
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded-xl text-white">
              <h3 className="font-bold text-blue-400 mb-2">
                Suplementación Estratégica
              </h3>
              <ul className="text-sm space-y-3">
                <li>
                  <strong>Creatina Monohidrato:</strong> 5g todos los días. (Te
                  dará volumen visual en 10 días).
                </li>
                <li>
                  <strong>Whey Protein:</strong> Solo si no llegas a tus
                  proteínas en la merienda.
                </li>
                <li>
                  <strong>Magnesio:</strong> Antes de dormir para relajar
                  espalda y mejorar sueño.
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 text-sm font-medium italic">
              `&quot;`Si no cenas, el gimnasio es solo una forma de cansarte
              más. La cena es donde el músculo se construye.`&quot;`
            </p>
          </div>
        </div>
      </section>

      {/* METRICAS DE PROGRESO */}
      <section className="mt-12 bg-gray-100 p-6 rounded-2xl text-center">
        <h2 className="text-xl font-bold mb-4 flex justify-center items-center">
          <Activity className="mr-2 text-blue-600" /> Métricas para los 40+
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-gray-600 uppercase tracking-tighter">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            Brazo: +0.5cm/mes
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            Dolor Lumbar: 0/10
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            Fútbol: +Energía
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            Sueño: 7.5h min
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-400 text-xs mt-12 pb-8 italic">
        Plan de contingencia para 1.87m. Enfocado en salud articular y expansión
        visual.
      </footer>
    </main>
  );
}

/* --- COMPONENTE REUTILIZABLE PARA RUTINAS --- */
function RoutineBlock({
  day,
  title,
  exercises,
  notes,
}: {
  day: string;
  title: string;
  notes: string;
  exercises: { name: string; sets: string; notes: string }[];
}) {
  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">
            {day}: {title}
          </h2>
          <span className="text-blue-400 text-xs font-mono">45 MIN</span>
        </div>
        <p className="text-gray-400 text-xs mt-1 italic">{notes}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
              <th className="px-6 py-3">Movimiento</th>
              <th className="px-6 py-3">Series</th>
              <th className="px-6 py-3">Foco</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {exercises.map((ex, idx) => (
              <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                  {ex.name}
                </td>
                <td className="px-6 py-4 text-blue-600 font-mono text-xs">
                  {ex.sets}
                </td>
                <td className="px-6 py-4 text-gray-500 text-[11px] leading-tight">
                  {ex.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
