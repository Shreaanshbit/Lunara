import React, { useState } from 'react';
import { NavPath } from '../types';
import { IMAGES } from '../data/mockData';

interface InsightsViewProps {
  onNavigate: (path: NavPath) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onNavigate }) => {
  const [timeframe, setTimeframe] = useState<'6m' | '3c' | '1y'>('6m');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-gutter md:px-gutter-desktop max-w-[1240px] mx-auto w-full py-space-xl md:py-space-2xl flex flex-col gap-space-2xl">
        {/* Top Editorial Header & Timeframe Switcher */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Biannual Retrospective · 6 Months Synthesized</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Your Insights &amp; Patterns
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Personalized correlations between your cycle phases, mood, energy, and symptoms across 6 months.
            </p>
          </div>

          {/* Action & Window Filter Pill */}
          <div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container-high p-1 rounded-full shadow-sm">
            <button
              onClick={() => setTimeframe('6m')}
              className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                timeframe === '6m' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              6 Months
            </button>
            <button
              onClick={() => setTimeframe('3c')}
              className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                timeframe === '3c' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              3 Cycles
            </button>
            <button
              onClick={() => setTimeframe('1y')}
              className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                timeframe === '1y' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Yearly
            </button>
          </div>
        </section>

        {/* Key Highlight Hero Card: Asymmetric Elevated Paper Tile */}
        <section className="relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

          <div className="relative p-space-lg md:p-space-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-space-xl">
            <div className="flex flex-col gap-space-md max-w-2xl">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold tracking-wider uppercase">
                  <span className="material-symbols-outlined text-[14px]">insights</span>
                  Dominant Signal
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  High Confidence · 4 Cycles Analyzed · Informational only
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface leading-snug">
                Fatigue appears <span className="text-primary font-headline-lg italic">78% more frequently</span> during your luteal phase
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Across your last 4 cycles, your energy scores dipped to an average of{' '}
                <strong className="text-on-surface font-semibold">4.1/10</strong> between Day 17 and Day 24. This correlates directly with natural progesterone fluctuations, preceding menstruation by roughly 6 days.
              </p>
            </div>

            {/* Inline Visual Stat Cluster */}
            <div className="flex sm:flex-row items-center gap-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border-0 min-w-[280px]">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-surface-container-high fill-none" cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" />
                  <circle
                    className="text-primary fill-none"
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeDasharray="263.89"
                    strokeDashoffset="58"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium leading-none">78%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Luteal</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                  Progesterone Shift
                </span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">Avg Energy Drop: -3.8 pts</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Optimal remedy: Magnesium glycinate + 30m earlier rest
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid: 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column (8 Col): Analytics Visualizations */}
          <div className="lg:col-span-8 flex flex-col gap-space-2xl">
            {/* 1. Mood & Energy Across Phases Chart */}
            <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                    Biorhythm Analysis
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Mood &amp; Energy Across Phases</h3>
                </div>

                {/* Legend Indicators */}
                <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1 rounded bg-primary" /> Energy
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1 rounded bg-secondary" /> Stress
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-1 rounded bg-tertiary" /> Anxiety
                  </span>
                </div>
              </div>

              {/* Trend Chart Container */}
              <div className="w-full relative pt-2">
                <div className="h-60 w-full relative">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="energyFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#8e4647" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#8e4647" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="stressFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#675491" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#675491" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line stroke="#f5ece7" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="40" y2="40" />
                    <line stroke="#f5ece7" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="90" y2="90" />
                    <line stroke="#f5ece7" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="140" y2="140" />

                    {/* Energy Area + Stroke */}
                    <path
                      d="M 0,145 C 80,150 140,55 220,50 C 300,45 360,65 420,130 C 490,170 560,165 600,160 L 600,200 L 0,200 Z"
                      fill="url(#energyFill)"
                    />
                    <path
                      d="M 0,145 C 80,150 140,55 220,50 C 300,45 360,65 420,130 C 490,170 560,165 600,160"
                      fill="none"
                      stroke="#8e4647"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />

                    {/* Stress Stroke */}
                    <path
                      d="M 0,110 C 90,120 150,155 220,160 C 300,165 370,145 430,95 C 490,50 560,60 600,75"
                      fill="none"
                      stroke="#675491"
                      strokeLinecap="round"
                      strokeWidth="2.2"
                    />

                    {/* Anxiety Stroke (Dashed) */}
                    <path
                      d="M 0,90 C 80,95 150,130 220,140 C 300,150 380,120 440,80 C 510,55 570,85 600,105"
                      fill="none"
                      stroke="#52604e"
                      strokeDasharray="3 3"
                      strokeWidth="1.8"
                    />

                    {/* Nodes */}
                    <circle cx="220" cy="50" fill="#8e4647" r="4.5" />
                    <circle cx="490" cy="50" fill="#675491" r="4.5" />
                  </svg>
                </div>

                {/* X-Axis Phases Band */}
                <div className="grid grid-cols-4 pt-space-sm text-center font-label-md text-label-md text-on-surface-variant">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-on-surface">Menstrual</span>
                    <span className="font-label-sm text-label-sm text-outline">Days 1–5</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-on-surface">Follicular</span>
                    <span className="font-label-sm text-label-sm text-outline">Days 6–13</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-on-surface">Ovulatory</span>
                    <span className="font-label-sm text-label-sm text-outline">Days 14–16</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-on-surface">Luteal</span>
                    <span className="font-label-sm text-label-sm text-outline">Days 17–28</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container p-space-md rounded-xl flex items-start gap-space-sm mt-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                  psychology
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <strong className="text-on-surface font-medium">Biphasic Pattern Noted:</strong> You experience a synchronized vitality crest during days 11–15 with marked emotional resilience, followed by heightened cortisol sensitivity on days 23–26.
                </p>
              </div>
            </div>

            {/* 2. Symptom Patterns by Cycle Phase */}
            <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                  Frequency Matrix
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Symptom Patterns by Cycle Phase</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Calculated from 142 daily journal and biometric check-ins.</p>
              </div>

              {/* Phase Cards Mosaic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Luteal Card */}
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                      <span className="font-headline-sm text-headline-sm text-on-surface">Luteal Phase</span>
                    </div>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                      Days 17–28
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-1">
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Fatigue</span>
                        <span className="font-semibold text-primary">78%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Bloating</span>
                        <span className="font-semibold">64%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '64%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Cramps</span>
                        <span className="font-semibold">52%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-container rounded-full" style={{ width: '52%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Breast Tenderness</span>
                        <span className="font-semibold">41%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container rounded-full" style={{ width: '41%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menstrual Card */}
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="font-headline-sm text-headline-sm text-on-surface">Menstrual Phase</span>
                    </div>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                      Days 1–5
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-1">
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Cramps</span>
                        <span className="font-semibold text-primary">85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Fatigue</span>
                        <span className="font-semibold">60%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Headache</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Follicular Card */}
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                      <span className="font-headline-sm text-headline-sm text-on-surface">Follicular Phase</span>
                    </div>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                      Days 6–13
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-1">
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Clear Skin</span>
                        <span className="font-semibold text-tertiary">90%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>High Energy</span>
                        <span className="font-semibold text-tertiary">82%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary-container rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ovulatory Card */}
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                      <span className="font-headline-sm text-headline-sm text-on-surface">Ovulatory Phase</span>
                    </div>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">
                      Days 14–16
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-xs pt-1">
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Increased Libido</span>
                        <span className="font-semibold text-secondary">70%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
                        <span>Mild Pelvic Twinge (Mittelschmerz)</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-container rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 Col): Regularity Stats & Lunara AI Editorial */}
          <div className="lg:col-span-4 flex flex-col gap-space-xl">
            {/* 3. Cycle Regularity & Statistics Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-semibold">
                  Clinical Regularity
                </span>
                <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Cycle Statistics</h3>
              <div className="flex flex-col divide-y-0 gap-space-md pt-space-xs">
                <div className="flex items-baseline justify-between bg-surface-container-low p-space-sm rounded-lg">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Average Cycle Length</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    29.2 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">days</span>
                  </span>
                </div>
                <div className="flex flex-col bg-surface-container-low p-space-sm rounded-lg gap-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Cycle Variation</span>
                    <span className="font-headline-sm text-headline-sm text-tertiary font-semibold">
                      ±1.4 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">days</span>
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Considered very regular
                  </span>
                </div>
                <div className="flex items-baseline justify-between bg-surface-container-low p-space-sm rounded-lg">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Average Luteal Duration</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    13 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">days</span>
                  </span>
                </div>
              </div>

              {/* Miniature Rhythm Timeline Representation */}
              <div className="pt-2 flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm uppercase text-outline">Last 4 Completed Windows</span>
                <div className="flex items-center gap-1.5 w-full">
                  <div className="flex-1 h-3 rounded-full bg-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm text-on-tertiary-fixed font-semibold" title="Cycle 1: 29 days">
                    29d
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm text-on-tertiary-fixed font-semibold" title="Cycle 2: 30 days">
                    30d
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm text-on-tertiary-fixed font-semibold" title="Cycle 3: 28 days">
                    28d
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-tertiary-fixed flex items-center justify-center font-label-sm text-label-sm text-on-tertiary-fixed font-semibold" title="Cycle 4: 29 days">
                    29d
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Lunara AI Pattern Summary Card & Health Report Download */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-lg">
              <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Lunara AI Pattern Summary</span>
              </div>

              <div className="flex flex-col gap-space-sm">
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Sleep &amp; Mood Nexus</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  When sleep duration dropped below <span className="text-on-surface font-semibold">6.5 hours</span> in the mid-luteal phase, reports of irritability and afternoon lethargy escalated by <span className="text-primary font-semibold">43%</span>.
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Conversely, prioritizing sleep consistency in the follicular phase reliably amplified productive creative output and cognitive ease.
                </p>
              </div>

              {/* Visual Photo Insert */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  alt="Herbal chamomile tea in soft sunlight"
                  src={IMAGES.insightsHerbalRest}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-inverse-on-surface font-label-sm text-label-sm">
                  Phase Harmony: Herbal infusions paired with restorative rest
                </div>
              </div>

              {/* Doctor Appointment Action Card */}
              <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-sm">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">clinical_notes</span>
                  <span className="font-label-lg text-label-lg font-semibold">Provider Communication</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Generate a clean, standardized 2-page clinical report with symptom heatmaps and statistical regularity metrics.
                </p>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="mt-1 flex items-center justify-center gap-space-xs w-full py-2.5 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-all active:scale-[0.98] cursor-pointer"
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[18px] text-primary ${downloading ? 'animate-spin' : ''}`}>
                    {downloading ? 'progress_activity' : downloadSuccess ? 'check' : 'download'}
                  </span>
                  <span>
                    {downloading
                      ? 'Compiling Clinical PDF...'
                      : downloadSuccess
                      ? 'Health Summary Exported'
                      : 'Download Health Summary for Doctor Appointment'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Contextual Care Note */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-sm p-space-md bg-surface-container-high/60 rounded-xl">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px] text-outline">verified_user</span>
            <span>End-to-end encrypted biometric telemetry · HIPAA aligned data safeguards</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Generated with Lunara Engine v3.4</span>
        </div>
      </div>
    </div>
  );
};
