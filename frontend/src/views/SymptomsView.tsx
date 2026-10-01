import React from 'react';
import { NavPath, SymptomLog } from '../types';

interface SymptomsViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenLogSymptoms: () => void;
  symptoms: SymptomLog[];
}

export const SymptomsView: React.FC<SymptomsViewProps> = ({
  onNavigate,
  onOpenLogSymptoms,
  symptoms,
}) => {
  const categories = [
    {
      id: 'physical',
      title: 'Physical & Pelvic',
      icon: 'health_metrics',
      color: 'text-primary',
      examples: 'Mild uterine waves, lower back aches, pelvic heaviness, breast tenderness'
    },
    {
      id: 'cervical',
      title: 'Cervical Fluid & Temp',
      icon: 'water_drop',
      color: 'text-secondary',
      examples: 'Egg-white fluid, creamy texture, basal body temperature shifts (+0.3°C)'
    },
    {
      id: 'digestive',
      title: 'Digestive & Metabolic',
      icon: 'restaurant',
      color: 'text-tertiary',
      examples: 'Bloating, slow gut transit, cravings for grounding fats & complex carbs'
    },
    {
      id: 'cognitive',
      title: 'Cognitive & Neurological',
      icon: 'psychology',
      color: 'text-outline',
      examples: 'Headache onset, sensory sensitivity, vivid dreams, restful sleep changes'
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1240px] w-full mx-auto px-gutter md:px-margin-desktop py-space-xl flex flex-col gap-space-2xl">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">vital_signs</span>
              <span>Nuanced Symptom Telemetry</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Symptom Journal &amp; Bodily Cues
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Log tactile bodily cues with granular intensity scales: cervical fluid, basal temperature shifts, tension headaches, and digestion markers.
            </p>
          </div>

          <button
            onClick={onOpenLogSymptoms}
            className="px-space-lg py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md flex items-center gap-space-2xs shadow-md cursor-pointer active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Log New Symptom</span>
          </button>
        </section>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-sm border border-surface-container">
              <div className="flex items-center gap-space-xs">
                <span className={`material-symbols-outlined text-[24px] ${cat.color}`}>{cat.icon}</span>
                <span className="font-headline-sm text-headline-sm text-on-surface">{cat.title}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">
                {cat.examples}
              </p>
              <button
                onClick={onOpenLogSymptoms}
                className="mt-2 text-left font-label-sm text-label-sm text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Record cue</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>

        {/* Current & Historical Logged Symptoms */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
            <h3 className="font-headline-md text-headline-md text-on-surface">Recorded Telemetry</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {symptoms.length} symptoms active in current window
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {symptoms.map((s) => (
              <div
                key={s.id}
                className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between gap-space-sm hover:shadow-xs transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full mt-0.5" style={{ backgroundColor: s.color }} />
                    <span className="font-headline-sm text-headline-sm text-on-surface">{s.name}</span>
                  </div>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant uppercase text-[10px]">
                    {s.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Intensity</span>
                    <span className="text-primary font-semibold">{s.severityLabel}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${s.severity * 10}%`,
                        backgroundColor: s.color,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-surface-container/60 text-xs text-on-surface-variant font-body-sm">
                  <span>{s.timeLogged}</span>
                  <button
                    onClick={() => onNavigate('lunara-ai')}
                    className="text-secondary hover:underline font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>Analyze</span>
                    <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
