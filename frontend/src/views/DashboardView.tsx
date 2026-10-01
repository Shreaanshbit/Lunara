import React from 'react';
import { NavPath, MoodLog, SymptomLog } from '../types';
import { USER_PROFILE, IMAGES } from '../data/mockData';

interface DashboardViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenLogMood: () => void;
  onOpenLogSymptoms: () => void;
  currentMood: MoodLog;
  symptoms: SymptomLog[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenLogMood,
  onOpenLogSymptoms,
  currentMood,
  symptoms,
}) => {
  const [reportExported, setReportExported] = React.useState(false);

  const handleExport = () => {
    setReportExported(true);
    setTimeout(() => setReportExported(false), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-gutter md:px-gutter-desktop py-space-lg flex flex-col gap-space-xl max-w-[1240px] mx-auto w-full">
        {/* Top Greeting & Header Intro */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
              <span>Day {USER_PROFILE.currentDay} · Sanctuary Overview</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Good morning, {USER_PROFILE.preferredName}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Here's a look at your wellbeing today. You're in your{' '}
              <span className="text-secondary font-medium">Luteal phase</span>.
            </p>
          </div>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              onClick={onOpenLogMood}
              className="group flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-space-xs rounded-full font-label-md text-label-md hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_reaction</span>
              <span>+ Log Mood</span>
            </button>
            <button
              onClick={onOpenLogSymptoms}
              className="group flex items-center gap-space-xs bg-surface-container-high text-on-surface hover:bg-surface-container-highest px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all active:scale-[0.98] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">vital_signs</span>
              <span>+ Log Symptoms</span>
            </button>
            <button
              onClick={() => onNavigate('my-cycle')}
              className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface px-space-md py-space-xs rounded-full font-label-md text-label-md transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Cycle Calendar</span>
            </button>
            <button
              onClick={handleExport}
              className="relative flex items-center gap-space-2xs p-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors cursor-pointer"
              title="Export Encrypted Report"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
              {reportExported && (
                <span className="absolute -top-8 right-0 bg-inverse-surface text-inverse-on-surface text-[11px] font-label-sm px-2 py-1 rounded shadow-md whitespace-nowrap">
                  Report Encrypted &amp; Shared
                </span>
              )}
            </button>
          </div>
        </section>

        {/* Main Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left / Main Column (8 of 12 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
            {/* 1. Current Cycle Card */}
            <article className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />

              {/* Top Meta Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-b-0 pb-0">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Active Hormone Phase
                  </span>
                  <div className="flex items-baseline gap-space-xs">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-normal">
                      Cycle Day {USER_PROFILE.currentDay}
                    </h2>
                    <span className="font-headline-sm text-headline-sm text-on-surface-variant italic">
                      · Luteal
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-lg self-start sm:self-auto bg-surface-container-low px-space-md py-space-xs rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Next Period</span>
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      in {USER_PROFILE.nextPeriodInDays} days
                    </span>
                  </div>
                  <div className="w-px h-6 bg-surface-container-highest" />
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Cycle Length</span>
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {USER_PROFILE.cycleLength} days avg
                    </span>
                  </div>
                </div>
              </div>

              {/* Phase Visualization (Linear & Interactive Aesthetic) */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm flex-wrap gap-y-1">
                  <div className="flex items-center gap-space-2xs text-primary font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Menstrual (1-5)</span>
                  </div>
                  <div className="flex items-center gap-space-2xs text-tertiary">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                    <span>Follicular (6-13)</span>
                  </div>
                  <div className="flex items-center gap-space-2xs text-outline">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                    <span>Ovulation (14-16)</span>
                  </div>
                  <div className="flex items-center gap-space-2xs text-secondary font-bold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span>Luteal (17-29)</span>
                  </div>
                </div>

                {/* Segmented Progress Bar */}
                <div className="relative w-full h-4 bg-surface-container rounded-full overflow-hidden flex p-0.5 gap-1">
                  {/* Menstrual segment (5/29 ~ 17.2%) */}
                  <div className="h-full bg-primary/80 rounded-full" style={{ width: '17.2%' }} />
                  {/* Follicular segment (8/29 ~ 27.6%) */}
                  <div className="h-full bg-tertiary/70 rounded-full" style={{ width: '27.6%' }} />
                  {/* Ovulation segment (3/29 ~ 10.3%) */}
                  <div className="h-full bg-outline/60 rounded-full" style={{ width: '10.3%' }} />
                  {/* Luteal segment (13/29 ~ 44.8%) with active marker */}
                  <div className="relative h-full bg-surface-container-highest rounded-full overflow-hidden" style={{ width: '44.8%' }}>
                    <div className="h-full bg-secondary rounded-full" style={{ width: '15.4%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant px-space-2xs">
                  <span>Day 1</span>
                  <span className="text-secondary font-semibold">Today · Day {USER_PROFILE.currentDay}</span>
                  <span>Day 29</span>
                </div>
              </div>

              {/* Hormonal Arc Graphic & Editorial Narrative */}
              <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col md:flex-row items-center gap-space-md">
                <div className="w-full md:w-44 flex-shrink-0 flex flex-col items-center justify-center p-space-xs bg-surface-container-lowest rounded-md">
                  <svg className="w-full h-12 overflow-visible" fill="none" viewBox="0 0 160 50">
                    <path
                      className="text-secondary/30"
                      d="M 0,40 Q 30,38 50,25 T 90,10 Q 115,12 135,32 T 160,42"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    {/* Progesterone curve highlighting peak */}
                    <path
                      className="text-secondary"
                      d="M 80,45 Q 100,20 120,8 Q 140,15 160,35"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    />
                    <circle className="fill-surface-container-lowest stroke-secondary" cx="112" cy="11" r="5" strokeWidth="2" />
                  </svg>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold mt-1">
                    Progesterone Peak
                  </span>
                </div>
                <div className="flex flex-col gap-space-2xs text-left">
                  <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                    Restful rhythm encouraged
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Progesterone levels are naturally elevated. You may feel a desire for calmer routines, earlier bedtimes, and comforting, grounding meals.
                  </p>
                </div>
              </div>
            </article>

            {/* 2. Personalized Pattern Insight Card */}
            <article className="bg-secondary-fixed/30 rounded-xl p-space-lg flex flex-col gap-space-md relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Your Pattern</span>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container-lowest text-secondary px-space-xs py-space-2xs rounded-full shadow-sm">
                  Hormone-Mood Correlation
                </span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface font-normal leading-relaxed italic">
                “Your energy has tended to decrease during the luteal phase in your recent cycles. Consistent sleep and hydration may help ease the transition.”
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  <span>Based on 4 logged cycles</span>
                  <span>·</span>
                  <span className="font-semibold text-secondary">Pattern confidence 86%</span>
                  <span>·</span>
                  <span className="italic">Not medical advice</span>
                </div>
                <button
                  onClick={() => onNavigate('insights')}
                  className="inline-flex items-center gap-space-2xs font-label-lg text-label-lg text-secondary hover:text-on-secondary-container transition-colors font-semibold self-start sm:self-auto cursor-pointer"
                >
                  <span>View Full Insights</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </article>

            {/* 3. Recent Symptoms Logged Card */}
            <article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">health_metrics</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Symptoms Logged</h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Past 48 Hours</span>
              </div>

              <div className="flex flex-wrap gap-space-xs">
                {symptoms.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-xl hover:bg-surface-container transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface">{s.name}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{s.severityLabel}</span>
                    </div>
                  </div>
                ))}

                {/* Add new tag trigger */}
                <button
                  onClick={onOpenLogSymptoms}
                  className="flex items-center gap-space-2xs px-space-sm py-space-xs rounded-xl text-on-surface-variant hover:text-on-surface bg-surface-container-lowest hover:bg-surface-container transition-colors font-label-md text-label-md cursor-pointer border border-dashed border-outline-variant/60"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Add tag</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-space-xs text-on-surface-variant border-t border-surface-container/60">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Last check-in recorded at 8:45 AM today
                </span>
                <button
                  onClick={onOpenLogSymptoms}
                  className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors flex items-center gap-space-2xs cursor-pointer"
                >
                  <span>Log or edit today's symptoms</span>
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
              </div>
            </article>
          </div>

          {/* Right Column (4 of 12 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg min-w-0">
            {/* 1. Today's Mood & State Card */}
            <article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Today's State</h3>
                <span className="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-container/40 px-space-xs py-space-2xs rounded-full">
                  Updated
                </span>
              </div>

              {/* Overall Mood Indicator */}
              <div className="flex items-center gap-space-md p-space-sm bg-surface-container-low rounded-lg">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    sentiment_neutral
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Primary Feeling</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                    {currentMood.primaryMood}
                  </span>
                </div>
              </div>

              {/* Detailed Slider Metrics */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                {/* Stress Metric */}
                <div className="flex flex-col gap-space-2xs">
                  <div className="flex justify-between items-center font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium">Stress</span>
                    <span className="text-on-surface-variant">
                      {currentMood.stress} / 10{' '}
                      <span className="text-on-surface-variant/70">
                        ({currentMood.stress <= 3 ? 'Mild' : currentMood.stress <= 6 ? 'Low-Moderate' : 'Elevated'})
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-outline rounded-full transition-all duration-300" style={{ width: `${currentMood.stress * 10}%` }} />
                  </div>
                </div>

                {/* Anxiety Metric */}
                <div className="flex flex-col gap-space-2xs">
                  <div className="flex justify-between items-center font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium">Anxiety</span>
                    <span className="text-on-surface-variant">
                      {currentMood.anxiety} / 10{' '}
                      <span className="text-on-surface-variant/70">
                        ({currentMood.anxiety <= 3 ? 'Mild' : currentMood.anxiety <= 6 ? 'Moderate' : 'High'})
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all duration-300" style={{ width: `${currentMood.anxiety * 10}%` }} />
                  </div>
                </div>

                {/* Energy Metric */}
                <div className="flex flex-col gap-space-2xs">
                  <div className="flex justify-between items-center font-label-sm text-label-sm">
                    <span className="text-on-surface font-medium">Energy</span>
                    <span className="text-on-surface-variant">
                      {currentMood.energy} / 10{' '}
                      <span className="text-on-surface-variant/70">
                        ({currentMood.energy <= 3 ? 'Resting' : currentMood.energy <= 6 ? 'Steady' : 'Vibrant'})
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${currentMood.energy * 10}%` }} />
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenLogMood}
                className="w-full mt-space-xs py-space-xs bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-lg font-label-md text-label-md transition-all active:scale-[0.99] flex items-center justify-center gap-space-2xs cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Update Today's Check-in</span>
              </button>
            </article>

            {/* 2. Lunara AI Companion Card */}
            <article className="bg-gradient-to-br from-primary-fixed/40 via-surface-container-low to-secondary-fixed/40 rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-20 text-secondary pointer-events-none">
                <span className="material-symbols-outlined text-[72px]">bedtime</span>
              </div>
              <div className="flex flex-col gap-space-2xs z-10">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">auto_awesome</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Lunara AI
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-normal">Talk to Lunara</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Have a question, feeling, or symptom you'd like to unpack?
                </p>
              </div>

              {/* Dialog Preview Bubble */}
              <div className="flex flex-col gap-space-xs bg-surface-container-lowest/80 backdrop-blur-sm p-space-sm rounded-lg text-body-sm text-body-sm shadow-sm z-10">
                <div className="flex items-start gap-space-2xs">
                  <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant shrink-0">Elena:</span>
                  <span className="text-on-surface italic">“I feel a bit sluggish this morning...”</span>
                </div>
                <div className="flex items-start gap-space-2xs pl-space-xs border-l-2 border-secondary/40">
                  <span className="font-label-sm text-label-sm font-semibold text-secondary shrink-0">Lunara:</span>
                  <span className="text-on-surface leading-tight">
                    “Day 18 is typical for gentle shifts in energy. Let's explore what helps you rest today.”
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('lunara-ai')}
                className="w-full py-space-xs px-space-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-semibold hover:bg-on-secondary-container transition-all shadow-sm flex items-center justify-center gap-space-xs z-10 active:scale-[0.98] cursor-pointer"
                type="button"
              >
                <span>Chat with Lunara AI</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </article>

            {/* 3. Daily Wellness Tip / Gentle Note */}
            <article className="bg-tertiary-fixed/30 rounded-xl p-space-md shadow-sm flex items-start gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-tertiary/15 flex items-center justify-center text-tertiary flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">spa</span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-fixed font-semibold">
                  Gentle Practice
                </span>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  Warm herbal tea and 20 minutes of restorative stretching match your current energy curve gracefully.
                </p>
              </div>
            </article>

            {/* Sanctuary Visual Ambience Card */}
            <div className="relative rounded-xl overflow-hidden shadow-sm h-36 bg-surface-container">
              <div
                className="bg-cover bg-center w-full h-full transform hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${IMAGES.presenceStillLife}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-transparent flex items-end p-space-md">
                <span className="font-headline-sm text-headline-sm text-surface italic font-light">
                  Presence over perfection.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Quote / Grounding Footer Note */}
        <footer className="pt-space-lg pb-space-xl flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-space-sm border-t border-surface-container/60">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[18px]">chevron_left</span>
            <span>Your biometric data is encrypted on device.</span>
          </div>
          <div className="flex items-center gap-space-md">
            <button onClick={() => onNavigate('landing')} className="hover:text-on-surface transition-colors cursor-pointer">
              Privacy Sanctuary
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('profile-settings')} className="hover:text-on-surface transition-colors cursor-pointer">
              Integrations
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('landing')} className="hover:text-on-surface transition-colors cursor-pointer">
              Clinical Advisory Team
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
