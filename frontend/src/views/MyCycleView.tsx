import React, { useState } from 'react';
import { NavPath, CycleRecord } from '../types';
import { USER_PROFILE, RECORDED_CYCLES } from '../data/mockData';

interface MyCycleViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenLogSymptoms: () => void;
  onOpenPeriodStarted: () => void;
}

export const MyCycleView: React.FC<MyCycleViewProps> = ({
  onNavigate,
  onOpenLogSymptoms,
  onOpenPeriodStarted,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(18);
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1000);
  };

  const getDayPhaseDescription = (day: number) => {
    if (day >= 1 && day <= 5) return 'Menstrual Phase · Estrogen and progesterone baseline.';
    if (day >= 6 && day <= 10) return 'Follicular Phase · Rising estradiol stimulates focus.';
    if (day >= 11 && day <= 16) return day === 14 || day === 16 ? 'Ovulation Day · Peak luteinizing hormone and fertility.' : 'Fertile Window · High conception probability.';
    if (day >= 23 && day <= 27) return 'Predicted Period Window · Anticipated onset based on Bayesian history.';
    return 'Luteal Phase · Mid-cycle progesterone peak promoting calm rest.';
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1240px] w-full mx-auto px-gutter md:px-margin-desktop py-space-xl flex flex-col gap-space-2xl">
        {/* Top Editorial Header & Quick Action */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span>Biorhythm &amp; Hormonal Orbit</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">My Cycle</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Track your phases, predict upcoming periods, and understand your natural rhythm.
            </p>
          </div>
          <div className="flex items-center gap-space-xs self-start md:self-auto">
            <button
              onClick={onOpenLogSymptoms}
              className="px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant transition-all font-label-md text-label-md flex items-center gap-space-2xs shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
              <span>Log Symptoms</span>
            </button>
            <button
              onClick={onOpenPeriodStarted}
              className="px-space-md py-space-xs rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md flex items-center gap-space-2xs shadow-md cursor-pointer active:scale-98"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Period Started</span>
            </button>
          </div>
        </section>

        {/* Top Cycle Phase Overview Card (Hero Wheel Track) */}
        <section className="relative bg-surface-container-lowest rounded-xl p-space-lg md:p-space-2xl shadow-sm overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left: The Visual Cycle Orbit (Inline SVG Radial Wheel) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Dynamic 29-Day Circular Dial SVG */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 320 320">
                  {/* Background Outer Track */}
                  <circle cx="160" cy="160" fill="none" r="132" stroke="#efe6e2" strokeLinecap="round" strokeWidth="14" />
                  {/* Menstrual Phase: Days 1-5 (~17.2%) */}
                  <circle cx="160" cy="160" fill="none" r="132" stroke="#8e4647" strokeDasharray="142 829" strokeDashoffset="0" strokeLinecap="round" strokeWidth="14" />
                  {/* Follicular Transition: Days 6-10 (~17.2%) */}
                  <circle cx="160" cy="160" fill="none" r="132" stroke="#bbcbb5" strokeDasharray="142 829" strokeDashoffset="-148" strokeLinecap="round" strokeWidth="14" />
                  {/* Fertile Window: Days 11-16 (~20.7%) */}
                  <circle cx="160" cy="160" fill="none" r="132" stroke="#ceb9fd" strokeDasharray="171 829" strokeDashoffset="-296" strokeLinecap="round" strokeWidth="14" />
                  {/* Luteal Phase: Days 17-29 (~44.8%) */}
                  <circle cx="160" cy="160" fill="none" r="132" stroke="#675491" strokeDasharray="350 829" strokeDashoffset="-474" strokeLinecap="round" strokeWidth="14" />
                  
                  {/* Day ticks */}
                  <g stroke="#ffffff" strokeWidth="2">
                    <line x1="160" x2="160" y1="18" y2="38" />
                    <line x1="260" x2="246" y1="60" y2="74" />
                    <line x1="302" x2="282" y1="160" y2="160" />
                    <line x1="260" x2="246" y1="260" y2="246" />
                    <line x1="160" x2="160" y1="302" y2="282" />
                    <line x1="60" x2="74" y1="260" y2="246" />
                    <line x1="18" x2="38" y1="160" y2="160" />
                  </g>

                  {/* Ovulation Star Marker (Day 14) */}
                  <g transform="translate(300, 160)">
                    <circle cx="0" cy="0" fill="#584682" r="8" />
                    <circle cx="0" cy="0" fill="#ffffff" r="4" />
                  </g>

                  {/* Current Day Indicator (Day 18) */}
                  <g transform="translate(230, 274)">
                    <circle cx="0" cy="0" fill="#ffffff" filter="drop-shadow(0 2px 5px rgba(30,27,24,0.18))" r="13" />
                    <circle cx="0" cy="0" fill="#8e4647" r="8" />
                    <circle cx="0" cy="0" fill="#ffffff" r="3" />
                  </g>
                </svg>

                {/* Center Metric Core */}
                <div className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-surface-container-low flex flex-col items-center justify-center text-center p-space-xs shadow-inner">
                  <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">
                    Current Cycle
                  </span>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="font-headline-xl text-headline-xl text-on-surface font-semibold">
                      {USER_PROFILE.currentDay}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                      / {USER_PROFILE.cycleLength}
                    </span>
                  </div>
                  <div className="px-space-xs py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Luteal Phase</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">
                    Next period in {USER_PROFILE.nextPeriodInDays} days
                  </p>
                </div>
              </div>

              {/* Quick interactive legend beneath wheel */}
              <div className="flex flex-wrap items-center justify-center gap-space-sm mt-space-md font-label-sm text-label-sm text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>Menstrual (1–5)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
                  <span>Follicular (6–10)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                  <span>Fertile (11–16)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span>Luteal (17–29)</span>
                </div>
              </div>
            </div>

            {/* Right: Diagnostic Phase Breakdown */}
            <div className="lg:col-span-6 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                  Phase Assessment
                </span>
                <span className="font-label-md text-label-md text-primary font-medium">October 14, 2024</span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-snug">
                  Progesterone Peak &amp; Metabolic Restoration
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  You have transitioned into the mid-luteal phase. Body temperature elevates by ~0.3°C as progesterone consolidates. Your focus turns inward, accompanied by higher basal energy consumption.
                </p>
              </div>

              {/* Phase Insights Pill Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                <div className="bg-surface-container p-space-sm rounded-xl flex items-start gap-space-xs">
                  <div className="p-space-2xs rounded-lg bg-primary-fixed text-primary">
                    <span className="material-symbols-outlined text-[20px]">water_drop</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                      Predicted Period
                    </span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">Oct 23 (in 9 days)</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">High confidence · 96%</span>
                  </div>
                </div>

                <div className="bg-surface-container p-space-sm rounded-xl flex items-start gap-space-xs">
                  <div className="p-space-2xs rounded-lg bg-secondary-fixed text-secondary">
                    <span className="material-symbols-outlined text-[20px]">stars</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                      Ovulation Passed
                    </span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">Day 14 (Oct 10)</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Confirmed by BBT rise</span>
                  </div>
                </div>
              </div>

              {/* Holistic Recommendations banner */}
              <div className="bg-surface-container-high/60 rounded-xl p-space-sm flex items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[24px]">self_improvement</span>
                  <p className="font-body-sm text-body-sm text-on-surface leading-tight">
                    Recommended today: Complex carbohydrates, gentle somatic yoga, and magnesium before bed.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('insights')}
                  className="shrink-0 p-space-2xs rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
                  type="button"
                  title="View insights"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Cards Row (4 cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Current Phase
              </span>
              <span className="w-8 h-8 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bedtime</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">Luteal Phase</span>
              <span className="font-body-sm text-body-sm text-secondary font-medium">
                Day 18 of 29 · Waning
              </span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '62%' }} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Cycle Length
              </span>
              <span className="w-8 h-8 rounded-full bg-tertiary-fixed/60 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">timelapse</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">29 Days</span>
              <span className="font-body-sm text-body-sm text-tertiary font-medium">Consistent · ±1 day fluctuation</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span>Optimal biological range (24–38d)</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Average Period
              </span>
              <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">opacity</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">5 Days</span>
              <span className="font-body-sm text-body-sm text-primary font-medium">Normal Flow · Medium intensity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              <span className="h-2 w-2 rounded-full bg-primary-fixed" />
              <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">Historical flow curve</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-md hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Next Fertile Window
              </span>
              <span className="w-8 h-8 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">nest_eco_leaf</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">Nov 3 – Nov 8</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Estimated Ovulation Nov 6</span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">event_upcoming</span>
              <span>Cycle 11 Forecast</span>
            </div>
          </div>
        </section>

        {/* Two-Column Detailed Section: Calendar & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column: Calendar View (7 cols) */}
          <section className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <h3 className="font-headline-md text-headline-md text-on-surface">October 2024</h3>
                <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                  Today Day 18
                </span>
              </div>
              <div className="flex items-center gap-space-2xs">
                <button
                  aria-label="Previous Month"
                  className="p-space-2xs rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  aria-label="Next Month"
                  className="p-space-2xs rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Selected day prompt info */}
            {selectedDay && (
              <div className="p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-xs flex items-center justify-between">
                <span>
                  <strong>October {selectedDay}:</strong> {getDayPhaseDescription(selectedDay)}
                </span>
                <button
                  onClick={() => onOpenLogSymptoms()}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Log cues
                </button>
              </div>
            )}

            {/* Calendar Days Grid */}
            <div className="w-full flex flex-col gap-space-xs">
              <div className="grid grid-cols-7 text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider pb-space-xs">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* Sep 29-30 */}
                <div className="h-12 sm:h-14 rounded-lg bg-surface-container-low/40 flex flex-col items-center justify-center text-on-surface-variant/40 font-body-sm text-body-sm">
                  <span>29</span>
                </div>
                <div className="h-12 sm:h-14 rounded-lg bg-surface-container-low/40 flex flex-col items-center justify-center text-on-surface-variant/40 font-body-sm text-body-sm">
                  <span>30</span>
                </div>

                {/* Oct 1-5 (Period days) */}
                {[1, 2, 3, 4, 5].map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-12 sm:h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center relative font-body-sm text-body-sm text-on-surface font-medium hover:bg-primary/20 transition-all cursor-pointer ${
                      selectedDay === d ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span>{d}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />
                  </div>
                ))}

                {/* Oct 6-10 (Follicular) */}
                {[6, 7, 8, 9, 10].map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-12 sm:h-14 rounded-lg bg-surface-container flex flex-col items-center justify-center font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer ${
                      selectedDay === d ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span>{d}</span>
                  </div>
                ))}

                {/* Oct 11-13 (Fertile window) */}
                {[11, 12, 13].map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-12 sm:h-14 rounded-lg bg-secondary-container/30 flex flex-col items-center justify-center relative font-body-sm text-body-sm text-on-surface font-medium hover:bg-secondary-container/50 transition-all cursor-pointer ${
                      selectedDay === d ? 'ring-2 ring-secondary' : ''
                    }`}
                  >
                    <span>{d}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-0.5" />
                  </div>
                ))}

                {/* Oct 14 (TODAY Day 18) */}
                <div
                  onClick={() => setSelectedDay(14)}
                  className="h-12 sm:h-14 rounded-lg bg-primary-container text-on-primary-container flex flex-col items-center justify-center relative font-body-sm text-body-sm font-semibold shadow-md transform scale-[1.03] cursor-pointer"
                >
                  <span>14</span>
                  <span className="font-label-sm text-[9px] uppercase tracking-tighter">Today</span>
                </div>

                {/* Oct 15 (Fertile) */}
                <div
                  onClick={() => setSelectedDay(15)}
                  className={`h-12 sm:h-14 rounded-lg bg-secondary-container/30 flex flex-col items-center justify-center relative font-body-sm text-body-sm text-on-surface font-medium hover:bg-secondary-container/50 transition-all cursor-pointer ${
                    selectedDay === 15 ? 'ring-2 ring-secondary' : ''
                  }`}
                >
                  <span>15</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-0.5" />
                </div>

                {/* Oct 16 (Ovulation) */}
                <div
                  onClick={() => setSelectedDay(16)}
                  className={`h-12 sm:h-14 rounded-lg bg-secondary-container/40 flex flex-col items-center justify-center relative font-body-sm text-body-sm text-secondary font-bold hover:bg-secondary-container/60 transition-all cursor-pointer ${
                    selectedDay === 16 ? 'ring-2 ring-secondary' : ''
                  }`}
                >
                  <span>16</span>
                  <span className="material-symbols-outlined text-[13px] text-secondary">star</span>
                </div>

                {/* Oct 17-22 (Luteal) */}
                {[17, 18, 19, 20, 21, 22].map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-12 sm:h-14 rounded-lg bg-surface-container flex flex-col items-center justify-center font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer ${
                      selectedDay === d ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span>{d}</span>
                  </div>
                ))}

                {/* Oct 23-27 (Predicted Period) */}
                {[23, 24, 25, 26, 27].map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-12 sm:h-14 rounded-lg bg-surface-container-high flex flex-col items-center justify-center relative font-body-sm text-body-sm text-primary font-medium shadow-inner hover:bg-primary-fixed transition-all cursor-pointer ${
                      selectedDay === d ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span>{d}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-0.5" />
                  </div>
                ))}

                {/* Oct 28-31 */}
                {[28, 29, 30, 31].map((d) => (
                  <div
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`h-12 sm:h-14 rounded-lg bg-surface-container flex flex-col items-center justify-center font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-all cursor-pointer ${
                      selectedDay === d ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <span>{d}</span>
                  </div>
                ))}

                {/* Nov 1-2 */}
                <div className="h-12 sm:h-14 rounded-lg bg-surface-container-low/40 flex flex-col items-center justify-center text-on-surface-variant/40 font-body-sm text-body-sm">
                  <span>1</span>
                </div>
                <div className="h-12 sm:h-14 rounded-lg bg-surface-container-low/40 flex flex-col items-center justify-center text-on-surface-variant/40 font-body-sm text-body-sm">
                  <span>2</span>
                </div>
              </div>
            </div>

            {/* Legend Strip */}
            <div className="pt-space-xs flex flex-wrap items-center gap-x-space-md gap-y-space-xs font-label-sm text-label-sm text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span>Recorded Period</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-secondary-container" />
                <span>Fertile Window</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-secondary">star</span>
                <span>Ovulation Day</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-container" />
                <span>Today (Active)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-surface-container-high flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                </span>
                <span>Predicted Window</span>
              </div>
            </div>
          </section>

          {/* Right Column: Cycle History, Regularity & Logs (5 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Regularity Score Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Biological Regularity
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    {USER_PROFILE.regularityScore}% Regularity
                  </h3>
                </div>
                <div className="p-space-xs rounded-full bg-secondary-container/40 text-secondary">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Your cycle variation is minimal (±1.2 days over 6 recorded months), indicating balanced luteal signaling and predictable ovulatory markers.
              </p>
              {/* Regularity Bar Visualizer */}
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-space-2xs">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${USER_PROFILE.regularityScore}%` }}
                />
              </div>
            </div>

            {/* History Card List */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Recorded Cycles</h4>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Last 4 cycles verified</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/40 px-space-xs py-space-2xs rounded-full font-medium">
                  Standard Pace
                </span>
              </div>

              <div className="flex flex-col gap-space-xs">
                {RECORDED_CYCLES.map((cycle) => (
                  <div
                    key={cycle.id}
                    className="bg-surface-container p-space-sm rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors"
                  >
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-label-md text-label-md font-semibold">
                        {cycle.monthNumber}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">{cycle.month}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Started {cycle.startDate} · {cycle.flowDays} days flow
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                        {cycle.totalLength} Days
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-medium">
                        {cycle.flowIntensity} Flow
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export Action Button */}
              <div className="pt-space-xs">
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="w-full py-space-sm px-space-md rounded-xl bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-all flex items-center justify-center gap-space-xs shadow-sm cursor-pointer active:scale-98"
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[18px] ${exporting ? 'animate-spin' : ''}`}>
                    {exporting ? 'progress_activity' : 'file_download'}
                  </span>
                  <span>{exporting ? 'Generating Biometric PDF/CSV...' : exportSuccess ? 'Export Ready & Downloaded!' : 'Export Cycle History (PDF/CSV)'}</span>
                </button>
              </div>
            </div>

            {/* Supportive Clinical Note */}
            <div className="px-space-sm py-space-xs rounded-xl bg-surface-container-low flex items-center gap-space-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px] text-tertiary">shield_lock</span>
              <p className="font-label-sm text-label-sm leading-tight">
                Encrypted cycle biometric logs. Ready to share with your gynecologist or healthcare specialist.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
