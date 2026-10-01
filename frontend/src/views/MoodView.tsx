import React, { useState } from 'react';
import { NavPath, MoodLog } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface MoodViewProps {
  onNavigate: (path: NavPath) => void;
  currentMood: MoodLog;
  onUpdateMood: (mood: MoodLog) => void;
}

export const MoodView: React.FC<MoodViewProps> = ({
  onNavigate,
  currentMood,
  onUpdateMood,
}) => {
  const [neuroEnergy, setNeuroEnergy] = useState(currentMood.energy * 10 || 72);
  const [somaticTension, setSomaticTension] = useState(currentMood.stress * 10 || 24);
  const [creativeInception, setCreativeInception] = useState(currentMood.creativeInception ? currentMood.creativeInception * 10 : 88);
  const [selectedFeeling, setSelectedFeeling] = useState(currentMood.primaryMood);
  const [reflection, setReflection] = useState(currentMood.notes || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const feelings = [
    { label: '“Okay” · Calm Serenity', icon: 'sentiment_neutral', desc: 'Neutral, peaceful, undisturbed.' },
    { label: '“Calm” · Grounded Stillness', icon: 'sentiment_satisfied', desc: 'Slow, safe, restorative.' },
    { label: '“Reflective” · Inward Inception', icon: 'self_improvement', desc: 'Auditing boundaries, contemplative.' },
    { label: '“Tender” · Vulnerable Softness', icon: 'spa', desc: 'Heightened sensitivity, requiring gentleness.' },
    { label: '“Radiant” · Clear Vitality', icon: 'mood', desc: 'Vibrant, communicative, expressive.' },
    { label: '“Restless” · Agitated Waves', icon: 'cyclone', desc: 'Sensory overload, needs quiet pacing.' }
  ];

  const handleSave = () => {
    onUpdateMood({
      ...currentMood,
      primaryMood: selectedFeeling,
      energy: Math.round(neuroEnergy / 10),
      stress: Math.round(somaticTension / 10),
      creativeInception: Math.round(creativeInception / 10),
      notes: reflection,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1240px] w-full mx-auto px-gutter md:px-margin-desktop py-space-xl flex flex-col gap-space-2xl">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Somatic Multi-Axial Mood</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Mood &amp; Emotional Weather
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Beyond binary emojis. Measure multidimensional cognitive energy, nervous tension, and physical groundedness.
            </p>
          </div>

          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => onNavigate('lunara-ai')}
              className="px-space-md py-space-xs rounded-full bg-secondary text-on-secondary hover:bg-on-secondary-container transition-all font-label-md text-label-md flex items-center gap-space-2xs shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Reflect with Lunara AI</span>
            </button>
          </div>
        </section>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Sliders & Axis Tuning */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface">Today's Somatic Tuning</h3>
                <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-space-xs py-space-2xs rounded-full font-semibold">
                  Day {USER_PROFILE.currentDay} Luteal
                </span>
              </div>

              {/* Axis 1: Neuro-Energy */}
              <div className="flex flex-col gap-1.5 bg-surface-container-low p-space-md rounded-xl">
                <div className="flex justify-between items-center font-label-md text-label-md">
                  <span className="text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
                    Neuro-Energy
                  </span>
                  <span className="text-secondary font-bold font-mono">{neuroEnergy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={neuroEnergy}
                  onChange={(e) => setNeuroEnergy(Number(e.target.value))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-on-surface-variant font-label-sm">
                  <span>Sensory Sluggishness</span>
                  <span>Steady Clarity</span>
                  <span>Peak Hyperfocus</span>
                </div>
              </div>

              {/* Axis 2: Somatic Tension */}
              <div className="flex flex-col gap-1.5 bg-surface-container-low p-space-md rounded-xl">
                <div className="flex justify-between items-center font-label-md text-label-md">
                  <span className="text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-primary">spa</span>
                    Somatic Tension
                  </span>
                  <span className="text-primary font-bold font-mono">{somaticTension}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={somaticTension}
                  onChange={(e) => setSomaticTension(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-on-surface-variant font-label-sm">
                  <span>Complete Ease</span>
                  <span>Mild Guardedness</span>
                  <span>Hyper-arousal</span>
                </div>
              </div>

              {/* Axis 3: Creative Inception */}
              <div className="flex flex-col gap-1.5 bg-surface-container-low p-space-md rounded-xl">
                <div className="flex justify-between items-center font-label-md text-label-md">
                  <span className="text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">lightbulb</span>
                    Creative Inception
                  </span>
                  <span className="text-tertiary font-bold font-mono">{creativeInception}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={creativeInception}
                  onChange={(e) => setCreativeInception(Number(e.target.value))}
                  className="w-full accent-tertiary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-on-surface-variant font-label-sm">
                  <span>Dormant / Resting</span>
                  <span>Conceptualizing</span>
                  <span>Flow State Peak</span>
                </div>
              </div>

              {/* Private Somatic Journal Field */}
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface">Private Somatic Notes</label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={3}
                  placeholder="Record whispers of mood, physical tension in shoulders or pelvis, unhurried reflections..."
                  className="w-full p-space-sm rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {savedSuccess ? 'check' : 'save'}
                </span>
                <span>{savedSuccess ? 'Check-in Recorded' : 'Save Today’s Somatic Log'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mood States & Archetypes */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Primary Archetype Picker */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Primary Bodily Archetype</h3>
              <div className="flex flex-col gap-2">
                {feelings.map((f) => {
                  const isSelected = selectedFeeling === f.label;
                  return (
                    <button
                      key={f.label}
                      onClick={() => setSelectedFeeling(f.label)}
                      className={`p-space-sm rounded-xl text-left transition-all border flex items-start gap-space-sm cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary-fixed/30 shadow-xs'
                          : 'border-transparent bg-surface-container-low hover:bg-surface-container'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                        <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">{f.label}</span>
                        <span className="font-body-sm text-body-sm text-xs text-on-surface-variant mt-0.5">{f.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phase Weather Correlation */}
            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[18px]">insights</span>
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">Hormonal Mood Arc</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                During the luteal phase, baseline serotonin production naturally drops as progesterone rises. Slow somatic movement and magnesium intake keep emotional serenity balanced.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
