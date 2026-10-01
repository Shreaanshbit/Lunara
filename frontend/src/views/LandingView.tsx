import React, { useState } from 'react';
import { NavPath } from '../types';
import { IMAGES } from '../data/mockData';

interface LandingViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenDownload?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, onOpenDownload }) => {
  const [interactiveChatInput, setInteractiveChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  const handlePromptClick = (question: string) => {
    setInteractiveChatInput(question);
    simulateAiResponse(question);
  };

  const simulateAiResponse = (query: string) => {
    setChatResponse(null);
    setTimeout(() => {
      if (query.toLowerCase().includes('crave') || query.toLowerCase().includes('luteal')) {
        setChatResponse(
          'During the luteal phase, progesterone elevates basal metabolism by ~100–300 kcal/day while serotonin dips. Warm, slow-cooked foods (roasted root vegetables, stews, oats) offer grounding complex carbs that naturally support serotonin without blood glucose crashes.'
        );
      } else if (query.toLowerCase().includes('sleep') || query.toLowerCase().includes('rem')) {
        setChatResponse(
          'Rising follicular estrogen enhances deep REM sleep architecture and neuroplasticity. You will typically record deeper restorative cycles between Days 6 and 12.'
        );
      } else {
        setChatResponse(
          'Clinical summaries compile your cycle variance, luteal length, and symptom intensity heatmaps into a standardized 2-page document formatted for OB/GYN review.'
        );
      }
    }, 700);
  };

  return (
    <div className="w-full bg-surface text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Marketing Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(30,27,24,0.04)] border-b border-surface-container-high/40">
        <div className="h-20 max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <img
              alt="Lunara Logo"
              className="h-8 w-auto object-contain"
              src={IMAGES.emblem}
            />
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex flex-col text-left group cursor-pointer"
            >
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">
                Lunara
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-wide uppercase">
                Menstrual &amp; Wellbeing Sanctuary
              </span>
            </button>
          </div>

          <nav className="hidden xl:flex items-center gap-space-lg font-label-lg text-label-lg">
            <a href="#overview" className="transition-colors py-space-xs text-primary font-semibold">
              Overview
            </a>
            <a href="#the-4-phases" className="text-on-surface-variant hover:text-on-surface transition-colors py-space-xs">
              The 4 Phases
            </a>
            <a href="#features" className="text-on-surface-variant hover:text-on-surface transition-colors py-space-xs">
              Features
            </a>
            <a href="#ai-companion" className="text-on-surface-variant hover:text-on-surface transition-colors py-space-xs">
              AI Companion
            </a>
            <a href="#science-framework" className="text-on-surface-variant hover:text-on-surface transition-colors py-space-xs">
              Science &amp; Privacy
            </a>
          </nav>

          <div className="flex items-center gap-space-xs sm:gap-space-sm">
            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="hidden sm:inline-flex items-center gap-1.5 font-label-md text-label-md text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-primary/20"
                title="Install or Download Lunara"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download App</span>
              </button>
            )}
            <button
              onClick={() => onNavigate('login')}
              className="font-label-lg text-label-lg text-on-surface hover:text-primary px-space-sm py-space-xs transition-colors cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="inline-flex items-center justify-center font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container px-space-lg py-space-xs rounded-full transition-all duration-200 active:scale-[0.98] shadow-md shadow-primary/20 cursor-pointer"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              title="Enter Sanctuary App"
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center ml-space-2xs cursor-pointer shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full" id="overview">
          {/* Hero Section */}
          <section className="relative w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-xl md:pt-space-2xl pb-space-2xl md:pb-space-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
              {/* Text & Value Introduction */}
              <div className="lg:col-span-7 flex flex-col items-start space-y-space-md">
                <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-label-sm text-label-sm tracking-wide uppercase font-semibold">
                    A Sanctuary for Biometric Intuition · Menstrual &amp; Cognitive Health
                  </span>
                </div>

                <h1 className="font-headline-xl text-headline-xl text-on-surface leading-[1.1] tracking-tight">
                  Understand your cycle. <br className="hidden sm:inline" />
                  <span className="italic font-normal text-primary">Understand yourself.</span>
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Lunara brings harmony to hormonal fluctuations by connecting your cycle phases, daily mood shifts, symptom telemetry, and conversational intelligence — without algorithmic judgment or clinical coldness.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <button
                    onClick={() => onNavigate('signup')}
                    className="inline-flex items-center justify-center font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container px-space-xl py-3 rounded-full transition-all duration-200 active:scale-[0.98] shadow-md shadow-primary/20 cursor-pointer"
                  >
                    <span>Start Your Journey</span>
                    <span className="material-symbols-outlined ml-space-xs text-[18px]">arrow_forward</span>
                  </button>

                  <a
                    href="#science-framework"
                    className="inline-flex items-center justify-center font-label-lg text-label-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container px-space-lg py-3 rounded-full transition-colors shadow-sm"
                  >
                    Explore the Science
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-space-md flex flex-wrap items-center gap-y-2 gap-x-space-lg text-on-surface-variant font-label-sm text-label-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                    <span>HIPAA aligned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">lock</span>
                    <span>End-to-end client encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">science</span>
                    <span>Backed by endocrinology</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                  <img
                    alt="Ceramic teaware, dried lavender vase, and glowing candle in warm sunlight"
                    className="w-full h-full object-cover object-center"
                    src={IMAGES.landingHero}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent" />

                  {/* Live Biometric Floater Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-xl shadow-lg">
                    <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                            Luteal Phase · Day 18
                          </span>
                        </div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                          Autumn Inward Turn
                        </h2>
                      </div>

                      {/* Phase Progress Ring SVG */}
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                          <circle className="text-surface-container-highest" cx="24" cy="24" fill="none" r="18" stroke="currentColor" strokeWidth="4" />
                          <circle
                            className="text-secondary"
                            cx="24"
                            cy="24"
                            fill="none"
                            r="18"
                            stroke="currentColor"
                            strokeDasharray="113.1"
                            strokeDashoffset="40"
                            strokeLinecap="round"
                            strokeWidth="4"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center font-label-sm text-label-sm text-on-surface font-semibold">
                          64%
                        </span>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Progesterone peaking. Core metabolism elevated +0.3°C. Natural dip in afternoon focus — warm nourishment indicated.
                    </p>

                    <div className="mt-space-sm flex items-center justify-between pt-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg text-on-surface">
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">spa</span> Restorative Recipe:
                      </span>
                      <span className="font-label-sm text-label-sm font-semibold">Chamomile &amp; Golden Oat Milk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The 4-Phase Chronobiology Framework */}
          <section className="w-full bg-surface-container-low py-space-3xl" id="the-4-phases">
            <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="max-w-2xl mb-space-2xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  Chronobiological Architecture
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-2xs">
                  Synchronized with your biological clock
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Menstrual cycles are not just bleeding days; they are dynamic monthly seasons that govern your somatic energy, metabolic pacing, cognitive sharpness, and neurochemical resilience.
                </p>
              </div>

              {/* 4 Phase Cards Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {/* Phase 1: Menstrual */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-semibold font-label-md text-label-md">
                        01
                      </span>
                      <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                        Days 1–5
                      </span>
                    </div>
                    <div className="text-primary mb-space-xs">
                      <span className="material-symbols-outlined text-[28px]">ac_unit</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">The Winter Retreat</h3>
                    <p className="font-label-md text-label-md text-primary-container font-medium mb-space-xs">
                      Menstrual Phase
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      System reset. Hormones at baseline. Deep somatic intuition, desire for unhurried stillness, and cellular rejuvenation through iron and magnesium replenishment.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-xs bg-surface-container rounded-lg px-space-sm py-2">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Prescribed Ritual</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Yin stretching • Bone broth • Journaling
                    </span>
                  </div>
                </div>

                {/* Phase 2: Follicular */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-semibold font-label-md text-label-md">
                        02
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">
                        Days 6–13
                      </span>
                    </div>
                    <div className="text-tertiary mb-space-xs">
                      <span className="material-symbols-outlined text-[28px]">nature</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">The Spring Renewal</h3>
                    <p className="font-label-md text-label-md text-tertiary font-medium mb-space-xs">
                      Follicular Phase
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Rising estradiol stimulates neurogenesis and insulin sensitivity. Spiking curiosity, rapid ideation, structural planning, and lighthearted social connectivity.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-xs bg-surface-container rounded-lg px-space-sm py-2">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Prescribed Ritual</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Creative workshops • Fresh greens • Cardio
                    </span>
                  </div>
                </div>

                {/* Phase 3: Ovulatory */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-semibold font-label-md text-label-md">
                        03
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                        Days 14–16
                      </span>
                    </div>
                    <div className="text-on-surface-variant mb-space-xs">
                      <span className="material-symbols-outlined text-[28px]">wb_sunny</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">The Summer Zenith</h3>
                    <p className="font-label-md text-label-md text-on-surface-variant font-medium mb-space-xs">
                      Ovulatory Window
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Luteinizing Hormone (LH) peak and maximum testosterone. Unwavering confidence, effortless articulation, peak athletic endurance, and elevated pheromonal attraction.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-xs bg-surface-container rounded-lg px-space-sm py-2">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Prescribed Ritual</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Public speaking • High-intensity flow • Fiber
                    </span>
                  </div>
                </div>

                {/* Phase 4: Luteal */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-semibold font-label-md text-label-md">
                        04
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                        Days 17–28
                      </span>
                    </div>
                    <div className="text-secondary mb-space-xs">
                      <span className="material-symbols-outlined text-[28px]">nights_stay</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">The Autumn Turn</h3>
                    <p className="font-label-md text-label-md text-secondary font-medium mb-space-xs">
                      Luteal Phase
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Progesterone dominance prompts inward somatic auditing. Detailing systems, asserting emotional boundaries, craving grounding nourishment, and sensory comfort.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-xs bg-surface-container rounded-lg px-space-sm py-2">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Prescribed Ritual</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Complex carbs • Boundary setting • Epsom baths
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5 Core Product Feature Deep-Dives */}
          <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-3xl" id="features">
            <div className="text-center max-w-2xl mx-auto mb-space-2xl">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                Comprehensive Capabilities
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-2xs">
                Refined intelligence for intuitive living
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Five tactile pillars engineered to replace clinical anxiety with clarity, emotional dignity, and physiological insight.
              </p>
            </div>

            {/* Feature Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
              {/* Feature 1: Predictive & Biorhythmic Cycle Tracking */}
              <div className="md:col-span-7 bg-surface-container rounded-2xl p-space-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-space-xs mb-space-sm">
                    <span className="material-symbols-outlined text-primary text-[24px]">timeline</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wide">
                      Pillar I
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Predictive &amp; Biorhythmic Tracking
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-lg">
                    Continuous Bayesian forecasting calculates your next phase transition, ovulation threshold, and PMS timeline with precision that refines with every cycle.
                  </p>
                </div>

                {/* Inline SVG Visualization: Cycle Regularity Horizon */}
                <div className="mt-space-xl bg-surface-container-lowest p-space-md rounded-xl shadow-inner">
                  <div className="flex justify-between items-center mb-space-xs">
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">3-Cycle Regularity Arc</span>
                    <span className="font-label-sm text-label-sm text-tertiary font-bold">98.2% Predictability</span>
                  </div>
                  <svg className="w-full h-24" fill="none" viewBox="0 0 500 100">
                    <path
                      d="M 0,80 Q 70,20 140,75 T 280,40 T 420,85 T 500,30"
                      fill="none"
                      stroke="#d9c1c0"
                      strokeDasharray="4 4"
                      strokeWidth="2"
                    />
                    <path
                      d="M 0,70 Q 75,10 150,65 T 300,25 T 450,70 L 500,20"
                      fill="none"
                      stroke="#8e4647"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <circle cx="300" cy="25" fill="#8e4647" r="5" />
                    <circle cx="300" cy="25" fill="none" opacity="0.4" r="9" stroke="#8e4647" strokeWidth="1.5" />
                    <text fill="#1e1b18" fontFamily="Manrope" fontSize="11" fontWeight="600" x="312" y="28">
                      Today (Follicular Peak)
                    </text>
                  </svg>
                  <div className="grid grid-cols-3 gap-2 mt-space-xs pt-space-xs text-center">
                    <div className="bg-surface-container-low py-1 rounded">
                      <span className="block font-label-sm text-label-sm text-on-surface-variant text-[11px]">Avg Length</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">29.4 d</span>
                    </div>
                    <div className="bg-surface-container-low py-1 rounded">
                      <span className="block font-label-sm text-label-sm text-on-surface-variant text-[11px]">Luteal Span</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">13.8 d</span>
                    </div>
                    <div className="bg-surface-container-low py-1 rounded">
                      <span className="block font-label-sm text-label-sm text-on-surface-variant text-[11px]">Sleep Index</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">8.4 / 10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Somatic Multi-Axial Mood */}
              <div className="md:col-span-5 bg-surface-container-low rounded-2xl p-space-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-space-xs mb-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[24px]">tune</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary tracking-wide">
                      Pillar II
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Somatic Multi-Axial Mood
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Moving beyond simple binary emojis. Measure multidimensional cognitive energy, nervous tension, and physical groundedness.
                  </p>
                </div>
                <div className="mt-space-lg space-y-space-sm bg-surface-container-lowest p-space-md rounded-xl">
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface font-semibold">Neuro-Energy</span>
                      <span className="text-secondary font-bold">Calm Vitality (72%)</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full w-[72%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface font-semibold">Somatic Tension</span>
                      <span className="text-primary font-bold">Minimal (24%)</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full w-[24%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm mb-1">
                      <span className="text-on-surface font-semibold">Creative Inception</span>
                      <span className="text-tertiary font-bold">Peak (88%)</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full rounded-full w-[88%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3: Nuanced Symptom Intelligence */}
              <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-space-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-space-xs mb-space-sm">
                    <span className="material-symbols-outlined text-primary text-[24px]">thermostat</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-primary tracking-wide">
                      Pillar III
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Nuanced Symptom Telemetry</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Log tactile bodily cues with granular intensity scales: cervical fluid, basal temperature shifts, tension headaches, and digestion markers.
                  </p>
                </div>
                <div className="mt-space-md flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
                    Mild Uterine Waves
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                    Fluid: Egg-white
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
                    Restful Sleep
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
                    BBT: 36.6°C
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface">
                    Pelvic Lightness
                  </span>
                </div>
              </div>

              {/* Feature 4: Personal Pattern Synthesis */}
              <div className="md:col-span-4 bg-surface-container rounded-2xl p-space-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-space-xs mb-space-sm">
                    <span className="material-symbols-outlined text-tertiary text-[24px]">hub</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-tertiary tracking-wide">
                      Pillar IV
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Personal Pattern Synthesis</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Lunara cross-indexes your sleep, exertion, and cycle timeline to reveal non-obvious correlations without alarmist medical jargon.
                  </p>
                </div>
                <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest">
                  <div className="flex items-center gap-2 text-tertiary mb-1">
                    <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                    <span className="font-label-sm text-label-sm font-bold uppercase">Verified Synthesis</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                    "Fatigue manifests 78% more frequently on Days 21–23 when dietary magnesium intake dips below threshold."
                  </p>
                </div>
              </div>

              {/* Feature 5: Lunara AI Wellness Companion */}
              <div className="md:col-span-4 bg-surface-container-high rounded-2xl p-space-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-space-xs mb-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[24px]">auto_awesome</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary tracking-wide">
                      Pillar V
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Empathetic AI Companion</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                    Private, contextual conversational support. Answers your complex chronobiological queries grounded strictly in your personal historical logs.
                  </p>
                </div>
                <div className="mt-space-md flex items-center justify-between bg-surface-container-lowest px-space-md py-space-sm rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                    <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                      Context-Engine Ready
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">Zero-Leakage</span>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works (The 4-Step Journey) */}
          <section className="w-full bg-surface-container-lowest py-space-3xl">
            <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="max-w-2xl mb-space-2xl">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  The Practice of Attunement
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-2xs">
                  How Lunara weaves into your daily life
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  A gentle morning check-in that takes less than thirty seconds, offering continuous bodily self-possession for the rest of your month.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg relative">
                {/* Step 1 */}
                <div className="flex flex-col space-y-space-sm bg-surface-container-low p-space-lg rounded-xl relative">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface">
                    1
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Track Sensations</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Log cycle markers, energy flows, mood shifts, and sleep duration in 30 seconds every morning.
                  </p>
                  <div className="pt-space-xs text-primary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span>Fluid, non-judgmental input</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col space-y-space-sm bg-surface-container-low p-space-lg rounded-xl relative">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface">
                    2
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Understand Rhythms</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Watch real-time physiological shifts align with the 4 hormonal seasons to demystify emotional weather.
                  </p>
                  <div className="pt-space-xs text-primary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span>Dynamic chronobiology mapping</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col space-y-space-sm bg-surface-container-low p-space-lg rounded-xl relative">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface">
                    3
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Discover Patterns</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Uncover personalized correlations between nutrition, stress triggers, and cycle symptoms over time.
                  </p>
                  <div className="pt-space-xs text-primary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span>Continuous pattern synthesis</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col space-y-space-sm bg-surface-container-low p-space-lg rounded-xl relative">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-headline-sm text-on-surface">
                    4
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Take Somatic Care</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Apply phase-synced botanical tonics, tailored workout intensities, and rest rituals that honor your physiology.
                  </p>
                  <div className="pt-space-xs text-primary font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                    <span>Restorative wellness protocols</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Companion Interactive Preview */}
          <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-3xl" id="ai-companion">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
              <div className="lg:col-span-5 space-y-space-md">
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
                  Contextual AI Sanctuary
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  A compassionate dialogue with your biological record
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Lunara's AI Companion isn't an arbitrary chatbot trained on generic forum debates. It is an empathetic clinical scholar with isolated access solely to your own encrypted biometric history.
                </p>

                {/* Suggested Prompt Pills */}
                <div className="pt-space-xs space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold block">
                    Try asking questions like:
                  </span>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handlePromptClick('Why do I crave warm, slow-cooked foods during my luteal phase?')}
                      className="text-left px-space-md py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors shadow-sm flex items-center justify-between cursor-pointer"
                    >
                      <span>"Why do I crave warm, slow-cooked foods during my luteal phase?"</span>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">arrow_forward</span>
                    </button>
                    <button
                      onClick={() => handlePromptClick('Explain how my follicular estrogen surge affects my deep REM sleep.')}
                      className="text-left px-space-md py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors shadow-sm flex items-center justify-between cursor-pointer"
                    >
                      <span>"Explain how my follicular estrogen surge affects my deep REM sleep."</span>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">arrow_forward</span>
                    </button>
                    <button
                      onClick={() => handlePromptClick('Prepare a clinical timeline export for my OB/GYN appointment.')}
                      className="text-left px-space-md py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors shadow-sm flex items-center justify-between cursor-pointer"
                    >
                      <span>"Prepare a clinical timeline export for my OB/GYN appointment."</span>
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dialogue Shell Interface */}
              <div className="lg:col-span-7 bg-surface-container rounded-2xl p-space-md sm:p-space-lg shadow-lg">
                <div className="flex items-center justify-between pb-space-sm mb-space-md bg-surface-container-lowest px-space-md py-space-sm rounded-xl">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                    </div>
                    <div>
                      <h3 className="font-label-md text-label-md font-bold text-on-surface">Lunara Intelligence</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Day 18 • Luteal • Historical Memory Active
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                    Zero-Knowledge
                  </span>
                </div>

                <div className="space-y-space-md">
                  {/* User Bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-primary text-on-primary rounded-2xl rounded-tr-sm px-space-md py-space-sm shadow-sm">
                      <p className="font-body-md text-body-md">
                        {interactiveChatInput || "I've been feeling really exhausted today even though I had 8 hours of unbroken sleep. Is this normal for me?"}
                      </p>
                      <span className="block text-right font-label-sm text-label-sm text-primary-fixed opacity-75 mt-1">
                        10:42 AM
                      </span>
                    </div>
                  </div>

                  {/* Lunara AI Bubble */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] bg-surface-container-lowest text-on-surface rounded-2xl rounded-tl-sm p-space-md shadow-sm space-y-space-sm">
                      <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[16px]">bubble_chart</span>
                        <span>Contextual Synthesis</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        {chatResponse || (
                          <>
                            You are currently on <strong className="font-semibold text-primary">Day 18</strong> of your cycle in the <strong className="font-semibold text-secondary">luteal phase</strong>. Your progesterone peak naturally elevates core body temperature by ~0.3°C, significantly increasing basal metabolic energy expenditure.
                          </>
                        )}
                      </p>
                      <div className="p-space-xs rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant">
                        <span className="font-semibold text-on-surface">Your personal record:</span> Across your past 3 recorded cycles, a similar vitality dip occurred between Days 17 and 20. It usually resolves as estrogen balances out.
                      </div>
                      <div className="pt-space-2xs flex flex-wrap gap-2">
                        <button
                          onClick={() => onNavigate('dashboard')}
                          className="px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-tertiary">local_cafe</span>
                          Herbal Restorative Recipe
                        </button>
                        <button
                          onClick={() => onNavigate('lunara-ai')}
                          className="px-space-sm py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-secondary">self_improvement</span>
                          10-Min Somatic Meditation
                        </button>
                      </div>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant mt-1">10:43 AM</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Input Box */}
                <div className="mt-space-md pt-space-xs">
                  <div className="bg-surface-container-lowest rounded-xl p-space-xs flex items-center gap-space-xs shadow-sm">
                    <span className="material-symbols-outlined text-on-surface-variant ml-2 text-[20px]">mic</span>
                    <input
                      className="w-full bg-transparent px-space-xs py-2 text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/60 focus:outline-none"
                      placeholder="Inquire about your current cycle biomarkers..."
                      type="text"
                      value={interactiveChatInput}
                      onChange={(e) => setInteractiveChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          simulateAiResponse(interactiveChatInput);
                        }
                      }}
                    />
                    <button
                      onClick={() => simulateAiResponse(interactiveChatInput)}
                      className="bg-primary hover:bg-primary-container text-on-primary p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy, Security & Data Sovereignty Manifesto */}
          <section className="w-full bg-inverse-surface text-inverse-on-surface py-space-3xl" id="science-framework">
            <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                <div className="lg:col-span-7 space-y-space-md">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-dim/20 text-inverse-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">shield</span> The Lunara Sovereignty Compact
                  </div>

                  <h2 className="font-headline-lg text-headline-lg text-inverse-on-surface">
                    Your intimate health data is never an advertising product.
                  </h2>

                  <p className="font-body-md text-body-md text-surface-dim max-w-xl">
                    Menstrual and cognitive tracking demands the highest standard of sanctity. We believe health telemetry belongs exclusively to the person who lives it.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                    <div className="space-y-1">
                      <h3 className="font-headline-sm text-headline-sm text-inverse-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">key</span> Zero Knowledge Keys
                      </h3>
                      <p className="font-body-sm text-body-sm text-surface-dim">
                        Decryption keys reside strictly on your personal device. Even Lunara engineers cannot view your menstrual logs or symptom data.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-headline-sm text-headline-sm text-inverse-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">block</span> Zero Data Brokering
                      </h3>
                      <p className="font-body-sm text-body-sm text-surface-dim">
                        We never monetize, cross-share, or license biometric telemetry to behavioral advertisement brokers or insurers.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-headline-sm text-headline-sm text-inverse-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">clinical_notes</span> Medical Portability
                      </h3>
                      <p className="font-body-sm text-body-sm text-surface-dim">
                        Generate clean, confidential PDF summaries structured specifically for clinical discussions with your gynecologist.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-headline-sm text-headline-sm text-inverse-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">delete_forever</span> Instant Purge
                      </h3>
                      <p className="font-body-sm text-body-sm text-surface-dim">
                        Single-click permanent database purge. When you decide to leave the sanctuary, your biological footprint is wiped instantly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Privacy Visual Plaque */}
                <div className="lg:col-span-5 bg-surface-dim/10 rounded-2xl p-space-xl border-0 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center gap-space-sm mb-space-md">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[36px]">security</span>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface">Device-Level Vault</h4>
                      <p className="font-label-sm text-label-sm text-surface-dim">256-Bit Hardware Keystore</p>
                    </div>
                  </div>

                  <div className="space-y-space-sm font-label-md text-label-md">
                    <div className="flex justify-between py-2 border-b border-surface-dim/20 text-surface-dim">
                      <span>Telemetry Encryption</span>
                      <span className="text-inverse-primary font-mono">AES-GCM-256</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-surface-dim/20 text-surface-dim">
                      <span>Cloud Zero-Knowledge Proof</span>
                      <span className="text-inverse-primary font-mono">zk-SNARKs</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-surface-dim/20 text-surface-dim">
                      <span>Cloud Storage Location</span>
                      <span className="text-inverse-primary font-mono">Switzerland / EU</span>
                    </div>
                    <div className="flex justify-between py-2 text-surface-dim">
                      <span>Regulatory Standard</span>
                      <span className="text-inverse-primary font-mono">HIPAA &amp; GDPR</span>
                    </div>
                  </div>

                  <div className="mt-space-lg pt-space-xs text-center">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="font-label-sm text-label-sm text-inverse-primary underline hover:text-on-primary-fixed-variant transition-colors cursor-pointer"
                    >
                      Open Private Sanctuary Dashboard →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Warm Call to Action */}
          <section className="w-full max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-3xl text-center">
            <div className="max-w-2xl mx-auto space-y-space-md">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-fixed text-primary mx-auto shadow-sm">
                <span className="material-symbols-outlined text-[28px]">spa</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
                Begin your rhythm of self-attunement.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Join thousands of thoughtful women rediscovering balance, clarity, and genuine bodily peace across every season of their cycle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md pt-space-sm">
                <button
                  onClick={() => onNavigate('signup')}
                  className="w-full sm:w-auto inline-flex items-center justify-center font-label-lg text-label-lg bg-primary text-on-primary hover:bg-primary-container px-space-2xl py-3 rounded-full transition-all duration-200 active:scale-[0.98] shadow-md shadow-primary/20 cursor-pointer"
                >
                  Start Your Journey
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="w-full sm:w-auto inline-flex items-center justify-center font-label-lg text-label-lg bg-surface-container text-on-surface hover:bg-surface-container-high px-space-xl py-3 rounded-full transition-colors cursor-pointer"
                >
                  Already have a sanctuary? Log In
                </button>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant italic pt-space-xs">
                No credit card required for standard chronobiological journaling. Complete privacy guaranteed.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Marketing Footer */}
      <footer className="w-full bg-surface-container-low text-on-surface py-space-3xl mt-space-3xl shadow-[0_-1px_16px_rgba(30,27,24,0.03)] border-t border-surface-container-high">
        <div className="max-w-[1200px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-2xl">
            <div className="lg:col-span-5 flex flex-col items-start gap-space-md">
              <div className="flex items-center gap-space-xs">
                <img alt="Lunara Logo" className="h-7 w-auto object-contain" src={IMAGES.emblem} />
                <span className="font-headline-md text-headline-md text-on-surface tracking-tight">Lunara</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                An empathetic, scholarly, and unhurried space for cycle literacy, hormonal tracking, and mindful emotional restoration. Free from artificial tropes, designed for authentic human resonance.
              </p>
              <div className="flex items-center gap-space-sm bg-surface px-space-md py-space-xs rounded-xl shadow-[0_1px_6px_rgba(30,27,24,0.04)]">
                <span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                  Zero-knowledge biometric telemetry. Your data stays yours.
                </span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold">
                Platform &amp; Ethos
              </span>
              <nav className="flex flex-col gap-space-xs">
                <button onClick={() => onNavigate('dashboard')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                  Product Architecture
                </button>
                <button onClick={() => onNavigate('my-cycle')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                  The 4 Hormonal Phases
                </button>
                <button onClick={() => onNavigate('symptoms')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                  Sensory Symptom Journal
                </button>
                <button onClick={() => onNavigate('lunara-ai')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                  Empathetic AI Companion
                </button>
              </nav>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold">
                Integrity &amp; Care
              </span>
              <nav className="flex flex-col gap-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Scientific Advisory Board
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Clinical Helpline &amp; Triage (24/7)
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  HIPAA &amp; Encryption Specs
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Terms of Sanctuary
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Contact Editorial &amp; Support
                </span>
              </nav>
            </div>
          </div>

          <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant border-t border-surface-container">
            <p className="font-label-sm text-label-sm">© 2025 Lunara Sanctuary Inc. Reclaiming bodily rhythm in peace.</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant italic">Designed with quiet clinical reverence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
