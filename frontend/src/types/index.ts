export type NavPath = 
  | 'dashboard' 
  | 'my-cycle' 
  | 'mood' 
  | 'symptoms' 
  | 'insights' 
  | 'lunara-ai' 
  | 'profile-settings'
  | 'landing'
  | 'login'
  | 'signup';

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export interface SymptomLog {
  id: string;
  name: string;
  category: 'physical' | 'digestive' | 'cervical' | 'cognitive';
  severity: number; // 1-10
  severityLabel: string;
  timeLogged: string;
  color: string;
}

export interface MoodLog {
  id: string;
  date: string;
  primaryMood: string;
  stress: number; // 1-10
  anxiety: number; // 1-10
  energy: number; // 1-10
  creativeInception?: number; // 1-10
  somaticTension?: number; // 1-10
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'lunara' | 'user';
  time: string;
  text: string;
  insightCallout?: {
    title: string;
    description: string;
  };
  sparklineData?: {
    matchRate: string;
    points: { phase: string; value: number }[];
  };
  actionChips?: {
    label: string;
    icon: string;
    action: string;
  }[];
}

export interface CycleRecord {
  id: string;
  month: string;
  monthNumber: string;
  startDate: string;
  flowDays: number;
  totalLength: number;
  flowIntensity: 'Light' | 'Regular' | 'Heavy';
}
