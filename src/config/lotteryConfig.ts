import { LotteryConfig, LotteryId, ColorTheme } from '../types/lottery';

export const LOTTERY_CONFIGS: Record<LotteryId, LotteryConfig> = {
  'umrah': {
    id: 'umrah',
    nameAr: 'عمرة للطلاب',
    nameEn: 'Umrah for Students',
    colorTheme: 'emerald',
    storageKey: 'thawab_lottery_umrah',
    enableNasheed: true,
  },
  'male-prizes': {
    id: 'male-prizes',
    nameAr: 'جوائز للطلاب الذكور',
    nameEn: 'Male Student Prizes',
    colorTheme: 'blue',
    storageKey: 'thawab_lottery_male',
    enableNasheed: false,
  },
  'female-prizes': {
    id: 'female-prizes',
    nameAr: 'جوائز للطلاب البنات',
    nameEn: 'Female Student Prizes',
    colorTheme: 'purple',
    storageKey: 'thawab_lottery_female',
    enableNasheed: false,
  },
  'teacher-lottery': {
    id: 'teacher-lottery',
    nameAr: 'سحب المعلمين',
    nameEn: 'Teacher Lottery',
    colorTheme: 'orange',
    storageKey: 'thawab_lottery_teacher',
    enableNasheed: true,
  },
};

export const LOTTERY_IDS: LotteryId[] = [
  'umrah',
  'male-prizes',
  'female-prizes',
  'teacher-lottery',
];

export interface ThemeClasses {
  setupBg: string;
  setupBorder: string;
  titleText: string;
  subtitleText: string;
  infoBg: string;
  infoBorder: string;
  infoTitleText: string;
  infoCodeText: string;
  textareaBorder: string;
  textareaFocus: string;
  buttonGradient: string;
  buttonHoverGradient: string;
  tabActive: string;
  tabInactive: string;
  centersBadge: string;
  spinButton: string;
  revealButton: string;
  backText: string;
  nasheedButton: string;
  reelBorder: string;
  winnerText: string;
  winnerCenterText: string;
  spinnerText: string;
  reelItemText: string;
  reelItemCenter: string;
}

export const THEME_CLASSES: Record<ColorTheme, ThemeClasses> = {
  emerald: {
    setupBg: 'bg-emerald-50/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-emerald-200 mx-auto mt-8',
    setupBorder: 'border-emerald-200',
    titleText: 'text-4xl font-black text-emerald-900 tracking-tighter',
    subtitleText: 'text-xl font-bold text-emerald-700 mt-2',
    infoBg: 'bg-emerald-100/50 p-4 rounded-2xl mb-6 text-sm text-emerald-800 leading-relaxed border border-emerald-200/50',
    infoBorder: 'border-emerald-200/50',
    infoTitleText: 'font-bold mb-2 text-emerald-900',
    infoCodeText: 'block bg-white/50 p-2 rounded-lg text-xs font-mono text-emerald-700',
    textareaBorder: 'border-2 border-emerald-100 rounded-3xl focus:border-emerald-500 focus:ring-0',
    textareaFocus: 'focus:border-emerald-500',
    buttonGradient: 'from-emerald-600 to-green-600',
    buttonHoverGradient: 'hover:from-emerald-700 hover:to-green-700',
    tabActive: 'bg-emerald-600 text-white shadow-lg',
    tabInactive: 'bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100',
    centersBadge: 'bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-lg font-black shadow-md',
    spinButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-black text-4xl shadow-2xl border-4 border-white/30 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    revealButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-white font-black text-4xl shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    backText: 'text-emerald-700 font-bold text-xs',
    nasheedButton: 'mt-2 px-5 py-2 rounded-full bg-white/80 text-emerald-900 font-black shadow-lg hover:scale-105 transition-transform',
    reelBorder: 'border-emerald-500',
    winnerText: 'text-4xl md:text-5xl font-black text-emerald-900',
    winnerCenterText: 'text-2xl md:text-3xl font-black text-emerald-700 mt-2',
    spinnerText: 'text-emerald-300 text-3xl font-black',
    reelItemText: 'text-3xl font-black text-emerald-950/80',
    reelItemCenter: 'text-[8px] font-bold text-emerald-950',
  },
  blue: {
    setupBg: 'bg-blue-50/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-blue-200 mx-auto mt-8',
    setupBorder: 'border-blue-200',
    titleText: 'text-4xl font-black text-blue-900 tracking-tighter',
    subtitleText: 'text-xl font-bold text-blue-700 mt-2',
    infoBg: 'bg-blue-100/50 p-4 rounded-2xl mb-6 text-sm text-blue-800 leading-relaxed border border-blue-200/50',
    infoBorder: 'border-blue-200/50',
    infoTitleText: 'font-bold mb-2 text-blue-900',
    infoCodeText: 'block bg-white/50 p-2 rounded-lg text-xs font-mono text-blue-700',
    textareaBorder: 'border-2 border-blue-100 rounded-3xl focus:border-blue-500 focus:ring-0',
    textareaFocus: 'focus:border-blue-500',
    buttonGradient: 'from-blue-600 to-indigo-600',
    buttonHoverGradient: 'hover:from-blue-700 hover:to-indigo-700',
    tabActive: 'bg-blue-600 text-white shadow-lg',
    tabInactive: 'bg-blue-50/80 text-blue-900 hover:bg-blue-100',
    centersBadge: 'bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg font-black shadow-md',
    spinButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-black text-4xl shadow-2xl border-4 border-white/30 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    revealButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-blue-800 to-blue-950 text-white font-black text-4xl shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    backText: 'text-blue-700 font-bold text-xs',
    nasheedButton: 'mt-2 px-5 py-2 rounded-full bg-white/80 text-blue-900 font-black shadow-lg hover:scale-105 transition-transform',
    reelBorder: 'border-blue-500',
    winnerText: 'text-4xl md:text-5xl font-black text-blue-900',
    winnerCenterText: 'text-2xl md:text-3xl font-black text-blue-700 mt-2',
    spinnerText: 'text-blue-300 text-3xl font-black',
    reelItemText: 'text-3xl font-black text-blue-950/80',
    reelItemCenter: 'text-[8px] font-bold text-blue-950',
  },
  purple: {
    setupBg: 'bg-purple-50/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-purple-200 mx-auto mt-8',
    setupBorder: 'border-purple-200',
    titleText: 'text-4xl font-black text-purple-900 tracking-tighter',
    subtitleText: 'text-xl font-bold text-purple-700 mt-2',
    infoBg: 'bg-purple-100/50 p-4 rounded-2xl mb-6 text-sm text-purple-800 leading-relaxed border border-purple-200/50',
    infoBorder: 'border-purple-200/50',
    infoTitleText: 'font-bold mb-2 text-purple-900',
    infoCodeText: 'block bg-white/50 p-2 rounded-lg text-xs font-mono text-purple-700',
    textareaBorder: 'border-2 border-purple-100 rounded-3xl focus:border-purple-500 focus:ring-0',
    textareaFocus: 'focus:border-purple-500',
    buttonGradient: 'from-purple-600 to-violet-600',
    buttonHoverGradient: 'hover:from-purple-700 hover:to-violet-700',
    tabActive: 'bg-purple-600 text-white shadow-lg',
    tabInactive: 'bg-purple-50/80 text-purple-900 hover:bg-purple-100',
    centersBadge: 'bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-lg font-black shadow-md',
    spinButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-black text-4xl shadow-2xl border-4 border-white/30 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    revealButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-purple-800 to-purple-950 text-white font-black text-4xl shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    backText: 'text-purple-700 font-bold text-xs',
    nasheedButton: 'mt-2 px-5 py-2 rounded-full bg-white/80 text-purple-900 font-black shadow-lg hover:scale-105 transition-transform',
    reelBorder: 'border-purple-500',
    winnerText: 'text-4xl md:text-5xl font-black text-purple-900',
    winnerCenterText: 'text-2xl md:text-3xl font-black text-purple-700 mt-2',
    spinnerText: 'text-purple-300 text-3xl font-black',
    reelItemText: 'text-3xl font-black text-purple-950/80',
    reelItemCenter: 'text-[8px] font-bold text-purple-950',
  },
  orange: {
    setupBg: 'bg-orange-50/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border border-orange-200 mx-auto mt-8',
    setupBorder: 'border-orange-200',
    titleText: 'text-4xl font-black text-orange-900 tracking-tighter',
    subtitleText: 'text-xl font-bold text-orange-700 mt-2',
    infoBg: 'bg-orange-100/50 p-4 rounded-2xl mb-6 text-sm text-orange-800 leading-relaxed border border-orange-200/50',
    infoBorder: 'border-orange-200/50',
    infoTitleText: 'font-bold mb-2 text-orange-900',
    infoCodeText: 'block bg-white/50 p-2 rounded-lg text-xs font-mono text-orange-700',
    textareaBorder: 'border-2 border-orange-100 rounded-3xl focus:border-orange-500 focus:ring-0',
    textareaFocus: 'focus:border-orange-500',
    buttonGradient: 'from-orange-600 to-amber-600',
    buttonHoverGradient: 'hover:from-orange-700 hover:to-amber-700',
    tabActive: 'bg-orange-600 text-white shadow-lg',
    tabInactive: 'bg-orange-50/80 text-orange-900 hover:bg-orange-100',
    centersBadge: 'bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-lg font-black shadow-md',
    spinButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-white font-black text-4xl shadow-2xl border-4 border-white/30 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    revealButton: 'w-40 h-40 rounded-full bg-gradient-to-br from-orange-800 to-orange-950 text-white font-black text-4xl shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform disabled:opacity-40 flex items-center justify-center',
    backText: 'text-orange-700 font-bold text-xs',
    nasheedButton: 'mt-2 px-5 py-2 rounded-full bg-white/80 text-orange-900 font-black shadow-lg hover:scale-105 transition-transform',
    reelBorder: 'border-orange-500',
    winnerText: 'text-4xl md:text-5xl font-black text-orange-900',
    winnerCenterText: 'text-2xl md:text-3xl font-black text-orange-700 mt-2',
    spinnerText: 'text-orange-300 text-3xl font-black',
    reelItemText: 'text-3xl font-black text-orange-950/80',
    reelItemCenter: 'text-[8px] font-bold text-orange-950',
  },
};

export function getThemeClasses(theme: ColorTheme): ThemeClasses {
  return THEME_CLASSES[theme];
}
