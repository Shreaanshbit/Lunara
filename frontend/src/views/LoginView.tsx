import React, { useState } from 'react';
import { NavPath } from '../types';
import { IMAGES } from '../data/mockData';

interface LoginViewProps {
  onNavigate: (path: NavPath) => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('elena.rostova@sanctuary.internal');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authStatus, setAuthStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthStatus('verifying');

    setTimeout(() => {
      setAuthStatus('success');
      setTimeout(() => {
        onLoginSuccess(email);
        onNavigate('dashboard');
      }, 700);
    }, 900);
  };

  const handlePasskeyAuth = () => {
    setEmail('elena.rostova@sanctuary.internal');
    handleLogin();
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,41,38,0.04)] border-b border-surface-container-high/40">
        <div className="h-16 max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
            >
              <img
                alt="Lunara Logo"
                className="h-8 w-auto object-contain"
                src={IMAGES.emblem}
              />
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight ml-space-2xs">
                Lunara
              </span>
            </button>
            <span className="hidden sm:inline-block w-px h-4 bg-outline-variant/40 mx-space-2xs" />
            <button
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:inline-flex items-center gap-space-2xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">west</span>
              <span>Back to Sanctuary</span>
            </button>
          </div>

          <nav className="flex items-center gap-space-md">
            <button
              onClick={() => onNavigate('landing')}
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors hidden md:inline-block cursor-pointer"
            >
              Privacy &amp; Encryption
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors hidden sm:inline-block cursor-pointer"
            >
              Support
            </button>
            <div className="flex items-center gap-space-xs px-space-xs py-space-2xs rounded-full bg-surface-container-low text-tertiary">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-sm text-label-sm tracking-normal uppercase">End-to-End Encrypted</span>
            </div>
            <button
              onClick={() => onNavigate('signup')}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-xs"
              title="Create Account"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-16 flex-grow flex items-center justify-center px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="flex flex-col w-full">
          <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-space-xl my-space-lg">
            {/* Ambient Glows */}
            <div className="absolute -top-12 -left-10 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-16 right-0 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10" />

            {/* Main Authentication Sanctuary Card (7 of 12) */}
            <div className="w-full lg:w-7/12 bg-surface-container-lowest rounded-xl shadow-[0_12px_36px_-4px_rgba(45,41,38,0.06),0_2px_8px_rgba(45,41,38,0.03)] p-space-lg md:p-space-2xl flex flex-col justify-between relative overflow-hidden border border-surface-container">
              <div>
                {/* Top Status & Emblem */}
                <div className="flex items-center justify-between mb-space-lg">
                  <div className="flex items-center gap-space-xs">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center p-space-2xs shadow-sm">
                      <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.25" strokeWidth="2" />
                        <path d="M50 14C30.1177 14 14 30.1177 14 50C14 69.8823 30.1177 86 50 86C40 76 34 64 34 50C34 36 40 24 50 14Z" fill="url(#lunaraLoginGrad)" />
                        <circle cx="58" cy="50" fill="#8e4647" r="4.5" />
                        <circle cx="68" cy="38" fill="#675491" r="2.5" />
                        <defs>
                          <linearGradient id="lunaraLoginGrad" x1="14" x2="50" y1="14" y2="86" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#8e4647" />
                            <stop offset="1" stopColor="#675491" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Lunara</span>
                  </div>

                  <div className="inline-flex items-center gap-space-2xs bg-surface-container px-space-xs py-space-2xs rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Vault Online
                    </span>
                  </div>
                </div>

                {/* Typography Heading Block */}
                <div className="mb-space-xl">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-2xs tracking-tight">
                    Welcome back to your sanctuary
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Sign in to access your cycle rhythms, somatic logs, and private AI companion.
                  </p>
                </div>

                {/* Sign-In Form */}
                <form className="space-y-space-md" onSubmit={handleLogin}>
                  {/* Email Field */}
                  <div className="space-y-space-2xs">
                    <label className="block font-label-md text-label-md text-on-surface" htmlFor="sanctuaryEmail">
                      Account Email
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">
                        alternate_email
                      </span>
                      <input
                        autoComplete="email"
                        className="w-full pl-11 pr-space-md py-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md transition-all duration-200 outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8e4647]"
                        id="sanctuaryEmail"
                        name="email"
                        placeholder="name@example.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-space-2xs">
                    <label className="block font-label-md text-label-md text-on-surface" htmlFor="sanctuaryPassword">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">
                        key
                      </span>
                      <input
                        autoComplete="current-password"
                        className="w-full pl-11 pr-11 py-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md transition-all duration-200 outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#8e4647]"
                        id="sanctuaryPassword"
                        name="password"
                        placeholder="••••••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        aria-label="Toggle password visibility"
                        className="absolute right-space-sm text-on-surface-variant hover:text-on-surface transition-colors p-space-2xs flex items-center justify-center rounded cursor-pointer"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Meta & Persistence Row */}
                  <div className="flex items-center justify-between pt-space-2xs">
                    <label className="flex items-center gap-space-xs cursor-pointer select-none">
                      <input
                        className="w-4 h-4 rounded text-primary focus:ring-0 focus:ring-offset-0 bg-surface-container-highest cursor-pointer accent-primary"
                        id="rememberDevice"
                        name="rememberDevice"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Remember for 30 days</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your encrypted device email.')}
                      className="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-4 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Primary Submit Action */}
                  <div className="pt-space-xs">
                    <button
                      className={`w-full py-3.5 px-space-lg rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                        authStatus === 'success'
                          ? 'bg-tertiary text-on-tertiary'
                          : 'bg-primary hover:bg-primary-container text-on-primary'
                      }`}
                      type="submit"
                      disabled={authStatus !== 'idle'}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${authStatus === 'verifying' ? 'animate-spin' : ''}`}>
                        {authStatus === 'verifying' ? 'sync' : authStatus === 'success' ? 'check' : 'lock'}
                      </span>
                      <span>
                        {authStatus === 'verifying'
                          ? 'Verifying Vault Key...'
                          : authStatus === 'success'
                          ? 'Welcome Home'
                          : 'Sign In to Lunara'}
                      </span>
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="relative my-space-lg flex items-center justify-center">
                  <div className="w-full h-px bg-surface-container-highest" />
                  <span className="absolute bg-surface-container-lowest px-space-sm font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                    or continue with secure biometric
                  </span>
                </div>

                {/* Biometric / Passkey Pass */}
                <button
                  className="w-full py-3 px-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-space-sm shadow-sm transition-all duration-150 group cursor-pointer"
                  onClick={handlePasskeyAuth}
                  type="button"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px] group-hover:scale-110 transition-transform">
                    fingerprint
                  </span>
                  <span>Sign in with Passkey / Face ID</span>
                </button>
              </div>

              {/* Footer Micro-Trust Indicators */}
              <div className="mt-space-xl pt-space-md border-t-0 bg-surface-container-low/60 -mx-space-lg md:-mx-space-2xl -mb-space-lg md:-mb-space-2xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-xs text-center sm:text-left">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">encrypted</span>
                  <span>Zero-knowledge client vault • HIPAA Aligned</span>
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  New here?{' '}
                  <button
                    onClick={() => onNavigate('signup')}
                    className="text-primary font-label-md text-label-md hover:underline font-semibold ml-space-2xs cursor-pointer"
                  >
                    Create sanctuary account
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Rhythm & Intimate Sanctuary Companion Panel (5 of 12) */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between gap-space-md">
              {/* Upper Context Card: Daily Somatic Phase */}
              <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary">
                      Biological Rhythm
                    </span>
                    <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                      Luteal Phase • Day 22
                    </span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                    Quiet restoration &amp; reflective presence.
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    “Progesterone invites our awareness inward. Your sanctuary is configured to filter out sensory overload and keep your reflections undisturbed.”
                  </p>
                </div>
                <div className="mt-space-lg pt-space-sm flex items-center gap-space-md">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px]">spa</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-secondary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px]">bedtime</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px]">water_drop</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Restorative telemetry active
                  </span>
                </div>
              </div>

              {/* Lower Mood & Ceramic Artistry Snapshot */}
              <div className="bg-surface-container-highest rounded-xl p-space-lg relative overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="flex items-center gap-space-xs text-primary mb-space-xs">
                    <span className="material-symbols-outlined text-[20px]">shield_person</span>
                    <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                      Lunara Privacy Pledge
                    </span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface leading-snug mb-space-2xs">
                    Your biological truth, kept strictly yours.
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    We operate with mathematical encryption keys that exist solely on your authenticated device. Not even Lunara engineers can view your cycle logs or somatic journal.
                  </p>
                </div>

                {/* Gentle Visual Metric Ring */}
                <div className="mt-space-md flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur rounded-lg p-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[22px]">check_circle</span>
                    <div>
                      <div className="font-label-md text-label-md text-on-surface font-bold">Hardware Key Ready</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                        WebAuthn / FIDO2 Certified
                      </div>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm font-semibold text-tertiary font-mono">256-bit AES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low/70 py-space-lg border-t border-surface-container">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-tertiary text-[18px]">verified_user</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              HIPAA Aligned &amp; Zero Third-Party Health Data Sharing
            </span>
          </div>
          <nav className="flex items-center gap-space-lg">
            <span className="font-label-md text-label-md text-on-surface-variant">Terms of Service</span>
            <span className="font-label-md text-label-md text-on-surface-variant">Health Privacy Notice</span>
            <span className="font-label-md text-label-md text-on-surface-variant">Contact Care Team</span>
          </nav>
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 Lunara Health Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
