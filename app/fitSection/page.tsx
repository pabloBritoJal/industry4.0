"use client";
import React from "react";
import { Dumbbell, Activity, ShieldAlert, Zap, Calendar } from "lucide-react";

export default function SpeedAgilityProgram() {
  return (
    <main className="px-4 py-8 max-w-4xl mx-auto bg-gray-50 min-h-screen text-gray-900">
      {/* HEADER - PERFIL DEL ATLETA */}
      <section className="text-center mb-12 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-600">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Plan de Hipertrofia Máxima{" "}
          <span className="text-blue-600">Elite 40+</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            187 cm / 82 kg
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            Objetivo: Masa Máxima
          </span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
            Protección Lumbar: ON
          </span>
        </div>
      </section>

      {/* RESTRICCIONES CRÍTICAS */}
      <section className="mb-10 bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg shadow-sm">
        <div className="flex items-center mb-3">
          <ShieldAlert className="text-amber-600 mr-2" />
          <h2 className="text-xl font-bold text-amber-800">
            Protocolo de Salud de Espalda
          </h2>
        </div>
        <p className="text-amber-900 text-sm leading-relaxed">
          Debido a tus problemas lumbares crónicos, este plan aplica el
          principio de
          <strong> Carga Axial Zero</strong>. Quedan prohibidas las sentadillas
          con barra tras nuca, pesos muertos convencionales y press militar de
          pie. Usaremos soportes de pecho y bancos para estabilizar la columna.
        </p>
      </section>

      {/* CALENDARIO SEMANAL */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="mr-2 text-blue-600" /> Distribución Semanal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { d: "Lunes", t: "Push (Fuerza)", c: "bg-blue-600" },
            { d: "Martes", t: "Pull (Fuerza)", c: "bg-indigo-600" },
            { d: "Miércoles", t: "Fútbol + Core", c: "bg-green-600" },
            { d: "Jueves", t: "Torso (Hiper)", c: "bg-purple-600" },
            { d: "Viernes", t: "Piernas (Máximo)", c: "bg-orange-600" },
          ].map((day, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
            >
              <div
                className={`${day.c} text-white text-center py-2 text-sm font-bold uppercase tracking-wider`}
              >
                {day.d}
              </div>
              <div className="p-4 text-center text-sm font-semibold text-gray-700">
                {day.t}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOQUES DE ENTRENAMIENTO */}
      <div className="space-y-12">
        {/* LUNES */}
        <RoutineBlock
          day="Lunes"
          title="Empuje: Pecho y Hombros (Enfoque Fuerza)"
          exercises={[
            {
              name: "Press de Banca con Barra",
              sets: "3 x 6-8",
              notes: "20kg/lado. RPE 9 (2 reps en reserva).",
            },
            {
              name: "Press Militar Sentado (Mancuernas)",
              sets: "3 x 10",
              notes: "Usa banco con respaldo a 90°. Protege lumbares.",
            },
            {
              name: "Aperturas en Peck Deck",
              sets: "3 x 12-15",
              notes: "Máxima contracción en el centro.",
            },
            {
              name: "Press Francés con Mancuernas",
              sets: "3 x 12",
              notes: "Codos cerrados, baja lento tras la cabeza.",
            },
          ]}
        />

        {/* MARTES */}
        <RoutineBlock
          day="Martes"
          title="Tracción: Espalda y Bíceps (Carga Mecánica)"
          exercises={[
            {
              name: "Jalón al Pecho (Agarre Ancho)",
              sets: "3 x 8-10",
              notes: "Sube a 65kg. No balancees el tronco.",
            },
            {
              name: "Remo con Pecho Apoyado",
              sets: "3 x 10-12",
              notes: "Fundamental para no estresar la espalda baja.",
            },
            {
              name: "Face Pulls en Polea",
              sets: "4 x 15",
              notes: "Salud del hombro y postura.",
            },
            {
              name: "Curl con Barra Z (Banco Scott)",
              sets: "3 x 10-12",
              notes: "Aislamiento total del bíceps.",
            },
          ]}
        />

        {/* MIÉRCOLES */}
        <section className="bg-green-50 p-6 rounded-2xl border-2 border-green-200 shadow-md">
          <div className="flex items-center mb-4">
            <Zap className="text-green-600 mr-2" />
            <h2 className="text-2xl font-bold text-green-800">
              Miércoles: Fútbol (Cardio LISS/HIIT)
            </h2>
          </div>
          <p className="text-green-700 mb-4">
            Tu partido/entrenamiento cuenta como trabajo de tren inferior y
            metabólico.
            <strong> Extra Gym (Opcional - 20 min):</strong> Enfócate solo en
            Core para proteger tu espalda:
          </p>
          <ul className="list-disc list-inside text-green-900 space-y-1 text-sm font-medium">
            <li>Plancha Abdominal: 3 x 45 segundos.</li>
            <li>Deadbug: 3 x 15 repeticiones (Excelente para lumbares).</li>
            <li>Bird-Dog: 3 x 12 repeticiones.</li>
          </ul>
        </section>

        {/* JUEVES */}
        <RoutineBlock
          day="Jueves"
          title="Torso: Hipertrofia y Volumen"
          exercises={[
            {
              name: "Press Inclinado (Mancuernas)",
              sets: "3 x 10-12",
              notes: "Enfoque en el haz superior del pecho.",
            },
            {
              name: "Remo con Mancuerna a 1 mano",
              sets: "3 x 12",
              notes: "Mano apoyada en banco para estabilidad lumbar.",
            },
            {
              name: "Cruces en Polea Baja",
              sets: "3 x 15",
              notes: "Bombeo constante. Tiempo bajo tensión.",
            },
            {
              name: "Elevaciones Laterales (Polea o Manc)",
              sets: "4 x 15-20",
              notes: "Hombros redondos (3D).",
            },
            {
              name: "Martillos (Hammer Curl)",
              sets: "3 x 12",
              notes: "Grosor del brazo (Braquial).",
            },
          ]}
        />

        {/* VIERNES */}
        <RoutineBlock
          day="Viernes"
          title="Piernas: Máximo Estímulo (Sin Carga Axial)"
          exercises={[
            {
              name: "Prensa de Piernas (Pies Altos)",
              sets: "4 x 10-12",
              notes: "Pies altos = más glúteo/isquio, menos tensión lumbar.",
            },
            {
              name: "Leg Extension (Extensiones)",
              sets: "4 x 15",
              notes: "Pausa 1 seg arriba. Quema máxima.",
            },
            {
              name: "Curl Femoral Sentado",
              sets: "4 x 12-15",
              notes: "Controla la fase negativa (bajada).",
            },
            {
              name: "Zancadas Estáticas con Mancuernas",
              sets: "3 x 12/pierna",
              notes: "Mantén el torso erguido.",
            },
            {
              name: "Elevación de Talones en Máquina",
              sets: "4 x 20",
              notes: "Rango de movimiento completo.",
            },
          ]}
        />
      </div>

      {/* METRICAS DE PROGRESO */}
      <section className="mt-16 bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Activity className="mr-2 text-blue-400" /> Protocolo de Crecimiento
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm italic">
              Nutrición
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                • <span className="text-white font-bold">Calorías:</span> 3,000
                kcal/día.
              </li>
              <li>
                • <span className="text-white font-bold">Proteína:</span> 180g
                (4 huevos base + pollo/pescado).
              </li>
              <li>
                • <span className="text-white font-bold">Grasas:</span>{" "}
                Priorizar Omega-3 por colesterol LDL.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm italic">
              Progreso
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                • <span className="text-white font-bold">Sobrecarga:</span> Sube
                1.25kg o 1 rep cada semana.
              </li>
              <li>
                • <span className="text-white font-bold">Descanso:</span> 60-90
                seg entre series.
              </li>
              <li>
                • <span className="text-white font-bold">Sueño:</span> 7.5h
                mínimo (Crucial a los 40+).
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-400 text-xs mt-12 pb-8">
        Plan optimizado para 187cm/82kg. Priorizando salud lumbar y recuperación
        post-fútbol.
      </footer>
    </main>
  );
}

/* --- COMPONENTE REUTILIZABLE PARA RUTINAS --- */
function RoutineBlock({
  day,
  title,
  exercises,
}: {
  day: string;
  title: string;
  exercises: { name: string; sets: string; notes: string }[];
}) {
  return (
    <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-bold text-lg">
          {day}: {title}
        </h2>
        <span className="text-gray-400 text-xs font-mono">45-50 MIN</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="px-6 py-3 font-bold">Ejercicio</th>
              <th className="px-6 py-3 font-bold">Series/Reps</th>
              <th className="px-6 py-3 font-bold">Notas Clave</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {exercises.map((ex, idx) => (
              <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                  {ex.name}
                </td>
                <td className="px-6 py-4 text-blue-600 font-mono text-sm">
                  {ex.sets}
                </td>
                <td className="px-6 py-4 text-gray-600 text-xs italic">
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
