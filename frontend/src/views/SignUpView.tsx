import React, { useState } from 'react';
import { NavPath } from '../types';
import { IMAGES } from '../data/mockData';

interface SignUpViewProps {
  onNavigate: (path: NavPath) => void;
  onSignUpSuccess: (name: string, email: string) => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  onNavigate,
  onSignUpSuccess,
}) => {
  const [preferredName, setPreferredName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [biometricKeyEnabled, setBiometricKeyEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12 && score >= 2) score++;
    return score;
  };

  const strengthScore = calculateStrength(password);
  const strengthLabels = ['Password strength', 'Weak key', 'Developing rhythm', 'Resilient shield', 'Unbreakable sanctuary cipher'];
  const strengthColors = ['bg-error', 'bg-surface-tint', 'bg-tertiary-container', 'bg-tertiary'];

  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch || !termsAccepted) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSignUpSuccess(preferredName || 'Elena', email || 'elena@example.com');
      onNavigate('dashboard');
    }, 1000);
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
                alt="Lunara Emblem"
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
              onClick={() => onNavigate('login')}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-xs"
              title="Sign In"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-16 flex-grow flex items-center justify-center px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="flex flex-col w-full max-w-6xl mx-auto py-space-md">
          <div className="relative w-full">
            <div className="absolute -top-16 left-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              {/* Left Column: Editorial Welcome & Testimonial */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-high w-fit">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Sanctuary Onboarding
                  </span>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
                    Create your private sanctuary
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Begin attuning to your biological seasons, somatic patterns, and personalized wellness intelligence.
                  </p>
                </div>

                {/* Testimonial Card */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                  <div className="flex items-center gap-space-xs text-secondary">
                    <span className="material-symbols-outlined text-[20px]">spa</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                      Restorative Literacy
                    </span>
                  </div>
                  <blockquote className="font-headline-sm text-headline-sm italic text-on-surface leading-snug">
                    “A sanctuary designed for unhurried self-knowledge. No ads, no algorithmic judgment.”
                  </blockquote>
                  <div className="flex items-center justify-between pt-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-md text-label-md text-on-surface">Dr. Aris Thorne</span>
                      <span className="text-outline-variant">•</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Endocrine &amp; Somatic Health</span>
                    </div>
                    <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                  </div>
                </div>

                {/* Editorial Image Vignette */}
                <div className="rounded-xl overflow-hidden shadow-sm relative group bg-surface-container">
                  <div
                    className="w-full h-44 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${IMAGES.onboardingVignette}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex flex-col justify-end p-space-md text-inverse-on-surface">
                    <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                      <span>Private by Design</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-surface-container-highest">
                      Your physiological data is cryptographically sealed to your device alone.
                    </p>
                  </div>
                </div>

                {/* Quiet Trust Badges */}
                <div className="flex flex-col gap-space-xs text-on-surface-variant pt-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                    <span className="font-body-sm text-body-sm">Zero data brokering or commercial telemetry</span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                    <span className="font-body-sm text-body-sm">AES-256 client-side encrypted hormonal log vault</span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                    <span className="font-body-sm text-body-sm">Export or purge your complete records at any moment</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Registration Card & Form */}
              <div className="lg:col-span-7">
                <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-md flex flex-col gap-space-lg border border-surface-container">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-primary uppercase tracking-wider">
                        Step 1 of 2
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Begin your cycle profile
                      </h2>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[24px]">nightlight</span>
                    </div>
                  </div>

                  <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                    {/* 1. Preferred Name */}
                    <div className="flex flex-col gap-space-2xs">
                      <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                        <span>How should Lunara address you?</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                          Preferred or chosen name
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">
                          sentiment_satisfied
                        </span>
                        <input
                          className="w-full pl-11 pr-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-[0_0_0_2px_#8e4647] transition-all"
                          placeholder="e.g. Elena"
                          required
                          type="text"
                          value={preferredName}
                          onChange={(e) => setPreferredName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 2. Email Address */}
                    <div className="flex flex-col gap-space-2xs">
                      <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                        <span>Email address</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                          For account recovery only
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">
                          alternate_email
                        </span>
                        <input
                          className="w-full pl-11 pr-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-[0_0_0_2px_#8e4647] transition-all"
                          placeholder="elena@example.com"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* 3. Password */}
                    <div className="flex flex-col gap-space-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md text-on-surface">Create password</label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-fixed-variant transition-colors cursor-pointer"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">
                          lock
                        </span>
                        <input
                          className="w-full pl-11 pr-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-[0_0_0_2px_#8e4647] transition-all"
                          placeholder="At least 8 characters with numbers &amp; symbols"
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {/* Password Strength Meter */}
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                          {[1, 2, 3, 4].map((step) => (
                            <div
                              key={step}
                              className={`rounded-full transition-colors duration-300 ${
                                strengthScore >= step
                                  ? strengthColors[strengthScore - 1] || 'bg-tertiary'
                                  : 'bg-surface-container-highest'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-on-surface-variant px-0.5">
                          <span>{password ? strengthLabels[strengthScore] : 'Password strength'}</span>
                          <span className="text-tertiary font-medium flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[13px]">shield</span> Local hashing
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 4. Confirm Password */}
                    <div className="flex flex-col gap-space-2xs">
                      <label className="font-label-md text-label-md text-on-surface">Confirm password</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px] pointer-events-none">
                          lock_reset
                        </span>
                        <input
                          className="w-full pl-11 pr-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-[0_0_0_2px_#8e4647] transition-all"
                          placeholder="Re-enter your password"
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      {!passwordsMatch && (
                        <p className="text-xs text-error font-body-sm flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px]">error</span> Passwords do not match
                        </p>
                      )}
                    </div>

                    {/* Zero-Knowledge Key Toggle */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                      <div className="pt-0.5">
                        <button
                          type="button"
                          onClick={() => setBiometricKeyEnabled(!biometricKeyEnabled)}
                          className={`w-11 h-6 rounded-full relative transition-colors duration-200 focus:outline-none cursor-pointer ${
                            biometricKeyEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 rounded-full bg-on-primary transition-all duration-200 ${
                              biometricKeyEnabled ? 'left-6' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-2xs">
                          <span className="font-label-md text-label-md text-on-surface">
                            Zero-Knowledge Biometric Key
                          </span>
                          <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant">
                            Recommended
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          Generates an on-device cryptographic key paired with TouchID or FaceID. Even Lunara engineers cannot decrypt your logs.
                        </p>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-space-xs pt-space-2xs">
                      <input
                        className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                        id="terms"
                        required
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <label className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer" htmlFor="terms">
                        I agree to the <span className="text-primary hover:underline font-medium">Terms of Sanctuary</span> and{' '}
                        <span className="text-primary hover:underline font-medium">Health Privacy Pledge</span>. I understand my somatic, hormonal, and mental wellness data is strictly protected and never shared with third-party brokers.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-space-xs pt-space-xs">
                      <button
                        className="w-full py-space-sm px-space-lg rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-space-xs group active:scale-[0.99] cursor-pointer disabled:opacity-50"
                        disabled={!termsAccepted || !passwordsMatch || isSubmitting}
                        type="submit"
                      >
                        <span>{isSubmitting ? 'Sealing Cryptographic Enclave...' : 'Create Your Sanctuary'}</span>
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </button>

                      <div className="flex items-center justify-center gap-space-2xs font-body-sm text-body-sm text-on-surface-variant text-center pt-space-xs">
                        <span>Already have a sanctuary?</span>
                        <button
                          type="button"
                          onClick={() => onNavigate('login')}
                          className="text-secondary hover:text-on-secondary-fixed-variant font-label-md text-label-md transition-colors underline decoration-outline-variant underline-offset-4 cursor-pointer"
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Trust Ribbon */}
                <div className="mt-space-md py-space-sm px-space-md rounded-xl bg-surface-container-low flex flex-wrap items-center justify-center gap-y-2 gap-x-space-lg text-on-surface-variant font-label-sm text-label-sm">
                  <div className="flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">shield_lock</span>
                    <span>Zero Data Brokering</span>
                  </div>
                  <span className="text-outline-variant hidden sm:inline">•</span>
                  <div className="flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">key</span>
                    <span>AES-256 Vault Encryption</span>
                  </div>
                  <span className="text-outline-variant hidden sm:inline">•</span>
                  <div className="flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">health_and_safety</span>
                    <span>Clinical-Grade Discretion</span>
                  </div>
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
