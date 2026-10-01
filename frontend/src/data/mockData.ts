import { ChatMessage, CycleRecord, SymptomLog, MoodLog } from '../types';

export const USER_PROFILE = {
  name: 'Elena Rostova',
  preferredName: 'Elena',
  email: 'elena@example.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVVgDnhMFrpOLCV2c4FgDR_l7ZkLzURzFZf8L3Dh8e1WqkC8_lll9-1aZjv3wfCF7PylLQitZqYd7XkrEw0FaDstYfe-vUWWjg5Uewq-Bxj8rEZpsMy6vYpZeijW9pDyb5Rus8PFlz04C0jAG4_73x4DUwe3WyKUMJBd6YO1g1HhDFWr0KjuyaHKksnC5OtoLHhOj1lPxzH4GPRjQCEeHYnEGnlIAqmp7rsMwnhseZWJ8q6rl0NchD',
  chatAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi-zGOZkWXHHF-NDBOJyCKjDWBMfQw07qTyNq_tgKZHJZxwgxiDN0QdclXKNanetdzEAm-zfy_2hIo98N017bLw2kf2Nwxh4Ec9DqP6pTzb7XDNTKPy5va7YQn34J6ifL9fIsfQg7C_a3U3HujEZ35Ctr40EgsfoPpv9_QOipz9F5r72BmNuChI9MHwNf19xk9gOmOdtAI8NTT9uWZZIsg_2xd7tqS0_-OCbZ-6jn6IC4SSunRfZdi',
  currentDay: 18,
  cycleLength: 29,
  lutealSpan: 13,
  phase: 'Luteal Phase',
  phaseStatus: 'Progesterone peaking. Restful focus recommended.',
  nextPeriodInDays: 9,
  regularityScore: 96,
  sleepHours: '7h 15m',
};

export const INITIAL_SYMPTOMS: SymptomLog[] = [
  {
    id: 's-1',
    name: 'Fatigue',
    category: 'physical',
    severity: 4,
    severityLabel: 'Mild · 4/10',
    timeLogged: 'Today, 8:45 AM',
    color: '#675491'
  },
  {
    id: 's-2',
    name: 'Bloating',
    category: 'digestive',
    severity: 6,
    severityLabel: 'Moderate · 6/10',
    timeLogged: 'Today, 8:45 AM',
    color: '#8e4647'
  },
  {
    id: 's-3',
    name: 'Headache',
    category: 'physical',
    severity: 3,
    severityLabel: 'Yesterday · 3/10',
    timeLogged: 'Yesterday, 4:15 PM',
    color: '#867272'
  }
];

export const INITIAL_MOOD: MoodLog = {
  id: 'm-today',
  date: 'Today, Oct 14',
  primaryMood: '“Okay” · Calm Serenity',
  stress: 4,
  anxiety: 3,
  energy: 5,
  creativeInception: 7,
  somaticTension: 3,
  notes: 'Slow awakening, grateful for warm oat milk and chamomile.'
};

export const RECORDED_CYCLES: CycleRecord[] = [
  {
    id: 'c-09',
    month: 'September 2024',
    monthNumber: '09',
    startDate: 'Sep 12',
    flowDays: 5,
    totalLength: 29,
    flowIntensity: 'Regular'
  },
  {
    id: 'c-08',
    month: 'August 2024',
    monthNumber: '08',
    startDate: 'Aug 13',
    flowDays: 5,
    totalLength: 31,
    flowIntensity: 'Regular'
  },
  {
    id: 'c-07',
    month: 'July 2024',
    monthNumber: '07',
    startDate: 'Jul 16',
    flowDays: 4,
    totalLength: 28,
    flowIntensity: 'Regular'
  },
  {
    id: 'c-06',
    month: 'June 2024',
    monthNumber: '06',
    startDate: 'Jun 18',
    flowDays: 5,
    totalLength: 29,
    flowIntensity: 'Regular'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'lunara',
    time: '9:15 AM',
    text: 'Good morning Elena. I noticed you logged your mood as “Okay” and mentioned mild fatigue. How are you holding up today?'
  },
  {
    id: 'msg-2',
    sender: 'user',
    time: '9:18 AM',
    text: 'I’ve been feeling really tired today, even though I slept 7 hours. Is this normal right now?'
  },
  {
    id: 'msg-3',
    sender: 'lunara',
    time: '9:19 AM',
    text: 'You’re currently on Day 18 in your luteal phase, and looking back at your last 3 cycles, fatigue appeared around days 17–20 as progesterone peaks. It’s a very common physiological response.',
    insightCallout: {
      title: 'Cycle Correlation Found',
      description: 'In August and September, your afternoon energy dipped an average of 35% on Days 18–19, rebounding by Day 22.'
    },
    actionChips: [
      { label: 'View My Energy Pattern', icon: 'show_chart', action: 'view_energy' },
      { label: '3 Gentle Energy Tips', icon: 'spa', action: 'energy_tips' },
      { label: 'Log Hydration', icon: 'local_drink', action: 'log_hydration' }
    ]
  },
  {
    id: 'msg-4',
    sender: 'user',
    time: '9:21 AM',
    text: 'What patterns have you noticed with my headaches?'
  },
  {
    id: 'msg-5',
    sender: 'lunara',
    time: '9:21 AM',
    text: 'Your headaches correlate closely with days where stress is logged above 6/10, especially in the 48 hours preceding ovulation. Yesterday’s headache was rated 3/10 during your luteal transition.',
    sparklineData: {
      matchRate: '82% Match',
      points: [
        { phase: 'Follicular', value: 14 },
        { phase: 'Ovulatory (Peak Risk)', value: 28 },
        { phase: 'Luteal (Present)', value: 8 }
      ]
    }
  }
];

export const SUGGESTED_PROMPTS = [
  { text: 'Why am I feeling tired?', icon: 'battery_low', color: 'text-primary' },
  { text: "What's my current cycle phase?", icon: 'calendar_month', color: 'text-secondary' },
  { text: 'What patterns have you noticed?', icon: 'query_stats', color: 'text-tertiary' },
  { text: 'Tell me about my recent symptoms.', icon: 'healing', color: 'text-outline' }
];

export const IMAGES = {
  emblem: 'https://lh3.googleusercontent.com/aida/AEtjO1WKe2tkw0kiNIVjQpf5hpa_2ysend5CynTfkbOdgqfZSDNnyBD5iSGIBKTbyWQ4sa1zqXr3zhYJ8NRwofhW-FMwp1lhLDqOGi0TKL_FDpj_SrMfLMgy5hBDyDAdZF_IUs-mrKm-edVs44MI-lyIe3G2HEjrwtpRdYQi85aEzdR1KYAxm7IFfPRt-5wrHhZjPBV4rQxxprFCPw-2-NAUhWW0-4_QrFrxxrjjduzeOTq0bg1BFilh3k6zjbQ',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVVgDnhMFrpOLCV2c4FgDR_l7ZkLzURzFZf8L3Dh8e1WqkC8_lll9-1aZjv3wfCF7PylLQitZqYd7XkrEw0FaDstYfe-vUWWjg5Uewq-Bxj8rEZpsMy6vYpZeijW9pDyb5Rus8PFlz04C0jAG4_73x4DUwe3WyKUMJBd6YO1g1HhDFWr0KjuyaHKksnC5OtoLHhOj1lPxzH4GPRjQCEeHYnEGnlIAqmp7rsMwnhseZWJ8q6rl0NchD',
  presenceStillLife: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQFXd8B8rwQsdzx-j0LOdzf72oVyQhN2em0K6R9-5Cnhtc4g0pSIQCVzbVoPhYoqW_gdKmYvfCuttq8n3psLtpV9z9eBBep4udZHuZnSTMz6sKGNwCgItzlRdmV9rwY9q5aJnvcCnYyyULx3vRoKxeBRMH7GCYoWMGa36abhOWa6GUGUrNeEGkRKwJWHiuEZUCgUWfejUf496vYuazd5r8GK4QuV8nNUkT4f72Ih_HjEPBaUV6q_JV',
  chamomileTeapot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtvSjmQ8bazocn1fL28nhB9l7C-t7UBFXyAXZIekT5LbX3vX40XWYl6_ZVXCT0tYFe2Q7i_cP-41BACYHCxlykJhEjXx66-G6_AxR0b4og9iLkYqYuim1VPJaac7RU_n86Tvw8E_rOdLzdrVz_-0gJ8oiX78879RsJLwBo7J341i2pDzfbUhpVrFpxgezdYirKm3nM7mCTRZU3sm8lgj8ZJ4fGSYU9l_H5NxOztBGB0Xh1_XV-FXTL',
  landingHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmKOBMKwJAO5WrMqZ28HuTJ-8JgoiqvjRXdqDS7ADrGpsW34uz4pLImtPyCaOx8gNodAkwJq08d2YTzGEkQdm3PXtvVO-Isxw_WCwwQwfGUQaEyjEi941gEVzinDYNxDBx37Al7NjpgC8YyBAui0lvNNJ3n1YKjuOCSYEpZYCtKxFE9ApLGTSj_NWx0FQoZL6OStbEpKj6UfK7GEDvn38RKDbcpn-vheB5GB7721kNPzYXaYos5w0i',
  onboardingVignette: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM8_wpkmrCKLbEXCH-LoYO1q5AMahz2tu-prNkHt_tzCpe6TRZmwnm_VcBS5jIe0SdJjjPLvd3rwMs1G9T2aYx0TPz3qIu6s_iESvKUNlNqMqqlFVfP9-acg_q2aDcleowXN_WpsT-5NAuA7K8Wtbm4QW3XP68DV6cNL9DRFr_wB7fFgNJE-0Jcmkl_EE-B-sGb_tslc_OWfXMmKPMXIOkWkqHXk1jFm8u5dc_sL4i-ziItQzMwxIp',
  insightsHerbalRest: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABdr0tMXH4E2TKKy-uT7Ly1ZYTRA_Vj26E6gLoPQaXX2-PtX7byXiYDuMYUUt3Ees-fyw9Lubnwdmb1eMbQ6ok9XRoVKOl0jxT4cbg9BvhPUgLvwSrip58oiBtT1ThiZ-Wu-qKGYsZK0fKnD3gIOxtP-dZZwh5qpJMCnBJewXsl7P_p7JgJmEzqkUXBSGpNp9gOLbeJdGY4LN6-NphsYSz_zDy4eZQHMdr50niL_slFUUkRkHfvGMf'
};
