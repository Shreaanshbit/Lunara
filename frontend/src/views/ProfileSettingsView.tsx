import React, { useState } from 'react';
import { NavPath } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface ProfileSettingsViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenDownload?: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({ onNavigate, onOpenDownload }) => {
  const [preferredName, setPreferredName] = useState(USER_PROFILE.preferredName);
  const [email, setEmail] = useState(USER_PROFILE.email);
  const [cycleLength, setCycleLength] = useState(USER_PROFILE.cycleLength);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsActive, setBiometricsActive] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPurgeModal, setShowPurgeModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1000px] w-full mx-auto px-gutter md:px-margin-desktop py-space-xl flex flex-col gap-space-2xl">
        {/* Header */}
        <section className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>Sanctuary Preferences</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Profile &amp; Security Settings
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Manage your biological profile parameters, cryptographic hardware keys, and data sovereignty.
          </p>
        </section>

        <form onSubmit={handleSave} className="flex flex-col gap-space-xl">
          {/* Identity & Account Card */}
          <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Account Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface">Preferred Name</label>
                <input
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface">Account Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Biological Rhythm Configuration */}
          <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Biorhythm Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface">Average Cycle Length</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="21"
                    max="45"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md font-semibold text-center outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">days</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface">Typical Period Duration</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="5"
                    readOnly
                    className="w-24 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md font-semibold text-center"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">days</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface">Average Luteal Span</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="13"
                    readOnly
                    className="w-24 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md font-semibold text-center"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Vault & Biometric Key */}
          <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-tertiary">
                <span className="material-symbols-outlined text-[24px]">shield_lock</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Device-Level Vault</h3>
              </div>
              <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                AES-GCM-256
              </span>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Zero-Knowledge Biometric Key
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Keys are stored exclusively in your device enclave. Lunara engineers cannot inspect raw logs.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setBiometricsActive(!biometricsActive)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  biometricsActive ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-on-primary transition-all ${
                    biometricsActive ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Gentle Morning Attunement Prompts
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Subtle reminder at 8:30 AM to log somatic weather.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-on-primary transition-all ${
                    notificationsEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Application Installation & Code Export */}
          <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col gap-space-md border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">install_mobile</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Device Installation &amp; Code Export</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                PWA &amp; Standalone Ready
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Install Lunara on your iPhone, Android, or desktop as an offline-capable application, or download the full React 19 source code archive to run and deploy anywhere.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-2">
              <button
                type="button"
                onClick={onOpenDownload}
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between group border border-surface-container-high cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">smartphone</span>
                  </div>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                      Install to Device
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      Add to Home Screen / Desktop App
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenDownload}
                className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between group border border-surface-container-high cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">folder_zip</span>
                  </div>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface group-hover:text-secondary transition-colors">
                      Download Source Code
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      Full React + Vite project (.ZIP)
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                  download
                </span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-space-xs">
            <button
              type="button"
              onClick={() => setShowPurgeModal(true)}
              className="text-error font-label-md text-label-md hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              <span>Instant Biological Data Purge</span>
            </button>

            <button
              type="submit"
              className="px-space-xl py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary-container shadow-sm active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {savedSuccess ? 'check' : 'save'}
              </span>
              <span>{savedSuccess ? 'Preferences Saved' : 'Save Sanctuary Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Instant Purge Modal */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-error/30">
            <div className="flex items-center gap-2 text-error">
              <span className="material-symbols-outlined text-[24px]">warning</span>
              <h3 className="font-headline-sm text-headline-sm">Permanent Purge</h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              In accordance with the Lunara Sovereignty Compact, single-clicking confirm permanently destroys your encryption keys and wipes all cycle history, mood logs, and symptom records. This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-space-xs">
              <button
                type="button"
                onClick={() => setShowPurgeModal(false)}
                className="px-space-md py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPurgeModal(false);
                  onNavigate('landing');
                }}
                className="px-space-lg py-2 rounded-full font-label-md text-label-md bg-error text-on-error font-semibold hover:opacity-90 shadow-sm"
              >
                Confirm &amp; Purge All Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
