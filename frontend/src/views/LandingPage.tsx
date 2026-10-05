import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavPath } from '../types';
import { IMAGES } from '../data/mockData';
import './LandingPage.css';

interface LandingPageProps {
  onNavigate: (path: NavPath) => void;
}

const AUTOPLAY_MS = 6500;

const features = [
  { id: 'cycle', name: 'Cycle', eyebrow: 'Know your rhythm', title: 'Your cycle, in context.', description: 'Keep period dates and cycle notes together, so it is easier to see where you are and what may be coming next.' },
  { id: 'mood', name: 'Mood', eyebrow: 'Check in with yourself', title: 'Make space for how you feel.', description: 'Record mood, energy, stress, and notes in a check-in that leaves room for more than one feeling.' },
  { id: 'symptoms', name: 'Symptoms', eyebrow: 'Notice what your body says', title: 'Keep the details that matter.', description: 'Log bodily cues with a category and intensity, then look back at your own notes over time.' },
  { id: 'insights', name: 'Insights', eyebrow: 'See the bigger picture', title: 'Your notes, brought together.', description: 'Review cycle and symptom patterns as your journal grows. Your history stays the starting point.' },
  { id: 'lunara-ai', name: 'Lunara AI', eyebrow: 'A companion for questions', title: 'Talk it through, gently.', description: 'Ask about your cycle and wellbeing. Replies support reflection, never diagnosis.' },
];

const Preview: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'cycle':
      return (
        <>
          <p className="pv-label">Your cycle</p>
          <div className="pv-ring" role="img" aria-label="Day 18 of cycle, luteal phase">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className="pv-ring__bg" />
              <circle cx="60" cy="60" r="52" className="pv-ring__fg" />
            </svg>
            <div><strong>18</strong><span>Day</span></div>
          </div>
          <div className="pv-phases"><span>Period</span><span>Follicular</span><span>Ovulatory</span><span className="is-on">Luteal</span></div>
          <div className="pv-row"><span>Next period</span><strong>About 9 days</strong></div>
        </>
      );
    case 'mood':
      return (
        <>
          <p className="pv-label">Today’s check-in</p>
          <h4 className="pv-title">How are you feeling?</h4>
          <div className="pv-chips"><span>Calm</span><span className="is-on">Okay</span><span>Tender</span><span>Restless</span></div>
          {[['Energy', 60], ['Stress', 30]].map(([l, v]) => (
            <div className="pv-meter" key={l}><div><span>{l}</span><strong>{Number(v) / 10} / 10</strong></div><i><b style={{ width: `${v}%` }} /></i></div>
          ))}
        </>
      );
    case 'symptoms':
      return (
        <>
          <p className="pv-label">Symptom journal</p>
          <h4 className="pv-title">Today’s notes</h4>
          {[['Fatigue', 'Physical · Mild', 4, 'rose'], ['Bloating', 'Digestive · Moderate', 6, 'green'], ['Headache', 'Physical · Mild', 3, 'purple']].map(([n, c, s, t]) => (
            <div className="pv-symptom" key={n}><span className={`pv-dot pv-dot--${t}`} /><div><strong>{n}</strong><small>{c}</small></div><b>{s}/10</b></div>
          ))}
        </>
      );
    case 'insights':
      return (
        <>
          <p className="pv-label">Your journal, over time</p>
          <h4 className="pv-title">Notice your patterns.</h4>
          <div className="pv-chart" aria-hidden="true">
            {[32, 45, 38, 66, 54, 78, 59, 88].map((h, i) => <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />)}
          </div>
          <div className="pv-row"><span>Energy notes</span><em>Sample view</em></div>
          <p className="pv-note">Insights grow more useful with every check-in you add.</p>
        </>
      );
    default:
      return (
        <>
          <p className="pv-label">A conversation with Lunara</p>
          <div className="pv-chat pv-chat--user">Why have I been feeling tired lately?</div>
          <div className="pv-chat pv-chat--ai">You’ve noted fatigue in this phase across a few recent cycles. Want to look at those entries together?</div>
          <div className="pv-input">Ask about your cycle or wellbeing <span>↑</span></div>
        </>
      );
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduced = useRef(false);

  const go = useCallback((i: number, d?: 'next' | 'prev') => {
    const n = (i + features.length) % features.length;
    setDir(d ?? (n >= active ? 'next' : 'prev'));
    setActive(n);
  }, [active]);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced.current) setPlaying(false);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { (e.target as HTMLElement).dataset.revealed = 'true'; io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el));
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1, 'next'); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1, 'prev'); }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 44) go(active + (dx < 0 ? 1 : -1), dx < 0 ? 'next' : 'prev');
  };

  const f = features[active];
  const running = playing && !hovering;
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="lp" id="top">
      <header className={`lp-nav${scrolled ? ' lp-nav--solid' : ''}`}>
        <div className="lp-nav__inner">
          <a className="lp-brand" href="#top" aria-label="Lunara home" onClick={closeMenu}>
            <img src={IMAGES.emblem} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><span>Lunara</span>
          </a>
          <nav className={`lp-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <a href="#rhythm" onClick={closeMenu}>The rhythm</a>
            <a href="#features" onClick={closeMenu}>Features</a>
          </nav>
          <div className="lp-nav__actions">
            <button className="lp-login" onClick={() => onNavigate('login')}>Log in</button>
            <button className="lp-btn lp-btn--sm" onClick={() => onNavigate('signup')}>Sign up</button>
            <button className="lp-burger" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main>
        <section className="lp-hero" aria-labelledby="lp-title">
          <div className="lp-hero__text">
            <p className="lp-kicker">A cycle journal, on your terms</p>
            <h1 id="lp-title">Every cycle has a rhythm. <em>Learn yours.</em></h1>
            <p className="lp-lede">Track your cycle, mood, and symptoms in one calm place, then notice the patterns that are uniquely yours.</p>
            <div className="lp-actions">
              <button className="lp-btn" onClick={() => onNavigate('signup')}>Start your journal</button>
              <a className="lp-link" href="#features">See how it works</a>
            </div>
            <p className="lp-fine">Free to start. Notice without judgment.</p>
          </div>

          <div className="lp-hero__art">
            <div className="lp-arch">
              <img src={IMAGES.landingHero} alt="Sunlit tea and botanicals in a quiet morning space" />
            </div>
            <div className="lp-float lp-float--phase" aria-hidden="true">
              <span className="lp-float__dot" /><div><small>Today</small><strong>Day 18 · Luteal</strong></div>
            </div>
            <div className="lp-float lp-float--mood" aria-hidden="true">
              <small>Check-in</small>
              <div><span>Calm</span><span className="is-on">Okay</span><span>Tender</span></div>
            </div>
          </div>
        </section>

        <section className="lp-intro" id="rhythm">
          <div className="lp-intro__head" data-reveal>
            <h2>Your cycle is more than a date.</h2>
            <p>Dates tell you when. Lunara helps you notice how, so each month makes a little more sense than the last.</p>
          </div>
          <div className="lp-pillars" data-reveal>
            {[['calendar_month', 'Cycle', 'Know where you are and what may be coming next.'], ['mood', 'Mood', 'Track how you feel throughout your cycle.'], ['vital_signs', 'Symptoms', 'Notice what your body is telling you.']].map(([icon, t, d]) => (
              <article className="lp-pillar" key={t}>
                <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                <h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-showcase" id="features" aria-labelledby="lp-showcase-title">
          <div className="lp-showcase__head" data-reveal>
            <h2 id="lp-showcase-title">From tracking to understanding.</h2>
            <p>Five parts of Lunara, designed to help you notice, record, and reflect.</p>
          </div>

          <div
            className="lp-carousel"
            data-reveal
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
            onKeyDown={onKey}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="Lunara features"
          >

            <div className="lp-stage" id="lp-stage" role="tabpanel" aria-labelledby={`tab-${f.id}`}>
              <div className="lp-device">
                <div className="lp-device__bar"><span /><span /><span /><small>Lunara · {f.name}</small></div>
                <div className={`lp-preview lp-preview--${dir}`} key={f.id}><Preview id={f.id} /></div>
              </div>
            </div>

            <div className="lp-copy" aria-live={playing ? 'off' : 'polite'}>
              <div className="lp-copy__body" key={f.id}>
                <p className="lp-kicker">{f.eyebrow}</p>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            <div className="lp-tabs" role="tablist" aria-label="Choose a feature">
              {features.map((ft, i) => (
                <button
                  key={ft.id}
                  type="button"
                  role="tab"
                  id={`tab-${ft.id}`}
                  aria-selected={active === i}
                  aria-controls="lp-stage"
                  tabIndex={active === i ? 0 : -1}
                  className={active === i ? 'is-active' : ''}
                  onClick={() => go(i)}
                >
                  <span>{ft.name}</span>
                  <i aria-hidden="true">
                    {active === i && (
                      <b
                        key={`${i}-${playing}`}
                        className={running ? 'is-running' : 'is-paused'}
                        style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                        onAnimationEnd={() => playing && go(active + 1, 'next')}
                      />
                    )}
                  </i>
                </button>
              ))}
            </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};