export type LotteryId = 'umrah' | 'male-prizes' | 'female-prizes' | 'teacher-lottery' | 'story-umrah';

export type ColorTheme = 'emerald' | 'blue' | 'purple' | 'orange' | 'rose';

export interface LotteryConfig {
  id: LotteryId;
  nameAr: string;
  nameEn: string;
  headerNameAr?: string;
  subtitleAr?: string;
  colorTheme: ColorTheme;
  storageKey: string;
  enableNasheed: boolean;
  centerFilterOptions?: string[];
  logoImage?: string;
}

export interface Participant {
  name: string;
  center: string;
}

export type LotteryView = 'setup' | 'lottery';

export interface LotteryState {
  view: LotteryView;
  participants: Participant[];
}
