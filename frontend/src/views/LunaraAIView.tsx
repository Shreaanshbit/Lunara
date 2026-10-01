import React, { useState, useRef, useEffect } from 'react';
import { NavPath, ChatMessage, MoodLog, SymptomLog } from '../types';
import { USER_PROFILE, INITIAL_CHAT_MESSAGES, SUGGESTED_PROMPTS, IMAGES } from '../data/mockData';

interface LunaraAIViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenLogSymptoms: () => void;
  currentMood: MoodLog;
  symptoms: SymptomLog[];
}

export const LunaraAIView: React.FC<LunaraAIViewProps> = ({
  onNavigate,
  onOpenLogSymptoms,
  currentMood,
  symptoms,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [nutritionModalOpen, setNutritionModalOpen] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      time: timeStr,
      text,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Contextual Lunara intelligent response
    setTimeout(() => {
      let replyText = '';
      let insightCallout: { title: string; description: string } | undefined = undefined;
      let actionChips: { label: string; icon: string; action: string }[] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('sleep') || lower.includes('energy')) {
        replyText = `On Day ${USER_PROFILE.currentDay}, your basal temperature stays slightly elevated and progesterone peaks. In your previous 3 cycles, this temporary lull is followed by a natural stabilizing period around Day 22. Honouring your physical cues with 20–30 minutes of somatic stillness and warm liquids is profoundly restorative.`;
        insightCallout = {
          title: 'Metabolic Energy Shift',
          description: 'Basal metabolic energy consumption rises by roughly 100–300 kcal/day in the luteal phase, which can trigger mid-afternoon sluggishness.',
        };
        actionChips = [
          { label: 'View 3 Gentle Energy Tips', icon: 'spa', action: 'tips' },
          { label: 'Hydration & Electrolytes', icon: 'local_drink', action: 'hydrate' },
        ];
      } else if (lower.includes('phase') || lower.includes('cycle') || lower.includes('when')) {
        replyText = `You are currently on Day 18 of your 29-day cycle, situated firmly in the Luteal phase (Phase III). Your next estimated menstrual onset is in approximately 9 days (October 23). Ovulation was recorded around Day 14.`;
        actionChips = [
          { label: 'Open Cycle Calendar', icon: 'timelapse', action: 'calendar' },
        ];
      } else if (lower.includes('pattern') || lower.includes('correlat') || lower.includes('headache')) {
        replyText = `Looking across your 6 months of historical logs, we detect two strong signatures: your headaches occur almost exclusively after 2+ nights of sleep under 6.5 hours paired with stress scores above 6/10. Furthermore, afternoon fatigue peaks between Days 17 and 20.`;
        insightCallout = {
          title: 'Verified Correlation Signature',
          description: 'Magnesium glycinate taken 45 minutes before sleep reduced Day 19 tension by 54% in your August cycle.',
        };
      } else if (lower.includes('symptom') || lower.includes('bloat') || lower.includes('cramp')) {
        const loggedNames = symptoms.map((s) => s.name).join(', ');
        replyText = `Today you've logged: ${loggedNames}. Mild bloating and fatigue are very characteristic of elevated progesterone slowing intestinal transit. Sipping ginger or chamomile tea and light hip openers gently relieves abdominal pressure.`;
        actionChips = [
          { label: 'Log New Symptom', icon: 'add', action: 'log_symptom' },
        ];
      } else {
        replyText = `I'm reflecting on your logged patterns. On Day 18 of your luteal rhythm, your nervous system is biologically tuned for quiet inward processing. What feels most nurturing for you in this moment?`;
        actionChips = [
          { label: 'Explore Gentle Practice', icon: 'spa', action: 'tips' },
          { label: 'Review Luteal Guide', icon: 'menu_book', action: 'guide' },
        ];
      }

      const newLunaraMsg: ChatMessage = {
        id: `lunara-${Date.now()}`,
        sender: 'lunara',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: replyText,
        insightCallout,
        actionChips,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, newLunaraMsg]);
    }, 1200);
  };

  const handleChipClick = (action: string) => {
    if (action === 'calendar') {
      onNavigate('my-cycle');
    } else if (action === 'log_symptom') {
      onOpenLogSymptoms();
    } else if (action === 'view_energy' || action === 'guide') {
      onNavigate('insights');
    } else if (action === 'tips') {
      handleSend('What are 3 gentle ways I can nurture my energy today?');
    } else if (action === 'log_hydration') {
      handleSend('I just had 500ml of warm electrolyte tea.');
    }
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputValue('How does progesterone affect my afternoon focus?');
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1200px] w-full mx-auto px-gutter md:px-margin-desktop py-space-md flex flex-col gap-space-lg">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm pt-space-xs">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-widest">
              <span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span>
              <span>Companion Sanctuary</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Lunara AI</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              Your personal wellness companion — thoughtful, supportive, and grounded in your logged patterns.
            </p>
          </div>

          {/* Quick Action / Status indicator */}
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm self-start md:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="font-label-md text-label-md text-on-surface font-medium">
              Synthesizing 3 Previous Cycles
            </span>
          </div>
        </header>

        {/* Context Indicators Sticky Ribbon */}
        <section className="sticky top-16 z-20 -mx-gutter md:-mx-margin-desktop px-gutter md:px-margin-desktop py-space-xs bg-surface/90 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-space-xs overflow-x-auto pb-space-2xs pt-space-2xs no-scrollbar">
            {/* Cycle Day Rose Badge */}
            <button
              onClick={() => onNavigate('my-cycle')}
              className="group shrink-0 flex items-center gap-space-xs bg-primary-fixed/60 hover:bg-primary-fixed text-on-primary-fixed px-space-sm py-1.5 rounded-full transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">timelapse</span>
              <span className="font-label-md text-label-md font-semibold">
                Cycle Day {USER_PROFILE.currentDay} · {USER_PROFILE.phase}
              </span>
              <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>

            {/* Energy Lavender Badge */}
            <div className="shrink-0 flex items-center gap-space-xs bg-secondary-fixed/50 text-on-secondary-fixed px-space-sm py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span>
              <span className="font-label-md text-label-md">
                Energy: <strong className="font-semibold">{currentMood.energy}/10</strong>
              </span>
            </div>

            {/* Symptoms Neutral Warm Badge */}
            <div className="shrink-0 flex items-center gap-space-xs bg-surface-container-high text-on-surface-variant px-space-sm py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[16px]">symptoms</span>
              <span className="font-label-md text-label-md">Fatigue, Mild Bloating</span>
            </div>

            {/* Sleep Metric Badge */}
            <div className="shrink-0 flex items-center gap-space-xs bg-surface-container-low text-on-surface px-space-sm py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">bedtime</span>
              <span className="font-label-md text-label-md">
                Sleep: <strong className="font-semibold">{USER_PROFILE.sleepHours}</strong>
              </span>
            </div>

            <div className="h-4 w-px bg-outline-variant/30 shrink-0 mx-1 hidden sm:block" />

            {/* Privacy & Disclaimer Badge */}
            <div className="shrink-0 flex items-center gap-1.5 bg-surface-container-lowest/80 text-on-surface-variant px-space-sm py-1.5 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[15px] text-tertiary">shield</span>
              <span className="font-label-sm text-label-sm tracking-normal">
                Private &amp; Encrypted · Informational only, not medical diagnosis
              </span>
            </div>
          </div>
        </section>

        {/* Main Workspace: Bento Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Primary Chat Stream (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Conversation Container */}
            <div
              className="flex flex-col gap-space-md bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm relative overflow-hidden min-h-[460px]"
              id="conversationStream"
            >
              {/* Editorial Ambient Gradient Elements */}
              <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />

              {/* Date Marker */}
              <div className="flex items-center justify-center my-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest bg-surface-container px-space-sm py-1 rounded-full">
                  Today · October 14
                </span>
              </div>

              {/* Messages Map */}
              {messages.map((msg) => {
                const isLunara = msg.sender === 'lunara';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-space-sm items-start max-w-2xl ${
                      isLunara ? 'group' : 'ml-auto flex-row-reverse group'
                    }`}
                  >
                    {isLunara ? (
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      </div>
                    ) : (
                      <img
                        className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm mt-0.5"
                        alt="Elena avatar"
                        src={USER_PROFILE.chatAvatar}
                      />
                    )}

                    <div className={`flex flex-col gap-1.5 ${isLunara ? 'w-full' : 'items-end'}`}>
                      <div className="flex items-center gap-space-xs">
                        <span className={`font-label-md text-label-md font-semibold ${isLunara ? 'text-primary' : 'text-on-surface'}`}>
                          {isLunara ? 'Lunara' : USER_PROFILE.preferredName}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {msg.time}
                        </span>
                      </div>

                      <div
                        className={`rounded-2xl p-space-md shadow-sm leading-relaxed font-body-md text-body-md ${
                          isLunara
                            ? 'bg-surface-container-low text-on-surface rounded-tl-sm flex flex-col gap-space-sm'
                            : 'bg-primary text-on-primary rounded-tr-sm'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Optional Insight Callout */}
                        {msg.insightCallout && (
                          <div className="bg-surface-container-lowest/90 p-space-sm rounded-xl shadow-sm flex items-start gap-space-xs">
                            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                              insights
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-label-md text-label-md font-bold text-on-surface">
                                {msg.insightCallout.title}
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                {msg.insightCallout.description}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Optional Sparkline Data */}
                        {msg.sparklineData && (
                          <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col gap-space-xs">
                            <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                              <span className="font-medium">Stress Score vs. Headache Occurrence</span>
                              <span className="text-primary font-semibold">{msg.sparklineData.matchRate}</span>
                            </div>
                            <div className="w-full h-12 flex items-end">
                              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 280 40">
                                <path
                                  className="text-secondary"
                                  d="M 0,32 Q 40,30 70,14 T 140,28 T 210,8 T 280,24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeWidth="2.5"
                                />
                                <circle className="fill-primary" cx="70" cy="14" r="3.5" />
                                <circle className="fill-primary" cx="210" cy="8" r="3.5" />
                              </svg>
                            </div>
                            <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm">
                              <span>Follicular</span>
                              <span>Ovulatory (Peak Risk)</span>
                              <span>Luteal (Present)</span>
                            </div>
                          </div>
                        )}

                        {/* Optional Action Chips */}
                        {msg.actionChips && (
                          <div className="flex flex-wrap gap-space-xs pt-space-2xs">
                            {msg.actionChips.map((chip, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleChipClick(chip.action)}
                                className="group flex items-center gap-1.5 bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary px-space-sm py-1.5 rounded-full font-label-md text-label-md shadow-sm transition-all cursor-pointer"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[16px]">{chip.icon}</span>
                                <span>{chip.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex gap-space-sm items-start max-w-2xl group animate-in fade-in duration-200">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <div className="bg-surface-container-low text-on-surface rounded-2xl rounded-tl-sm p-space-md shadow-sm leading-relaxed font-body-md text-body-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] animate-spin text-primary">sync</span>
                    <span className="text-on-surface-variant font-body-sm text-body-sm">
                      Synthesizing chronobiological logs...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Suggested Prompts Bar */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between px-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Suggested Questions
                </span>
                <span
                  onClick={() => handleSend('Tell me how my cycle influences my mood.')}
                  className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline"
                >
                  Custom insights
                </span>
              </div>
              <div className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.text)}
                    className="shrink-0 bg-surface-container-low hover:bg-surface-container text-on-surface px-space-sm py-2 rounded-full font-label-md text-label-md shadow-sm transition-all flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
                    type="button"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${prompt.color}`}>
                      {prompt.icon}
                    </span>
                    <span>{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Chat Input Deck */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-sm shadow-md flex flex-col gap-space-xs sticky bottom-4 z-30 border border-surface-container-high/60">
              <form
                className="flex items-center gap-space-xs"
                id="chatForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <button
                  aria-label="Attach notes or health record"
                  onClick={() => onOpenLogSymptoms()}
                  className="p-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                  type="button"
                  title="Attach symptom or biomarker"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                </button>

                <input
                  className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-space-md py-3 rounded-full focus:bg-surface-container-lowest focus:outline-none transition-all placeholder:text-on-surface-variant/70 shadow-inner"
                  id="chatInput"
                  placeholder="Ask Lunara anything about your cycle, symptoms, or wellbeing..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <button
                  aria-label="Voice Input"
                  onClick={toggleMic}
                  className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                    isListening
                      ? 'bg-primary text-on-primary animate-pulse'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`}
                  type="button"
                  title={isListening ? 'Listening...' : 'Voice Input'}
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>

                <button
                  aria-label="Send Message"
                  className="h-11 w-11 shrink-0 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  type="submit"
                  disabled={!inputValue.trim() && !isTyping}
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                </button>
              </form>

              {/* Microcopy disclaimer */}
              <div className="flex items-center justify-center gap-1 px-space-xs text-center">
                <span className="material-symbols-outlined text-[13px] text-on-surface-variant">lock</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Lunara provides wellness insights based on your logged patterns. Always consult a healthcare professional for medical concerns.
                </span>
              </div>
            </div>
          </main>

          {/* Contextual Intelligence Sidebar (4 cols on desktop) */}
          <aside className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Today's Biological Synthesis Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Biometric Context
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Live Synced</span>
              </div>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-on-surface">Luteal</span>
                <span className="font-body-md text-body-md text-on-surface-variant">· Phase III</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Hormonal baseline shows rising progesterone while estrogen undergoes a secondary minor peak. Basal temperature typically elevates by 0.3°C.
              </p>

              {/* Hormonal Progression Arc SVG */}
              <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center justify-between mt-space-2xs">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Progesterone Status</span>
                  <span className="font-headline-sm text-headline-sm text-secondary">Peak Phase</span>
                </div>
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-high"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-secondary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-label-sm text-label-sm font-bold text-on-surface">75%</span>
                </div>
              </div>
            </div>

            {/* Editorial Care Sanctuary Card with Visual Asset */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Ceramic herbal teapot still life"
                  src={IMAGES.chamomileTeapot}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex items-end p-space-md">
                  <span className="font-label-md text-label-md text-inverse-on-surface font-semibold">
                    Recommended Afternoon Ritual
                  </span>
                </div>
              </div>
              <div className="p-space-md flex flex-col gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Warm Chamomile &amp; Oat Milk</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  To support sluggish digestion and soothe late-day nervous system tension without caffeine disruption.
                </p>
                <button
                  onClick={() => setNutritionModalOpen(true)}
                  className="mt-space-2xs text-left font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span>Review full luteal nutrition guide</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Memory & Learned Patterns Widget */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-tertiary">memory</span>
                <span className="font-label-md text-label-md font-bold">Learned by Lunara</span>
              </div>
              <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-space-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Sleep under 6.5h causes a 40% jump in sugar cravings during Luteal days 16–22.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Headache onset drops noticeably when evening screen time halts by 10:00 PM.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                  <span>Gentle yin yoga on Day 19 mitigates lower back tightness better than total inactivity.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Luteal Nutrition Guide Modal */}
      {nutritionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container-high">
            <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">restaurant</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Luteal Phase Nutrition Protocol</h3>
              </div>
              <button
                onClick={() => setNutritionModalOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant">
              <p>
                During the luteal phase (Days 17–28), elevated progesterone increases basal metabolic energy burn by 100–300 kcal/day while insulin sensitivity temporarily decreases.
              </p>
              <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-2 text-on-surface">
                <div className="font-semibold text-primary">Key Botanical &amp; Dietary Alignments:</div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Complex Carbohydrates:</strong> Sweet potatoes, oats, brown rice stabilize serotonin without blood glucose spikes.</li>
                  <li><strong>Magnesium &amp; Vitamin B6:</strong> Pumpkin seeds, spinach, dark cacao reduce water retention and cramps.</li>
                  <li><strong>Calming Adaptogens:</strong> Chamomile, oat straw, and ashwagandha ease late-day nervous agitation.</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setNutritionModalOpen(false)}
              className="mt-2 w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
