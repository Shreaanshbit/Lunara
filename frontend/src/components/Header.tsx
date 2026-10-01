import React, { useState } from 'react';
import { NavPath } from '../types';
import { IMAGES, USER_PROFILE } from '../data/mockData';

interface HeaderProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  onOpenDownload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenDownload }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getBreadcrumbTitle = (path: NavPath): string => {
    switch (path) {
      case 'dashboard':
        return 'Overview';
      case 'my-cycle':
        return 'My Cycle';
      case 'mood':
        return 'Mood & Somatics';
      case 'symptoms':
        return 'Symptom Journal';
      case 'insights':
        return 'Insights & Patterns';
      case 'lunara-ai':
        return 'Lunara AI Companion';
      case 'profile-settings':
        return 'Profile & Sanctuary Settings';
      default:
        return 'Sanctuary';
    }
  };

  const notifications = [
    {
      id: 'notif-1',
      title: 'Progesterone Peak Milestone',
      desc: 'Day 18 marks the apex of luteal warmth. Restful rhythm advised.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 'notif-2',
      title: 'Correlation Synthesized',
      desc: 'Fatigue patterns mapped across 4 cycles with 86% confidence.',
      time: '3 hours ago',
      unread: false
    }
  ];

  return (
    <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] px-gutter md:px-gutter-desktop border-b border-surface-container-high/40">
      <div className="h-16 flex items-center justify-between">
        {/* Left: Mobile Brand & Desktop Breadcrumbs */}
        <div className="flex items-center gap-space-sm">
          <button 
            onClick={() => onNavigate('landing')}
            className="md:hidden flex items-center gap-space-xs text-left"
          >
            <img 
              alt="Lunara Crescent & Cycle Emblem" 
              className="h-7 w-auto object-contain" 
              src={IMAGES.emblem} 
            />
            <span className="font-headline-sm text-headline-sm font-medium text-primary">Lunara</span>
          </button>
          
          <div className="hidden md:flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <button 
              onClick={() => onNavigate('dashboard')} 
              className="hover:text-on-surface cursor-pointer transition-colors"
            >
              Sanctuary
            </button>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-surface font-label-md text-label-md">
              {getBreadcrumbTitle(currentPath)}
            </span>
          </div>
        </div>

        {/* Right: Date, Download, Notifications, User Profile */}
        <div className="flex items-center gap-space-sm sm:gap-space-md relative">
          <div className="hidden lg:flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md bg-surface-container-low px-space-sm py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Today, Oct 14</span>
          </div>

          {/* Download & Install App Button */}
          {onOpenDownload && (
            <button
              onClick={onOpenDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-xs font-label-md font-semibold transition-all cursor-pointer"
              title="Download or Install Lunara"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span className="hidden xs:inline">Download App</span>
            </button>
          )}

          {/* Notifications Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications" 
              className="relative p-space-xs rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-2xl shadow-xl p-space-md z-50 border border-surface-container-highest animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Sanctuary Notifications</span>
                  <span className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="flex flex-col gap-2.5 mt-2">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">{n.title}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5 leading-snug">{n.desc}</p>
                      <span className="text-[10px] text-outline font-label-sm">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-space-xs pl-space-xs group focus:outline-none"
            >
              <img 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/30 transition-all" 
                src={USER_PROFILE.avatar} 
              />
              <span className="hidden lg:inline-block font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">
                {USER_PROFILE.name}
              </span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant hidden lg:inline-block">expand_more</span>
            </button>

            {/* Profile Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-64 bg-surface-container-lowest rounded-2xl shadow-xl p-space-sm z-50 border border-surface-container-highest animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-surface-container">
                  <div className="font-label-md text-label-md text-on-surface font-bold">{USER_PROFILE.name}</div>
                  <div className="font-body-sm text-body-sm text-xs text-on-surface-variant">{USER_PROFILE.email}</div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-tertiary">
                    <span className="material-symbols-outlined text-[13px]">shield</span>
                    <span>AES-256 Vault Active</span>
                  </div>
                </div>
                <div className="flex flex-col py-1">
                  <button 
                    onClick={() => { setShowUserMenu(false); onNavigate('profile-settings'); }}
                    className="flex items-center gap-2 px-3 py-2 text-left rounded-lg text-on-surface hover:bg-surface-container font-label-sm text-label-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                    <span>Sanctuary Settings</span>
                  </button>
                  {onOpenDownload && (
                    <button 
                      onClick={() => { setShowUserMenu(false); onOpenDownload(); }}
                      className="flex items-center gap-2 px-3 py-2 text-left rounded-lg text-on-surface hover:bg-surface-container font-label-sm text-label-sm"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">download</span>
                      <span>Download / Install App</span>
                    </button>
                  )}
                  <button 
                    onClick={() => { setShowUserMenu(false); onNavigate('landing'); }}
                    className="flex items-center gap-2 px-3 py-2 text-left rounded-lg text-on-surface hover:bg-surface-container font-label-sm text-label-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">public</span>
                    <span>Landing &amp; Architecture</span>
                  </button>
                  <button 
                    onClick={() => { setShowUserMenu(false); onNavigate('login'); }}
                    className="flex items-center gap-2 px-3 py-2 text-left rounded-lg text-primary hover:bg-primary-fixed/20 font-label-sm text-label-sm font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>Lock Sanctuary (Sign Out)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
