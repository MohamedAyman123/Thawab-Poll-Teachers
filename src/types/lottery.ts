export type LotteryId = 'umrah' | 'male-prizes' | 'female-prizes' | 'teacher-lottery';

export type ColorTheme = 'emerald' | 'blue' | 'purple' | 'orange';

export interface LotteryConfig {
  id: LotteryId;
  nameAr: string;
  nameEn: string;
  colorTheme: ColorTheme;
  storageKey: string;
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
