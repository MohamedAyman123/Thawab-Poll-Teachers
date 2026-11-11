import React, { useState } from 'react';
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
  rose: {
    active: 'bg-rose-600 text-white shadow-lg',
    inactive: 'bg-rose-50/80 text-rose-900 hover:bg-rose-100',
    indicator: 'bg-rose-500',
  },
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNav = () => setIsNavVisible((prev) => !prev);

  return (
    <>
      {/* Collapsible navigation bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200 transition-transform duration-300 ease-in-out ${
          isNavVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-gray-800 hidden sm:block">
                القرآن يجمعنا
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {LOTTERY_IDS.map((id) => {
                const config = LOTTERY_CONFIGS[id];
                const isActive = activeTab === id;
                const themeClasses = TAB_THEME_CLASSES[config.colorTheme];

                return (
                  <button
                    key={id}
                    onClick={() => onTabChange(id)}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap
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

      {/* Collapse/expand toggle — always accessible */}
      <button
        type="button"
        onClick={toggleNav}
        aria-label={isNavVisible ? 'إخفاء شريط التنقل' : 'إظهار شريط التنقل'}
        title={isNavVisible ? 'إخفاء شريط التنقل' : 'إظهار شريط التنقل'}
        className={`fixed left-4 z-50 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 shadow-md text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 ease-in-out flex items-center justify-center ${
          isNavVisible ? 'top-[72px]' : 'top-3'
        }`}
      >
        <span
          className={`transition-transform duration-300 ${
            isNavVisible ? '' : 'rotate-180'
          }`}
        >
          ▲
        </span>
      </button>
    </>
  );
};

export default TabBar;
