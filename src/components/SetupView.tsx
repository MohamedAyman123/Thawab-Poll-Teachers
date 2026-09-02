import React, { useState, useEffect } from 'react';
import { Participant, ColorTheme } from '../types/lottery';
import { getThemeClasses } from '../config/lotteryConfig';

interface SetupViewProps {
  onStart: (participants: Participant[]) => void;
  initialParticipants: Participant[];
  colorTheme: ColorTheme;
  title: string;
}

const SetupView: React.FC<SetupViewProps> = ({ onStart, initialParticipants, colorTheme, title }) => {
  const theme = getThemeClasses(colorTheme);
  const [inputValue, setInputValue] = useState('');

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

    onStart(result);
  };

  return (
    <div className={`${theme.bg50}/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl w-full max-w-3xl border ${theme.border200} font-['Cairo'] mx-auto mt-8`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-4xl font-black ${theme.text900} tracking-tighter`}>{title}</h1>
          <h2 className={`text-xl font-bold ${theme.text700} mt-2`}>إعداد المراكز</h2>
        </div>
        <div className="w-24 h-24 relative flex items-center justify-center">
           <div className="flex flex-col items-center">
            <img src={`${import.meta.env.BASE_URL}new-logo.png`} alt="Logo" className="w-16 h-16 mb-1" />
           </div>
        </div>
      </div>

      <div className={`${theme.bg100}/50 p-4 rounded-2xl mb-6 text-sm ${theme.text800} leading-relaxed border ${theme.border200}/50`}>
        <p className={`font-bold mb-2 ${theme.text900}`}>طريقة الإدخال:</p>
        <code className={`block bg-white/50 p-2 rounded-lg text-xs font-mono ${theme.text700}`}>
          [اسم المركز]<br/>
          الاسم الأول<br/>
          الاسم الثاني<br/>
          ---
        </code>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          className={`w-full h-80 p-6 border-2 ${theme.border200} rounded-3xl focus:${theme.border500} focus:ring-0 transition-all text-right resize-none font-medium text-lg shadow-inner bg-white/80`}
          placeholder="اكتب المراكز والأسماء هنا..."
          dir="rtl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        <button
          type="submit"
          className={`w-full bg-gradient-to-r ${theme.gradient} hover:${theme.gradientHover} text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl active:scale-95 text-xl`}
        >
          اعتماد وحفظ القائمة
        </button>
      </form>
    </div>
  );
};

export default SetupView;
