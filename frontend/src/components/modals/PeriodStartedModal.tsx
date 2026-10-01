import React, { useState } from 'react';

interface PeriodStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPeriodStarted: (startDate: string, intensity: string) => void;
}

export const PeriodStartedModal: React.FC<PeriodStartedModalProps> = ({
  isOpen,
  onClose,
  onPeriodStarted,
}) => {
  const [date, setDate] = useState('2024-10-14');
  const [flow, setFlow] = useState<'Spotting' | 'Light' | 'Medium' | 'Heavy'>('Medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPeriodStarted(date, flow);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container-high"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">water_drop</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Period Started</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Logging the first day resets your cycle timeline to Day 1 (Menstrual Phase) and recalibrates Bayesian predictions.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">Start Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-on-surface">Initial Flow Intensity</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Spotting', 'Light', 'Medium', 'Heavy'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFlow(level)}
                  className={`py-2 rounded-xl font-label-sm text-label-sm transition-all ${
                    flow === level
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {level}
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
              className="px-space-lg py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container shadow-sm active:scale-98 transition-all"
            >
              Confirm &amp; Reset Cycle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
