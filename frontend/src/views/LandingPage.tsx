import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { NavPath } from '../types';
import { IMAGES } from '../data/mockData';
import './LandingPage.css';

interface LandingPageProps {
  onNavigate: (path: NavPath) => void;
}

const features = [
  {
    id: 'cycle',
    name: 'Cycle',
    eyebrow: 'Know your rhythm',
    title: 'Your cycle, in context.',
    description: 'Keep period dates and cycle notes together, so it is easier to see where you are and what may be coming next.',
  },
  {
    id: 'mood',
    name: 'Mood',
    eyebrow: 'Check in with yourself',
    title: 'Make space for how you feel.',
    description: 'Record your mood, energy, stress, and notes in a check-in that leaves room for more than one feeling.',
  },
  {
    id: 'symptoms',
    name: 'Symptoms',
    eyebrow: 'Notice what your body says',
    title: 'Keep the details that matter.',
    description: 'Log bodily cues with a category and intensity, then look back at your own notes over time.',
  },
  {
    id: 'insights',
    name: 'Insights',
    eyebrow: 'See the bigger picture',
    title: 'Your notes, brought together.',
    description: 'Review cycle and symptom patterns as your journal grows. Your history remains the starting point.',
  },
  {
    id: 'lunara-ai',
    name: 'Lunara AI',
    eyebrow: 'A companion for questions',
    title: 'Talk it through, gently.',
    description: 'Ask questions about your cycle and wellbeing, with responses designed to support reflection rather than diagnosis.',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page" id="top">
      <header className="landing-nav">
        <div className="landing-nav__inner">
          <a className="landing-brand" href="#top" aria-label="Lunara home" onClick={closeMenu}>
            <img src={IMAGES.emblem} alt="" />
            <span>Lunara</span>
          </a>

          <nav className={`landing-links${menuOpen ? ' landing-links--open' : ''}`} aria-label="Main navigation">
            <a href="#rhythm" onClick={closeMenu}>The rhythm</a>
            <a href="#features" onClick={closeMenu}>Features</a>
            <a href="#your-space" onClick={closeMenu}>Your space</a>
          </nav>

          <div className="landing-nav__actions">
            <button className="landing-login" onClick={() => onNavigate('login')}>Log in</button>
            <button className="landing-signup" onClick={() => onNavigate('signup')}>Sign up</button>
            <button
              className="landing-menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <img className="landing-hero__image" src={IMAGES.landingHero} alt="Sunlit tea and botanicals in a quiet morning space" />
          <div className="landing-hero__shade" />
          <div className="landing-hero__content">
            <p className="landing-eyebrow landing-eyebrow--light">A cycle journal, on your terms</p>
            <h1 id="landing-title">Every cycle<br />has a rhythm.</h1>
            <p className="landing-hero__copy"><em>Understand yours.</em></p>
            <p className="landing-hero__description">Lunara helps you track your cycle, mood, and symptoms, then notice patterns that are uniquely yours.</p>
            <div className="landing-hero__actions">
              <button className="landing-button landing-button--light" onClick={() => onNavigate('signup')}>
                Get started <span aria-hidden="true">↗</span>
              </button>
              <a className="landing-text-link" href="#rhythm">Explore the rhythm <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="landing-hero__note">
            <span className="landing-hero__note-mark" />
            <span>Notice without judgment.</span>
          </div>
          <a className="landing-scroll-cue" href="#rhythm" aria-label="Scroll to explore">
            <span>Scroll to explore</span><span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="landing-intro" id="rhythm">
          <div className="landing-intro__head landing-reveal" data-reveal>
            <p className="landing-eyebrow">A little more than dates</p>
            <h2>Your cycle is more<br />than a date.</h2>
          </div>
          <div className="landing-pillars landing-reveal" data-reveal>
            <article className="landing-pillar">
              <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
              <h3>Cycle</h3>
              <p>Know where you are and what may be coming next.</p>
            </article>
            <article className="landing-pillar">
              <span className="material-symbols-outlined" aria-hidden="true">mood</span>
              <h3>Mood</h3>
              <p>Track how you feel throughout your cycle.</p>
            </article>
            <article className="landing-pillar">
              <span className="material-symbols-outlined" aria-hidden="true">vital_signs</span>
              <h3>Symptoms</h3>
              <p>Notice what your body is telling you.</p>
            </article>
          </div>
          <p className="landing-intro__closing">Lunara brings them together to help you see the bigger picture.</p>
        </section>

        <section className="landing-showcase" id="features" aria-labelledby="landing-showcase-title">
          <div className="landing-showcase__heading landing-reveal" data-reveal>
            <div>
              <p className="landing-eyebrow">A closer look</p>
              <h2 id="landing-showcase-title">From tracking<br />to understanding.</h2>
            </div>
            <p>Explore the parts of Lunara designed to help you notice, record, and reflect.</p>
          </div>

          <div className="landing-carousel landing-reveal" data-reveal>
            <div className="landing-carousel__preview" aria-label={`${features[activeFeature].name} preview`}>
              <div className="landing-preview-window">
                <div className="landing-preview-window__top"><span /><span /><span /><small>LUNARA / {features[activeFeature].name.toUpperCase()}</small></div>
                <div className={`landing-preview landing-preview--${features[activeFeature].id}`} key={features[activeFeature].id}>
                  {activeFeature === 0 && (
                    <>
                      <div className="preview-overline">YOUR CYCLE</div>
                      <div className="preview-cycle-heading"><strong>Day 18</strong><span>● Luteal phase</span></div>
                      <div className="preview-cycle-track"><i /><i /><i /><i /></div>
                      <div className="preview-cycle-dates"><span>Period</span><span>Follicular</span><span>Ovulatory</span><span>Luteal</span></div>
                      <div className="preview-cycle-note"><span>Next period estimate</span><strong>About 9 days</strong></div>
                    </>
                  )}
                  {activeFeature === 1 && (
                    <>
                      <div className="preview-overline">TODAY'S CHECK-IN</div>
                      <h3 className="preview-title">How are you feeling?</h3>
                      <div className="preview-moods"><span>Calm</span><span className="is-selected">Okay</span><span>Tender</span><span>Restless</span></div>
                      <div className="preview-range"><span>Energy</span><strong>6 / 10</strong><i><b style={{ width: '60%' }} /></i></div>
                      <div className="preview-range"><span>Stress</span><strong>3 / 10</strong><i><b style={{ width: '30%' }} /></i></div>
                    </>
                  )}
                  {activeFeature === 2 && (
                    <>
                      <div className="preview-overline">SYMPTOM JOURNAL</div>
                      <h3 className="preview-title">Today’s notes</h3>
                      <div className="preview-symptom"><span className="preview-symptom__dot preview-symptom__dot--rose" /><div><strong>Fatigue</strong><small>Physical · Mild</small></div><b>4/10</b></div>
                      <div className="preview-symptom"><span className="preview-symptom__dot preview-symptom__dot--green" /><div><strong>Bloating</strong><small>Digestive · Moderate</small></div><b>6/10</b></div>
                      <div className="preview-symptom"><span className="preview-symptom__dot preview-symptom__dot--gold" /><div><strong>Headache</strong><small>Physical · Mild</small></div><b>3/10</b></div>
                    </>
                  )}
                  {activeFeature === 3 && (
                    <>
                      <div className="preview-overline">YOUR JOURNAL, OVER TIME</div>
                      <h3 className="preview-title">Notice your patterns.</h3>
                      <div className="preview-chart" aria-hidden="true"><span style={{ height: '32%' }} /><span style={{ height: '45%' }} /><span style={{ height: '38%' }} /><span style={{ height: '66%' }} /><span style={{ height: '54%' }} /><span style={{ height: '78%' }} /><span style={{ height: '59%' }} /><span style={{ height: '88%' }} /></div>
                      <div className="preview-chart-caption"><span>Energy notes</span><span>Sample view</span></div>
                      <p className="preview-insight">Insights become more useful as you add your own check-ins.</p>
                    </>
                  )}
                  {activeFeature === 4 && (
                    <>
                      <div className="preview-overline">A CONVERSATION WITH LUNARA</div>
                      <div className="preview-chat preview-chat--user">Why have I been feeling tired lately?</div>
                      <div className="preview-chat preview-chat--assistant"><span>LUNARA</span>You’ve noted fatigue during this phase in a few recent cycles. Want to look at those entries together?</div>
                      <div className="preview-chat-input">Ask about your cycle or wellbeing <span>↑</span></div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="landing-carousel__details" aria-live="polite">
              <div className="landing-carousel__counter"><span>0{activeFeature + 1}</span><i />0{features.length}</div>
              <p className="landing-eyebrow">{features[activeFeature].eyebrow}</p>
              <h3>{features[activeFeature].title}</h3>
              <p className="landing-carousel__description">{features[activeFeature].description}</p>
              <div className="landing-carousel__tabs" role="tablist" aria-label="Lunara features">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    type="button"
                    role="tab"
                    aria-selected={activeFeature === index}
                    aria-label={`Show ${feature.name} feature`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <span>{feature.name}</span>
                  </button>
                ))}
              </div>
              <div className="landing-carousel__arrows">
                <button type="button" aria-label="Previous feature" onClick={() => setActiveFeature((activeFeature + features.length - 1) % features.length)}><ArrowLeft size={18} /></button>
                <button type="button" aria-label="Next feature" onClick={() => setActiveFeature((activeFeature + 1) % features.length)}><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-closing" id="your-space">
          <p className="landing-eyebrow landing-reveal" data-reveal>A gentle place to begin</p>
          <h2 className="landing-reveal" data-reveal>Understand your cycle.<br /><em>Understand yourself.</em></h2>
          <p className="landing-closing__copy landing-reveal" data-reveal>Start tracking your journey with Lunara.</p>
          <div className="landing-closing__actions landing-reveal" data-reveal>
            <button className="landing-button landing-button--dark" onClick={() => onNavigate('signup')}>Create your account <span aria-hidden="true">↗</span></button>
            <button className="landing-closing__login" onClick={() => onNavigate('login')}>Already have an account? Log in</button>
          </div>
          <span className="landing-closing__moon" aria-hidden="true">◔</span>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="landing-brand landing-brand--footer" href="#top"><img src={IMAGES.emblem} alt="" /><span>Lunara</span></a>
        <p>Cycle care with room for real life.</p>
        <nav aria-label="Footer navigation"><a href="#rhythm">The rhythm</a><a href="#features">Features</a><button onClick={() => onNavigate('login')}>Log in</button></nav>
        <span className="landing-footer__copyright">© 2026 Lunara</span>
      </footer>
    </div>
  );
};