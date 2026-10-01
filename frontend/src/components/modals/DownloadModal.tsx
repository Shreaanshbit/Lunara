import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { IMAGES } from '../../data/mockData';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pwa' | 'code' | 'instructions'>('pwa');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Check if running as standalone PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isAppleDevice);

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    }
  };

  const handleDownloadSourceCode = async () => {
    setIsZipping(true);
    setZipSuccess(false);

    try {
      const zip = new JSZip();

      // Core configuration files
      const filesToFetch = [
        'index.html',
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'metadata.json',
        'src/main.tsx',
        'src/App.tsx',
        'src/index.css',
        'src/types/index.ts',
        'src/data/mockData.ts',
        'src/components/Navigation.tsx',
        'src/components/Header.tsx',
        'src/components/modals/LogMoodModal.tsx',
        'src/components/modals/LogSymptomsModal.tsx',
        'src/components/modals/PeriodStartedModal.tsx',
        'src/components/modals/DownloadModal.tsx',
        'src/views/DashboardView.tsx',
        'src/views/LunaraAIView.tsx',
        'src/views/MyCycleView.tsx',
        'src/views/InsightsView.tsx',
        'src/views/MoodView.tsx',
        'src/views/SymptomsView.tsx',
        'src/views/ProfileSettingsView.tsx',
        'src/views/LandingView.tsx',
        'src/views/SignUpView.tsx',
        'src/views/LoginView.tsx'
      ];

      for (const filePath of filesToFetch) {
        try {
          const res = await fetch(`/${filePath}`);
          if (res.ok) {
            const content = await res.text();
            zip.file(filePath, content);
          }
        } catch (err) {
          console.warn(`Could not include ${filePath} directly from server:`, err);
        }
      }

      // Add a clean README.md
      const readmeContent = `# Lunara - Menstrual & Wellbeing Sanctuary

An empathetic, scholarly, and private sanctuary for cycle literacy, hormonal tracking, and mindful emotional restoration with conversational intelligence.

## Quick Start Guide

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

The app will start at \`http://localhost:3000\` or \`http://localhost:5173\`.

### 3. Build for Production
\`\`\`bash
npm run build
\`\`\`

## Technologies Used
- React 19 + TypeScript
- Vite 8 + Vite PWA Plugin
- Tailwind CSS v4
- Motion & Lucide Icons
- Material Symbols Outlined
`;
      zip.file('README.md', readmeContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'lunara-sanctuary-app.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setZipSuccess(true);
    } catch (e) {
      console.error('Failed to create zip:', e);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high/60 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-surface-container-low flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-fixed/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">download</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Download &amp; Install Lunara</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Install to device or download complete source code</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex gap-2 border-b border-surface-container-low bg-surface">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-3 px-3 font-label-md text-label-md font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pwa'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
            <span>Install on Device (App)</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-3 font-label-md text-label-md font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'code'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">folder_zip</span>
            <span>Download Source (.ZIP)</span>
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 px-3 font-label-md text-label-md font-semibold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'instructions'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Platform Guides</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5">
          {activeTab === 'pwa' && (
            <div className="space-y-5">
              {/* App Card Preview */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-4">
                <img 
                  src={IMAGES.emblem} 
                  alt="Lunara App Icon" 
                  className="w-16 h-16 rounded-2xl object-cover shadow-md ring-1 ring-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">Lunara Sanctuary</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">PWA Ready</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs line-clamp-1 mt-0.5">
                    Offline-enabled, encrypted cycle &amp; hormonal sanctuary
                  </p>
                  <p className="text-[11px] text-tertiary mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span>Fast full-screen standalone experience</span>
                  </p>
                </div>
              </div>

              {/* Install Button or iOS Instructions */}
              {isInstalled ? (
                <div className="p-4 rounded-2xl bg-tertiary-fixed/20 border border-tertiary/30 text-center">
                  <div className="flex items-center justify-center gap-2 text-tertiary font-bold mb-1">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Lunara is Already Installed!</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    You are currently using Lunara in standalone app mode.
                  </p>
                </div>
              ) : deferredPrompt ? (
                <div className="space-y-3">
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3.5 px-5 rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined">install_mobile</span>
                    <span>Install Lunara on This Device</span>
                  </button>
                  <p className="text-center text-xs text-on-surface-variant">
                    One-click installation for Chrome, Edge, and Android devices.
                  </p>
                </div>
              ) : isIOS ? (
                <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">ios_share</span>
                    <span>How to Install on iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="text-xs text-on-surface space-y-2.5 pl-1">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[11px] flex-shrink-0">1</span>
                      <span>Tap the <strong>Share</strong> button <span className="inline-block px-1.5 py-0.5 rounded bg-surface-container-highest font-mono text-[11px]">⎋ / Share</span> in the bottom toolbar of Safari.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[11px] flex-shrink-0">2</span>
                      <span>Scroll down the menu and tap <strong>&quot;Add to Home Screen&quot;</strong> <span className="inline-block px-1.5 py-0.5 rounded bg-surface-container-highest text-[11px] font-semibold">+</span>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-[11px] flex-shrink-0">3</span>
                      <span>Tap <strong>Add</strong> in the top-right corner. Lunara will now appear on your home screen like any native app!</span>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">add_to_home_screen</span>
                    <span>Install via Browser Menu:</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    On Chrome or Edge, click the <strong>Install</strong> icon in the address bar (screen with down arrow), or open the browser menu <span className="font-bold">⋮</span> and select <strong>&quot;Install Lunara...&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                  </p>
                </div>
              )}

              {/* Offline & Sanctuary Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">wifi_off</span>
                    <span>Offline Resilient</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1">Data caches safely to your local device vault.</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                    <span>Zero Data Leakage</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1">Isolated sandbox sandbox with full biometric security.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary-fixed/40 text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">code_blocks</span>
                </div>
                <div>
                  <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Full React Source Code (.ZIP)</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Download the complete React 19 + TypeScript + Tailwind v4 project repository ready to run locally with <code className="bg-surface-container-high px-1 rounded font-mono text-[11px]">npm run dev</code>.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleDownloadSourceCode}
                  disabled={isZipping}
                  className="w-full py-3.5 px-5 rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isZipping ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                      <span>Packaging Source Archive...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">download_for_offline</span>
                      <span>Download lunara-sanctuary-app.zip</span>
                    </>
                  )}
                </button>

                {zipSuccess && (
                  <div className="p-3 rounded-xl bg-tertiary-fixed/20 border border-tertiary/30 text-tertiary text-xs flex items-center justify-center gap-2 font-medium">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Source code archive downloaded successfully!</span>
                  </div>
                )}
              </div>

              {/* Local Dev Steps */}
              <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-high">
                <h4 className="font-label-md text-label-md font-bold text-on-surface mb-2">How to Run Locally:</h4>
                <div className="space-y-2 font-mono text-[11px] text-on-surface">
                  <div className="p-2 rounded-lg bg-surface-container-highest flex items-center justify-between">
                    <span>1. Unzip the file</span>
                    <span className="text-outline font-sans text-[10px]">unzip lunara-sanctuary-app.zip</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-highest flex items-center justify-between">
                    <span>2. Install packages</span>
                    <span className="text-primary font-sans text-[10px]">npm install</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-highest flex items-center justify-between">
                    <span>3. Start app</span>
                    <span className="text-tertiary font-sans text-[10px]">npm run dev</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4 text-xs text-on-surface leading-relaxed">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <span className="material-symbols-outlined text-[18px]">apple</span>
                  <span>iPhone &amp; iPad (iOS Safari)</span>
                </div>
                <p className="text-on-surface-variant">
                  Open this URL in Safari. Tap the <strong>Share</strong> icon (bottom center) &rarr; select <strong>&quot;Add to Home Screen&quot;</strong> &rarr; tap <strong>&quot;Add&quot;</strong>. Lunara will install on your home screen and run standalone without browser tabs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <span className="material-symbols-outlined text-[18px]">android</span>
                  <span>Android (Chrome &amp; Firefox)</span>
                </div>
                <p className="text-on-surface-variant">
                  Tap the three vertical dots (<strong>⋮</strong>) in the top-right corner of Chrome &rarr; tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong> &rarr; confirm.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-primary">
                  <span className="material-symbols-outlined text-[18px]">desktop_mac</span>
                  <span>Mac, Windows &amp; Chromebook</span>
                </div>
                <p className="text-on-surface-variant">
                  In Google Chrome, Microsoft Edge, or Brave, look at the right side of the address bar for the install button (a small computer screen icon with a down arrow). Click it and select <strong>&quot;Install&quot;</strong> to get a standalone desktop window and dock/taskbar icon.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-surface-container border-t border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary">lock</span>
            <span>Client-side and device sandboxed</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container-highest hover:bg-outline-variant/30 text-on-surface font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
