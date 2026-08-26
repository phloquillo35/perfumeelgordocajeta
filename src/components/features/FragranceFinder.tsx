"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface QuestionStep {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: string;
    value: string;
  }[];
}

const STEPS: QuestionStep[] = [
  {
    id: 1,
    title: "¿En qué ocasión lucirás tu perfume?",
    subtitle: "Selecciona el ambiente en el que buscas destacar tu presencia",
    options: [
      {
        label: "Noche & Gala Exclusiva",
        description: "Eventos elegantes donde la distinción y la intriga son clave",
        icon: "🌙",
        value: "noche",
      },
      {
        label: "Uso Diario de Alta Gama",
        description: "Sofisticación constante para tu rutina diaria",
        icon: "✨",
        value: "diario",
      },
      {
        label: "Cita Romántica",
        description: "Fragancias seductoras y magnéticas de alta cercanía",
        icon: "🌹",
        value: "cita",
      },
      {
        label: "Oficina & Negocios",
        description: "Proyección limpia y profesional que impone respeto",
        icon: "💼",
        value: "oficina",
      },
    ],
  },
  {
    id: 2,
    title: "¿Cuál es tu familia olfativa preferida?",
    subtitle: "El alma y el carácter principal del aroma",
    options: [
      {
        label: "Oud & Ámbar Oriental",
        description: "Calidez mística, especias árabes y maderas exóticas",
        icon: "👑",
        value: "arabe",
      },
      {
        label: "Dulce & Vainilla Gourmand",
        description: "Notas adictivas de caramelo, haba tonka y frutos secos",
        icon: "🍯",
        value: "gourmand",
      },
      {
        label: "Cítrico & Fresco Marino",
        description: "Vitalidad de bergamota, brisa marina y pimienta rosa",
        icon: "🌊",
        value: "fresco",
      },
      {
        label: "Cuero & Maderas Nobles",
        description: "Fuerza masculina/unisex de cedro, vetiver y cuero de lujo",
        icon: "🪵",
        value: "maderas",
      },
    ],
  },
  {
    id: 3,
    title: "¿Qué intensidad y estela buscas?",
    subtitle: "La persistencia y alcance de tu firma olfativa en el ambiente",
    options: [
      {
        label: "Estela Magnética de Alta Fijación",
        description: "+12 horas de duración y presencia dominante al caminar",
        icon: "🔥",
        value: "alta",
      },
      {
        label: "Elegancia Equilibrada",
        description: "Estela moderada perceptible a un metro de distancia",
        icon: "💎",
        value: "media",
      },
      {
        label: "Intimidad & Distinción Sutil",
        description: "Perceptible al acercarse, personal y refinado",
        icon: "🕊️",
        value: "sutil",
      },
    ],
  },
];

export function FragranceFinder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [currentStep]: value };
    setAnswers(updated);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <section className="py-28 relative bg-surface border-y border-gold-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-medium mb-4">
            Diagnóstico Olfativo Interactivo
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 leading-tight">
            Descubre tu <span className="gold-text-bright">Firma Olfativa</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Responde 3 breves preguntas y nuestro algoritmo olfativo te recomendará la fragancia perfecta de nuestra colección.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-3xl relative">
          {!isCompleted ? (
            <div>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        idx === currentStep
                          ? "bg-gold-400 text-black shadow-lg shadow-gold-500/30"
                          : idx < currentStep
                          ? "bg-gold-500/30 text-gold-200 border border-gold-500/40"
                          : "bg-white/5 text-slate-500 border border-white/10"
                      }`}
                    >
                      {idx < currentStep ? "✓" : step.id}
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`w-12 md:w-20 h-[2px] transition-colors ${
                          idx < currentStep ? "bg-gold-500/50" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-2xl md:text-3xl text-white text-center mb-2">
                    {STEPS[currentStep].title}
                  </h3>
                  <p className="text-slate-400 text-xs text-center mb-8 font-light">
                    {STEPS[currentStep].subtitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STEPS[currentStep].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(opt.value)}
                        className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-black/40 hover:bg-gold-500/10 hover:border-gold-500/40 text-left transition-all duration-300 group cursor-pointer"
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform">
                          {opt.icon}
                        </span>
                        <div>
                          <div className="text-white font-medium text-sm mb-1 group-hover:text-gold-200 transition-colors">
                            {opt.label}
                          </div>
                          <div className="text-slate-400 text-xs font-light leading-relaxed">
                            {opt.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold-400 to-gold-600 flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl shadow-gold-500/30">
                👑
              </div>
              <span className="text-gold-300 text-xs uppercase tracking-[0.25em] font-semibold">
                Match Olfativo 98% de Compatibilidad
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-4">
                Recomendación Exclusiva
              </h3>
              <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-light">
                Basado en tu preferencia por la intensidad y familia olfativa seleccionada, te sugerimos explorar nuestras colecciones orientales y de nicho árabe en presentación **Decant o Botella Completa**.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/catalogo?tipo=ARABE"
                  className="btn-gold w-full sm:w-auto"
                >
                  Ver Fragancias Recomendadas
                </Link>
                <button
                  onClick={handleReset}
                  className="btn-gold-outline w-full sm:w-auto cursor-pointer"
                >
                  Repetir Diagnóstico
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
