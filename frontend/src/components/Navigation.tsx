import React from 'react';
import { NavPath } from '../types';
import { IMAGES, USER_PROFILE } from '../data/mockData';

interface NavigationProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  onOpenDownload?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate, onOpenDownload }) => {
  const navItems = [
    { id: 'dashboard' as NavPath, label: 'Dashboard', icon: 'home' },
    { id: 'my-cycle' as NavPath, label: 'My Cycle', icon: 'timelapse' },
    { id: 'mood' as NavPath, label: 'Mood', icon: 'mood' },
    { id: 'symptoms' as NavPath, label: 'Symptoms', icon: 'vital_signs' },
    { id: 'insights' as NavPath, label: 'Insights', icon: 'auto_graph' },
    { 
      id: 'lunara-ai' as NavPath, 
      label: 'Lunara AI', 
      icon: 'auto_awesome',
      badge: 'Companion' 
    },
    { id: 'profile-settings' as NavPath, label: 'Profile & Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-40 hidden md:flex flex-col justify-between py-space-lg px-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-space-lg">
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-space-sm px-space-xs text-left group transition-transform active:scale-[0.98]"
            title="View Landing Page"
          >
            <img 
              alt="Lunara Crescent & Cycle Emblem" 
              className="h-8 w-auto object-contain transition-transform group-hover:rotate-12 duration-300" 
              src={IMAGES.emblem} 
            />
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-medium text-primary tracking-tight leading-tight">
                Lunara
              </span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                Menstrual &amp; Wellbeing
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-space-2xs">
            {navItems.map((item) => {
              const isActive = currentPath === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center justify-between px-space-sm py-space-xs rounded-xl font-label-lg text-label-lg transition-all text-left w-full ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-medium shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full ${
                      isActive 
                        ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' 
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="flex flex-col gap-space-sm">
          {/* Cycle Status Tile */}
          <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.02)] flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider">
                Cycle Status
              </span>
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            </div>
            <div className="font-headline-sm text-headline-sm text-on-surface">
              Day {USER_PROFILE.currentDay}{' '}
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                · {USER_PROFILE.phase}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
              {USER_PROFILE.phaseStatus}
            </p>
          </div>

          <div className="px-space-xs">
            <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
              Not medical advice. In crisis, call your local medical emergency helpline.
            </p>
          </div>

          {/* Download & Install App */}
          {onOpenDownload && (
            <button
              onClick={onOpenDownload}
              className="flex items-center gap-2 px-space-sm py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all text-left font-label-sm text-label-sm font-semibold border border-primary/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
              <span>Download / Install App</span>
            </button>
          )}

          {/* Quick link to Landing / Marketing */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-1.5 px-space-xs py-1 text-on-surface-variant hover:text-primary transition-colors text-left font-label-sm text-label-sm"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Public Sanctuary Overview</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl z-40 shadow-[0_-1px_8px_rgba(0,0,0,0.04)] flex items-center justify-around px-gutter border-t border-surface-container-high/50">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPath === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span className="font-label-sm text-label-sm">Today</span>
        </button>
        <button
          onClick={() => onNavigate('my-cycle')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPath === 'my-cycle' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">timelapse</span>
          <span className="font-label-sm text-label-sm">Cycle</span>
        </button>
        <button
          onClick={() => onNavigate('mood')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPath === 'mood' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">mood</span>
          <span className="font-label-sm text-label-sm">Mood</span>
        </button>
        <button
          onClick={() => onNavigate('lunara-ai')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPath === 'lunara-ai' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          <span className="font-label-sm text-label-sm">AI</span>
        </button>
        <button
          onClick={() => onNavigate('profile-settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentPath === 'profile-settings' ? 'text-primary font-bold' : 'text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="font-label-sm text-label-sm">Settings</span>
        </button>
      </nav>
    </>
  );
};
