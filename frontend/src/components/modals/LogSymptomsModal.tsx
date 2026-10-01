import React, { useState } from 'react';
import { SymptomLog } from '../../types';

interface LogSymptomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSymptom: (symptom: SymptomLog) => void;
}

export const LogSymptomsModal: React.FC<LogSymptomsModalProps> = ({
  isOpen,
  onClose,
  onAddSymptom,
}) => {
  const [name, setName] = useState('');
  const [severity, setSeverity] = useState(4);
  const [category, setCategory] = useState<'physical' | 'digestive' | 'cervical' | 'cognitive'>('physical');

  if (!isOpen) return null;

  const quickSymptoms = [
    { name: 'Cramps', cat: 'physical', color: '#8e4647' },
    { name: 'Fatigue', cat: 'physical', color: '#675491' },
    { name: 'Bloating', cat: 'digestive', color: '#8e4647' },
    { name: 'Headache', cat: 'physical', color: '#867272' },
    { name: 'Lower Back Aches', cat: 'physical', color: '#52604e' },
    { name: 'Breast Tenderness', cat: 'physical', color: '#675491' },
    { name: 'Sugar Craving', cat: 'digestive', color: '#ac5e5f' },
    { name: 'Brain Fog', cat: 'cognitive', color: '#867272' },
    { name: 'Fluid: Creamy', cat: 'cervical', color: '#52604e' },
    { name: 'Fluid: Egg-white', cat: 'cervical', color: '#675491' },
  ];

  const getSeverityLabel = (val: number) => {
    if (val <= 3) return `Mild · ${val}/10`;
    if (val <= 6) return `Moderate · ${val}/10`;
    return `Intense · ${val}/10`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSymptom: SymptomLog = {
      id: `s-${Date.now()}`,
      name: name.trim(),
      category,
      severity,
      severityLabel: getSeverityLabel(severity),
      timeLogged: 'Today, Just now',
      color: category === 'physical' ? '#675491' : category === 'digestive' ? '#8e4647' : '#52604e',
    };

    onAddSymptom(newSymptom);
    setName('');
    setSeverity(4);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container-high"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">vital_signs</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Log Today's Symptoms</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick select tags */}
        <div className="flex flex-col gap-1.5">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Quick Select</span>
          <div className="flex flex-wrap gap-1.5">
            {quickSymptoms.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setName(s.name);
                  setCategory(s.cat as any);
                }}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  name === s.name
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md pt-space-xs">
          {/* Custom Name */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">Symptom or Bodily Cue</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mild Uterine Waves, Cervical Sensitivity..."
              required
              className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Severity Slider */}
          <div className="flex flex-col gap-1.5 bg-surface-container-low p-space-sm rounded-xl">
            <div className="flex justify-between font-label-sm text-label-sm">
              <span className="text-on-surface font-medium">Intensity / Severity</span>
              <span className="text-primary font-bold">{getSeverityLabel(severity)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">Bodily Category</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['physical', 'digestive', 'cervical', 'cognitive'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-1.5 px-2 rounded-lg font-label-sm text-label-sm capitalize transition-all ${
                    category === cat
                      ? 'bg-secondary text-on-secondary font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-space-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-space-lg py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container shadow-sm disabled:opacity-50 transition-all"
            >
              Log Symptom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
