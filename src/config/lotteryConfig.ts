import { LotteryConfig, LotteryId, ColorTheme } from '../types/lottery';

export const LOTTERY_CONFIGS: Record<LotteryId, LotteryConfig> = {
  'umrah': {
    id: 'umrah',
    nameAr: 'عمرة للطلاب',
    nameEn: 'Umrah for Students',
    colorTheme: 'emerald',
    storageKey: 'thawab_lottery_umrah',
  },
  'male-prizes': {
    id: 'male-prizes',
    nameAr: 'جوائز للطلاب الذكور',
    nameEn: 'Male Student Prizes',
    colorTheme: 'blue',
    storageKey: 'thawab_lottery_male',
  },
  'female-prizes': {
    id: 'female-prizes',
    nameAr: 'جوائز للطلاب البنات',
    nameEn: 'Female Student Prizes',
    colorTheme: 'purple',
    storageKey: 'thawab_lottery_female',
  },
  'teacher-lottery': {
    id: 'teacher-lottery',
    nameAr: 'سحب المعلمين',
    nameEn: 'Teacher Lottery',
    colorTheme: 'orange',
    storageKey: 'thawab_lottery_teacher',
  },
};

export const LOTTERY_IDS: LotteryId[] = [
  'umrah',
  'male-prizes',
  'female-prizes',
  'teacher-lottery',
];

export const THEME_CLASSES: Record<ColorTheme, {
  bg50: string;
  bg100: string;
  bg600: string;
  bg700: string;
  bg800: string;
  bg900: string;
  text600: string;
  text700: string;
  text800: string;
  text900: string;
  border200: string;
  border500: string;
  gradient: string;
  gradientHover: string;
}> = {
  emerald: {
    bg50: 'bg-emerald-50',
    bg100: 'bg-emerald-100',
    bg600: 'bg-emerald-600',
    bg700: 'bg-emerald-700',
    bg800: 'bg-emerald-800',
    bg900: 'bg-emerald-900',
    text600: 'text-emerald-600',
    text700: 'text-emerald-700',
    text800: 'text-emerald-800',
    text900: 'text-emerald-900',
    border200: 'border-emerald-200',
    border500: 'border-emerald-500',
    gradient: 'from-emerald-500 to-emerald-700',
    gradientHover: 'from-emerald-600 to-emerald-800',
  },
  blue: {
    bg50: 'bg-blue-50',
    bg100: 'bg-blue-100',
    bg600: 'bg-blue-600',
    bg700: 'bg-blue-700',
    bg800: 'bg-blue-800',
    bg900: 'bg-blue-900',
    text600: 'text-blue-600',
    text700: 'text-blue-700',
    text800: 'text-blue-800',
    text900: 'text-blue-900',
    border200: 'border-blue-200',
    border500: 'border-blue-500',
    gradient: 'from-blue-500 to-blue-700',
    gradientHover: 'from-blue-600 to-blue-800',
  },
  purple: {
    bg50: 'bg-purple-50',
    bg100: 'bg-purple-100',
    bg600: 'bg-purple-600',
    bg700: 'bg-purple-700',
    bg800: 'bg-purple-800',
    bg900: 'bg-purple-900',
    text600: 'text-purple-600',
    text700: 'text-purple-700',
    text800: 'text-purple-800',
    text900: 'text-purple-900',
    border200: 'border-purple-200',
    border500: 'border-purple-500',
    gradient: 'from-purple-500 to-purple-700',
    gradientHover: 'from-purple-600 to-purple-800',
  },
  orange: {
    bg50: 'bg-orange-50',
    bg100: 'bg-orange-100',
    bg600: 'bg-orange-600',
    bg700: 'bg-orange-700',
    bg800: 'bg-orange-800',
    bg900: 'bg-orange-900',
    text600: 'text-orange-600',
    text700: 'text-orange-700',
    text800: 'text-orange-800',
    text900: 'text-orange-900',
    border200: 'border-orange-200',
    border500: 'border-orange-500',
    gradient: 'from-orange-500 to-orange-700',
    gradientHover: 'from-orange-600 to-orange-800',
  },
};

export function getThemeClasses(theme: ColorTheme) {
  return THEME_CLASSES[theme];
}
