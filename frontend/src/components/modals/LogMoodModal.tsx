import React, { useState } from 'react';
import { MoodLog } from '../../types';

interface LogMoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMood: MoodLog;
  onSave: (updatedMood: MoodLog) => void;
}

export const LogMoodModal: React.FC<LogMoodModalProps> = ({
  isOpen,
  onClose,
  currentMood,
  onSave,
}) => {
  const [primaryMood, setPrimaryMood] = useState(currentMood.primaryMood);
  const [stress, setStress] = useState(currentMood.stress);
  const [anxiety, setAnxiety] = useState(currentMood.anxiety);
  const [energy, setEnergy] = useState(currentMood.energy);
  const [notes, setNotes] = useState(currentMood.notes || '');

  if (!isOpen) return null;

  const moodPresets = [
    { label: '“Calm” · Serene Stillness', icon: 'sentiment_satisfied' },
    { label: '“Okay” · Calm Serenity', icon: 'sentiment_neutral' },
    { label: '“Reflective” · Inward Attunement', icon: 'self_improvement' },
    { label: '“Tender” · Sensitive & Soft', icon: 'spa' },
    { label: '“Restless” · Agitated Energy', icon: 'sentiment_dissatisfied' },
    { label: '“Radiant” · Clear Vitality', icon: 'mood' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...currentMood,
      primaryMood,
      stress,
      anxiety,
      energy,
      notes,
    });
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
            <span className="material-symbols-outlined text-primary text-[22px]">add_reaction</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Log Today's State</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Preset Buttons */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">Primary Feeling</label>
            <div className="grid grid-cols-2 gap-2">
              {moodPresets.map((preset) => {
                const isSelected = primaryMood === preset.label;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setPrimaryMood(preset.label)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left font-body-sm text-xs transition-all border ${
                      isSelected
                        ? 'border-primary bg-primary-fixed/40 text-on-surface font-semibold shadow-xs'
                        : 'border-transparent bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">{preset.icon}</span>
                    <span className="truncate">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
            {/* Stress */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface font-medium">Stress</span>
                <span className="text-on-surface-variant">{stress} / 10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={stress} 
                onChange={(e) => setStress(Number(e.target.value))}
                className="w-full accent-outline cursor-pointer"
              />
            </div>

            {/* Anxiety */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface font-medium">Anxiety</span>
                <span className="text-on-surface-variant">{anxiety} / 10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={anxiety} 
                onChange={(e) => setAnxiety(Number(e.target.value))}
                className="w-full accent-secondary cursor-pointer"
              />
            </div>

            {/* Energy */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface font-medium">Energy</span>
                <span className="text-on-surface-variant">{energy} / 10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={energy} 
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Somatic Notes */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">Private Somatic Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notice bodily sensations, emotional atmosphere, or rest qualities..."
              rows={3}
              className="w-full p-space-xs rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none"
            />
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
              className="px-space-lg py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container shadow-sm active:scale-98 transition-all"
            >
              Save Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
