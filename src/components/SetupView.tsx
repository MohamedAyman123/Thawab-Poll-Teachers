import React, { useState, useEffect } from 'react';
import { Participant, ColorTheme } from '../types/lottery';
import { getThemeClasses, DEFAULT_LOGO_IMAGE } from '../config/lotteryConfig';

interface SetupViewProps {
  onStart: (participants: Participant[], center: string) => void;
  initialParticipants: Participant[];
  colorTheme: ColorTheme;
  title: string;
  subtitle?: string;
  centerFilterOptions?: string[];
  logoImage?: string;
}

const ALL_CENTERS_VALUE = 'all';

const SetupView: React.FC<SetupViewProps> = ({ onStart, initialParticipants, colorTheme, title, subtitle, centerFilterOptions, logoImage }) => {
  const theme = getThemeClasses(colorTheme);
  const hasCenterFilter = !!centerFilterOptions && centerFilterOptions.length > 0;
  const [inputValue, setInputValue] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<string>(ALL_CENTERS_VALUE);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    if (initialParticipants.length > 0) {
      const centersMap: Record<string, string[]> = {};
      initialParticipants.forEach(p => {
        if (!centersMap[p.center]) centersMap[p.center] = [];
        centersMap[p.center].push(p.name);
      });

      const text = Object.entries(centersMap)
        .map(([center, names]) => `[${center}]\n${names.join('\n')}`)
        .join('\n---\n');
      setInputValue(text);
    }
  }, [initialParticipants]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result: Participant[] = [];
    const blocks = inputValue.split('---');

    blocks.forEach(block => {
      const lines = block.trim().split('\n').map(l => l.trim()).filter(l => l !== '');
      if (lines.length > 0) {
        let currentCenter = 'مركز غير معروف';
        let startIndex = 0;
        if (lines[0].startsWith('[') && lines[0].endsWith(']')) {
          currentCenter = lines[0].substring(1, lines[0].length - 1);
          startIndex = 1;
        } else {
          currentCenter = lines[0];
          startIndex = 1;
        }

        for (let i = startIndex; i < lines.length; i++) {
          result.push({ name: lines[i], center: currentCenter });
        }
      }
    });

    if (result.length === 0) {
      alert('يرجى إدخال المراكز والأسماء بشكل صحيح');
      return;
    }

    onStart(result, selectedCenter);
  };

  const selectedCenterLabel = selectedCenter === ALL_CENTERS_VALUE ? 'كل المراكز' : selectedCenter;

  return (
    <div className={theme.setupBg}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={theme.titleText}>{title}</h1>
          <h2 className={theme.subtitleText}>{subtitle || 'إعداد المراكز'}</h2>
        </div>
        <div className="w-24 h-24 relative flex items-center justify-center">
           <div className="flex flex-col items-center">
            <img
              src={`${import.meta.env.BASE_URL}${logoImage || DEFAULT_LOGO_IMAGE}`}
              alt="Logo"
              className="w-16 h-16 mb-1 object-contain"
            />
           </div>
        </div>
      </div>

      <div className={theme.infoBg}>
        <p className={theme.infoTitleText}>طريقة الإدخال:</p>
        <code className={theme.infoCodeText}>
          [اسم المركز]<br/>
          الاسم الأول<br/>
          الاسم الثاني<br/>
          ---
        </code>
      </div>

      {hasCenterFilter && (
        <div className={`${theme.infoBorder} border bg-white/60 rounded-2xl mb-6 overflow-hidden`}>
          <button
            type="button"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`w-full flex items-center justify-between px-5 py-4 ${theme.infoTitleText} text-lg`}
          >
            <span className="flex items-center gap-3">
              <span className={`inline-block transition-transform duration-300 ${isPanelOpen ? '' : '-rotate-90'}`}>▼</span>
              اختيار المركز للسحب
            </span>
            <span className={`px-4 py-1 rounded-full text-base font-black bg-gradient-to-r ${theme.buttonGradient} text-white`}>
              {selectedCenterLabel}
            </span>
          </button>

          {isPanelOpen && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCenter(ALL_CENTERS_VALUE)}
                  className={`px-4 py-3 rounded-2xl text-lg font-black text-center transition-all ${
                    selectedCenter === ALL_CENTERS_VALUE
                      ? `bg-gradient-to-r ${theme.buttonGradient} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  كل المراكز
                </button>
                {centerFilterOptions!.map((center) => (
                  <button
                    key={center}
                    type="button"
                    onClick={() => setSelectedCenter(center)}
                    className={`px-4 py-3 rounded-2xl text-base font-black text-center transition-all ${
                      center === selectedCenter
                        ? `bg-gradient-to-r ${theme.buttonGradient} text-white shadow-lg scale-105`
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {center}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          className={`w-full h-80 p-6 ${theme.textareaBorder} transition-all text-right resize-none font-medium text-lg shadow-inner bg-white/80`}
          placeholder="اكتب المراكز والأسماء هنا..."
          dir="rtl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          type="submit"
          className={`w-full bg-gradient-to-r ${theme.buttonGradient} ${theme.buttonHoverGradient} text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl active:scale-95 text-xl`}
        >
          اعتماد وحفظ القائمة
        </button>
      </form>
    </div>
  );
};

export default SetupView;
