import React from 'react';
import { LotteryId, ColorTheme } from '../types/lottery';
import { LOTTERY_CONFIGS, LOTTERY_IDS } from '../config/lotteryConfig';

interface TabBarProps {
  activeTab: LotteryId;
  onTabChange: (id: LotteryId) => void;
}

const TAB_THEME_CLASSES: Record<ColorTheme, {
  active: string;
  inactive: string;
  indicator: string;
}> = {
  emerald: {
    active: 'bg-emerald-600 text-white shadow-lg',
    inactive: 'bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100',
    indicator: 'bg-emerald-500',
  },
  blue: {
    active: 'bg-blue-600 text-white shadow-lg',
    inactive: 'bg-blue-50/80 text-blue-900 hover:bg-blue-100',
    indicator: 'bg-blue-500',
  },
  purple: {
    active: 'bg-purple-600 text-white shadow-lg',
    inactive: 'bg-purple-50/80 text-purple-900 hover:bg-purple-100',
    indicator: 'bg-purple-500',
  },
  orange: {
    active: 'bg-orange-600 text-white shadow-lg',
    inactive: 'bg-orange-50/80 text-orange-900 hover:bg-orange-100',
    indicator: 'bg-orange-500',
  },
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}new-logo.png`}
              alt="Logo"
              className="w-10 h-10"
            />
            <span className="text-lg font-black text-gray-800 hidden sm:block">
              مؤسسة ثواب
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {LOTTERY_IDS.map((id) => {
              const config = LOTTERY_CONFIGS[id];
              const isActive = activeTab === id;
              const themeClasses = TAB_THEME_CLASSES[config.colorTheme];

              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-bold
                    transition-all duration-200 transform
                    ${isActive
                      ? themeClasses.active + ' scale-105'
                      : themeClasses.inactive + ' hover:scale-102'
                    }
                  `}
                >
                  {config.nameAr}
                </button>
              );
            })}
          </div>

          {/* Active indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {LOTTERY_CONFIGS[activeTab].nameEn}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
